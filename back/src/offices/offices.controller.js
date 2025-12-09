import { db } from "../db.js";

export const officesCollection = "offices"

export async function getOffices(req, res) {
    try {
        const offices = await db.collection(officesCollection).find().toArray();
        res.json(offices);
    } catch (err) {
        res.status(500).json({ error: "Error getting office" });
    }
}

export async function createOffice(req, res) {
    try {
        const result = await db.collection(officesCollection).insertOne(req.body);
        res.status(201).json({ id: result.insertedId });
    } catch (err) {
        res.status(500).json({ error: "Error creating office" });
    }
}
export async function deleteOffice(req, res) {
    try {
        const result = await db.collection(officesCollection).deleteOne(req.body);
        res.status(201).json({ id: result.insertedId });
    } catch (err) {
        res.status(500).json({ error: "Error creating office" });
    }
}
