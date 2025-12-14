import { ObjectId } from "mongodb";
import { db } from "../db.js";
import { hashPassword } from "../utils/hashPassword.js";
import { officesCollection } from "../offices/offices.controller.js";
import { ticketsCollection } from "../tickets/tickets.controller.js";

export const usersCollection = "users";

export async function getUsers(req, res) {
    try {
        const users = await db.collection(usersCollection).find().toArray();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "Error getting users" });
    }
}

export async function createUser(req, res) {
    try {
        const hashedPassword = await hashPassword(req.body.password);
        const userToInsert = {...req.body, password: hashedPassword};
        const result = await db.collection(usersCollection).insertOne(userToInsert);
        res.status(201).json({ message: "User created" });
    } catch (err) {
        if (err?.code === 11000) {
        const duplicatedField = Object.keys(err.keyPattern || {})[0];

            return res.status(400).json({
                error: `${duplicatedField} already exists`,
            });
        }

        res.status(500).json({ error: "Error creating User" });
    }
}

export async function updateUser(req, res){
    try{
        if (req.body.office){
            const office = await db.collection(officesCollection).findOne({_id: new ObjectId(req.body.office)});
            if (!office){
                return res.status(400).json({error: "Office not found"});
            }

            const assignedTicketsCount = await db.collection(ticketsCollection).countDocuments({
                status: "assigned",
                assigned: req.user.username
            });

            const slotsAvailable = 3 - assignedTicketsCount;

            if (slotsAvailable > 0){
                const ticketsToAssign = await db.collection(ticketsCollection)
                    .find({
                        office: req.body.office,
                        status: "open",
                        assigned: { $exists: false }
                    })
                    .limit(slotsAvailable)
                    .toArray();

                if (ticketsToAssign.length > 0){
                    const ticketIds = ticketsToAssign.map(t => t._id);

                    await db.collection(ticketsCollection).updateMany(
                        { _id: { $in: ticketIds } },
                        {
                            $set: {
                                status: "assigned",
                                assigned: req.user.username
                            }
                        }
                    );
                }
            }
        }
        const result = await db.collection(usersCollection).updateOne(
            {_id: new ObjectId(req.user.id)},
            {
                $set: {
                    ...req.body
                }
            }
        );
        if (!result.matchedCount)
            return req.status(400).json({error: "User not found"})
        const user = await db.collection(usersCollection).findOne({username: req.user.username });
        res.json({
            username: user.username,
            role: user.role,
            office: user.office,
            name: user.name,
            surname: user.surname
        });
    } catch (err){
        res.status(500).json({error: "Error updating user data"});
    }
}