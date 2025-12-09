import { z } from "zod";

export const officeSchema = z.object({
    name: z.string().min(1, "Name required")
}).strict();