import { UserOnRoom } from "@prisma/client"
import { randomUUID } from "node:crypto"

export class Room {
    readonly id: string
    texts?: Message[]
    users: string[]

    constructor() {
        this.id = randomUUID()
    }
}

export class Message {
    readonly id: string
    text: string
    owner_id: string
    roomId: string
    createdAt: string

    constructor() {
        this.id = randomUUID()

        let date = Date.now()
        this.createdAt = `${date}`
    }
}
