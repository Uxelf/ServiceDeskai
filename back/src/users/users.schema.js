import { z } from "zod";

export const userSchema = z.object({
    username: z.string().min(1, "Username required"),
    password: z.string().min(1, "Password required"),
    role: z.enum(["standard", "desk"]),
    name: z.string().optional(),
    surname: z.string().optional(),
    office: z.string().optional()
}).strict();

export const updateUserSchema = z.object({
    name: z.string().optional(),
    surname: z.string().optional(),
    office: z.string().optional()
}).strict();