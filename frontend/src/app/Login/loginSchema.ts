import {z} from "zod"

export const LoginSchema = z.object({
    email: z.string().email("Digite um email valido"),
    password: z.string().min(8)
})

export type LoginData = z.infer<typeof LoginSchema>