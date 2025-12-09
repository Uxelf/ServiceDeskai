import { z } from "zod";

export const userSchema = z.object({
    username: z.string().min(1, "Username required"),
    password: z.string().min(1, "Password required"),
    role: z.enum(["standard", "desk"]),
    name: z.string().min(1, "Name can't be 1 character").optional(),
    surname: z.string().min(1, "Surname can't be 1 character").optional(),
    office: z.string().optional()
}).strict();

export const updateUserSchema = z.object({
    name: z.string().min(1).optional(),
    surname: z.string().min(1).optional(),
    office: z.string().min(1).optional()
}).strict();