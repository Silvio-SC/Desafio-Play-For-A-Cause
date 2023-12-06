import { IsString, IsEmail, IsNotEmpty, MinLength, ArrayMaxSize } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

 
export class LoginDto {
    @ApiProperty({
        description: "email do usuario",
        type: String,
        default: "user@email.com"
    })
    @IsString()
    @IsEmail()
    email: string

    @ApiProperty({
        description: "Senha",
        type: String,
        default: "12345678"
    })
    @MinLength(8)
    password: string
}
