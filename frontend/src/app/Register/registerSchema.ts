import {z} from "zod"

export const RegisterSchema = z.object({
    name: z.string().min(1),
    email: z.string().email("Digite um email valido"),
    password: z.string().min(8)
})

export type RegisterData = z.infer<typeof RegisterSchema>