import {z} from "zod"

export const activationCodeSchema = z.object({
    activationCode: z.string().length(6)
})

export type ActivationCodeSchema = z.infer<typeof activationCodeSchema>