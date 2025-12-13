import { z } from "zod";

export const ticketSchema = z.object({
    office: z.string().min(1, "Office required"),
    image: z.any()
}).strict();

export const updateTicketStatusSchema = z.object({
    status: z.enum(["open", "assigned", "in-progress", "closed"])
}).strict();