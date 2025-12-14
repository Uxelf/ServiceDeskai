import { db } from "../db.js";
import { geocodeLocation } from "./geocodeLocation.js";

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
        let location = await geocodeLocation(req.body.location);
        if (!location)
            return res.status(400).json({message: "Invalid location"})
        const result = await db.collection(officesCollection).insertOne({
                name: req.body.name,
                latitude: location.latitude,
                longitude: location.longitude
            });
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
