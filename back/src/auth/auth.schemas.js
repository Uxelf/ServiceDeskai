import { string, z } from 'zod'

export const authSchema = z.object({
    username: string().min(1, 'Not valid username'),
    password: string().min(1, "Not valid password")
}).strict();