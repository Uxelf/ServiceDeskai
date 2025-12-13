import { ObjectId } from "mongodb";
import { db } from "../db.js";
import { officesCollection } from "../offices/offices.controller.js";
import { usersCollection } from "../users/users.controller.js";
import fs from "fs";
import path from "path";
import { describeImageWithPollinations } from "./descriptionGenerator.js";

export const ticketsCollection = "tickets";
export async function createTicket(req, res) {
    try {
        const office = await db.collection(officesCollection).findOne({_id: new ObjectId(req.body.office)});
        if (!office){
            res.status(400).json({error: "Office not found"});
            return;
        }
        const result = await db.collection(ticketsCollection).insertOne({
            ...req.body,
            author: req.user.username,
            status: "open",
            createdAt: new Date()
        });
        
        const ticketId = result.insertedId.toString();

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

export async function getOfficeTickets(req, res){
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
        res.json({message: "Ticket status updated"});
    } catch (err){
        res.status(500).json({error: "Error updating ticket status"});
    }
}