import { z } from "zod";

export const newOfficeSchema = z.object({
    name: z.string().min(1, "Name required"),
    latitude: z.number(),
    longitude: z.number()
}).strict();