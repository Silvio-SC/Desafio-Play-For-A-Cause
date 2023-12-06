import { Message } from "../entities/room.entity"
import { IsNotEmpty, IsString, IsUUID } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateRoomDto {
    @ApiProperty({
        description: "As mensagens da Room",
        type: Message,
        default: [
                {
                    "text": "oi",
                    "onwer_id": "1e26aa44-6580-464f-b286-b50b2443a674",
                    "roomId": "1e26aa44-6580-464f-b286-b50b2443a674"
                },
                {
                    "text": "oi",
                    "onwer_id": "1e26aa44-6580-464f-b286-b50b2443a674",
                    "roomId": "1e26aa44-6580-464f-b286-b50b2443a674"
                }
            ]
    })
    texts: Message[]

    @ApiProperty({
        description: "Ids dos usuarios participantes da room",
        type: String,
        default: [
            "1e26aa44-6580-464f-b286-b50b2443a674",
            "d8a98414-0900-404a-8175-cfa851d5fdeb"
        ]
    })
    users: string[]
}

export class CreateMessageDto {
    @ApiProperty({
        description: "conteudo da mensagem",
        type: String,
        default: "oi"
    })
    @IsString()
    @IsNotEmpty()
    text: string

    @ApiProperty({
        description: "Id do usuario que enviou a mensagem",
        type: String,
        default: "UUID"
    })
    @IsString()
    @IsUUID()
    owner_id: string
    
    @ApiProperty({
        description: "Id da room e, que foi enviada a mensagem",
        type: String,
        default: "UUID"
    })
    @IsString()
    @IsUUID()
    roomId: string;
}

