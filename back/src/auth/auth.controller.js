import { Router } from "express";
import bcrypt from "bcrypt";
import { db } from "../db.js";
import { signToken } from "../utils/jwt.js";


const authCollection = "users";

export async function login(req, res) {
    const { username, password } = req.body;

    const user = await db.collection(authCollection).findOne({ username });

    if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = signToken({
        id: user._id,
        username: user.username,
        role: user.role
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000
    });

    res.json({ message: "Login OK" });
};

export async function logout(req, res) {
    res.clearCookie("token");
    res.json({ message: "Logout OK" });
}