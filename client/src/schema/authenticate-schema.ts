import {z} from "zod";

export const authenticateSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(8),
})

export type AuthenticateSchema = z.infer<typeof authenticateSchema>;