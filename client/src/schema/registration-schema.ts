import {z} from "zod";

export const registrationSchema = z.object({
    username: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(8),
    location: z.string().min(3).max(50),
    bio: z.string().max(160).optional(),
})

export type RegistrationSchema = z.infer<typeof registrationSchema>;