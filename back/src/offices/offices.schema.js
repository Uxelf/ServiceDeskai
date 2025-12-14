import { z } from "zod";

export const newOfficeSchema = z.object({
    name: z.string().min(1, "Name required"),
    location: z.string().min(1, "Location required")
}).strict();

export const coordinatesSchema = z.object({
    latitude: z.number(),
    longitude: z.number()
}).strict();