import { ObjectId } from "mongodb";
import { db } from "../db.js";
import { officesCollection } from "../offices/offices.controller.js";
import { usersCollection } from "../users/users.controller.js";
import fs from "fs";
import path from "path";
import { describeImageWithPollinations } from "./descriptionGenerator.js";
import nodemailer from "nodemailer";

export const ticketsCollection = "tickets";
export async function createTicket(req, res) {
    try {
        const office = await db.collection(officesCollection).findOne({_id: new ObjectId(req.body.office)});
        if (!office){
            res.status(400).json({error: "Office not found"});
            return;
        }

        const ticketData = {
        ...req.body,
        author: req.user.username,
        createdAt: new Date(),
        };

        const result = await db.collection(ticketsCollection).insertOne(ticketData);
        
        const ticketId = result.insertedId.toString();
        
        const deskUsers = await db.collection(usersCollection).find({role: "desk", office: req.body.office}).toArray();

        for (const user of deskUsers) {
            const assignedTicketsCount = await db.collection(ticketsCollection).countDocuments({
                status: "assigned",
                assigned: user.username
            });

            if (assignedTicketsCount < 3) {
                await db.collection(ticketsCollection).updateOne(
                    { _id: result.insertedId },
                    { $set: { status: "assigned", assigned: user.username } }
                );
                break;
            }
        }

        if (req.file) {
            const baseDir = "/app/public/ticketImages";
            const ext = path.extname(req.file.originalname);
            const filename = `${ticketId}${ext}`;

            const imagePath = path.join(baseDir, filename);

            fs.writeFileSync(imagePath, req.file.buffer);

            const description = await describeImageWithPollinations(req.file.buffer);

            await db.collection(ticketsCollection).updateOne(
                { _id: result.insertedId },
                { $set: { ...description, imageUrl: filename } }
            );
        }

        res.status(201).json({ id: result.insertedId });
    } catch (err) {
        res.status(500).json({ error: "Error creating ticket" });
    }
}

export async function getTickets(req, res) {
    try {
        const tickets = await db.collection(ticketsCollection).find().toArray();
        res.json(tickets);
    } catch (err) {
        res.status(500).json({ error: "Error getting tickets" });
    }
}

export async function getTicketById(req, res) {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const ticket = await db.collection(ticketsCollection).findOne({
      _id: new ObjectId(id),
    });

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.json(ticket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching ticket" });
  }
}

export async function getUserTickets(req, res) {
    try {
        const tickets = await db.collection(ticketsCollection)
            .find({ "author": req.user.username })
            .toArray();
        res.json(tickets);
    } catch (err) {
        res.status(500).json({ error: "Error getting tickets" });
    }
}

export async function getDeskTickets(req, res) {
    try {
        const tickets = await db.collection(ticketsCollection)
            .find({ "assigned": req.user.username })
            .toArray();
        res.json(tickets);
    } catch (err) {
        res.status(500).json({ error: "Error getting tickets" });
    }
}

/* export async function getOfficeTickets(req, res){
    try{
        const userData = await db.collection(usersCollection).findOne(
            {_id: new ObjectId(req.user.id)},
            {projection: {office: 1}});
        if (!userData.office){
            res.status(400).json({error: "Office is not asigned"});
            return;
        }
        const tickets = await db.collection(ticketsCollection).find({"office": userData.office}).toArray();
        res.json(tickets);
    } catch (err){
        res.status(500).json({ error: "Error getting tickets" });
    }
}
 */
export async function updateTicketStatus(req, res){
    try{
        const {id} = req.params;

        if (!ObjectId.isValid(id)){
            return res.status(400).json({error: "Invalid id"});
        }

        const result = await db.collection(ticketsCollection).updateOne(
            {_id: new ObjectId(id)},
            {
                $set: {
                ...req.body
                }
            }
        );

        if (result.matchedCount === 0){
            return res.status(404).json({error: "Ticket not found"});
        }

        const user = await db.collection(usersCollection).findOne({ _id: new ObjectId(req.user.id) });
        if (!user || !user.office) {
            return res.status(400).json({ error: "User or user office not found" });
        }

        const assignedTicketsCount = await db.collection(ticketsCollection).countDocuments({
            status: "assigned",
            assigned: user.username
        });

        const slotsAvailable = 3 - assignedTicketsCount;

        if (slotsAvailable > 0) {
            const ticketsToAssign = await db.collection(ticketsCollection)
                .find({
                    office: user.office.toString(),
                    status: "open",
                    assigned: { $exists: false }
                })
                .limit(slotsAvailable)
                .toArray();

            if (ticketsToAssign.length > 0) {
                const ticketIds = ticketsToAssign.map(t => t._id);

                await db.collection(ticketsCollection).updateMany(
                    { _id: { $in: ticketIds } },
                    { $set: { status: "assigned", assigned: user.username } }
                );
            }
        }
        res.json({message: "Ticket status updated"});
    } catch (err){
        res.status(500).json({error: "Error updating ticket status"});
    }
}


export async function shareTicket(req, res){
    try{
        const {id} = req.params;

        if (!ObjectId.isValid(id)){
            return res.status(400).json({error: "Invalid id"});
        }

        const ticket = await db.collection(ticketsCollection).findOne({_id: new ObjectId(id)});
        if (!ticket) {
            return res.status(404).json({ error: "Ticket not found" });
        }
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });

        const office = await db.collection(officesCollection).findOne({_id: new ObjectId(ticket.office)});
        let officeName = "";
        if (office){
            officeName = office.name;
        }
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: req.body.email,
            subject: `Ticket - ${ticket.title}`,
            html: `
    <h2>Ticket Details</h2>
    <p><strong>Title:</strong> ${ticket.title}</p>
    <p><strong>Id:</strong> ${ticket._id}</p>
    <p><strong>Status:</strong> ${ticket.status}</p>
    <p><strong>Office:</strong> ${officeName}</p>
    <p><strong>Description:</strong> ${ticket.description || "No description"}</p>
  `
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: "Ticket shared successfully" });
    } catch (err){
        console.log(err);
        res.status(500).json({error: "Error sharing ticket"});
    }
}