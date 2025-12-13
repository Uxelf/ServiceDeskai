import { z } from "zod";

export const ticketSchema = z.object({
    title: z.string().min(4, "Title required"),
    description: z.string().min(4, "Description required"),
    office: z.string().min(1, "Office required"),
    // Imagen
}).strict();

export const updateTicketStatusSchema = z.object({
    status: z.enum(["open", "assigned", "in-progress", "closed"])
}).strict();