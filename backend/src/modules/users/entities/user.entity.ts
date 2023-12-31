import { UserOnRoom } from "@prisma/client"
import { Exclude } from "class-transformer"
import { randomUUID } from "node:crypto"

export class User {
    readonly id: string
    name: string
    email: string
    // rooms?: string[]
    
    @Exclude()
    password: string
    // friends: User[]
    
    constructor() {
        this.id = randomUUID()
    }
}