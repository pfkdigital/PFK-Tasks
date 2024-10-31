import {z} from "zod";

export const registrationSchema = z.object({
    username: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(8),
    firstname: z.string().min(1).max(20),
    lastname: z.string().min(1).max(20),
})

export type RegistrationSchema = z.infer<typeof registrationSchema>;