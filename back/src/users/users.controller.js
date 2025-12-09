import { ObjectId } from "mongodb";
import { db } from "../db.js";
import { hashPassword } from "../utils/hashPassword.js";
import { officesCollection } from "../offices/offices.controller.js";

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
        const result = await db.collection(usersCollection).insertOne({
            username: req.body.username,
            password: hashedPassword,
            role: req.body.role
        });
        res.status(201).json({ id: result.insertedId });
    } catch (err) {
        res.status(500).json({ error: "Error creating User" });
    }
}

export async function updateUser(req, res){
    try{
        if (req.body.office){
            const office = await db.collection(officesCollection).findOne({name: req.body.office});
            if (!office){
                return res.status(400).json({error: "Office not found"});
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
        
        res.json({message: "User data updated"});
    } catch (err){
        res.status(500).json({error: "Error updating user data"});
    }
}