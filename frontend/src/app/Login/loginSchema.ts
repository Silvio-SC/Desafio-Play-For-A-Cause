import {z} from "zod"

export const LoginSchema = z.object({
    email: z.string().email("Digite um email valido"),
    password: z.string().min(8, "A Senha deve conter no minimo 8 caracteres")
})

export type LoginData = z.infer<typeof LoginSchema>