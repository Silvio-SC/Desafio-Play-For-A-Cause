import {z} from "zod"

export const RegisterSchema = z.object({
    name: z.string().min(1, "Digite seu nome"),
    email: z.string().email("Digite um email valido"),
    password: z.string().min(8, "A Senha deve conter no minimo 8 caracteres")
})

export type RegisterData = z.infer<typeof RegisterSchema>