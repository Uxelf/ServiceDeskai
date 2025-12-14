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
        const userToInsert = {...req.body, password: hashedPassword};
        const result = await db.collection(usersCollection).insertOne(userToInsert);
        res.status(201).json({ message: "User created" });
    } catch (err) {
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
        }
        const result = await db.collection(usersCollection).updateOne(
            {_id: new ObjectId(req.user.id)},
            {
                $set: {
                    ...req.body
                }
            }
        );
        if (!result)
            throw("Error");
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