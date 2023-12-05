import { User } from "src/modules/users/entities/user.entity"
import { Message } from "../entities/room.entity"
import { IsNotEmpty, IsString, IsUUID } from "class-validator"
import { UserOnRoom } from "@prisma/client"

export class CreateRoomDto {
    texts: Message[]
    users: string[]
}

export class CreateMessageDto {
    @IsString()
    @IsNotEmpty()
    text: string

    @IsString()
    @IsUUID()
    owner_id: string
    
    @IsString()
    @IsUUID()
    roomId: string;
}

