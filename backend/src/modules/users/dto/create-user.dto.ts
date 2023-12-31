import { Exclude, Transform } from "class-transformer"
import { Optional } from "@nestjs/common/decorators"
import { hashSync } from "bcryptjs"
import { IsString, IsEmail, IsNotEmpty, MinLength, ArrayMaxSize } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

 
export class CreateUserDto {
    @ApiProperty({
        description: "nome do usuario",
        type: String,
        default: "Silvio"
    })
    @IsString()
    @IsNotEmpty()
    name: string

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
    @Transform(({value}: {value: string}) => hashSync(value, 10))
    password: string

    
}
