import { Exclude, Transform } from "class-transformer"
import { hashSync } from "bcryptjs"
import { IsString, IsEmail, Min, IsNotEmpty, MinLength } from "class-validator"

 
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsEmail()
    email: string

    @MinLength(2)
    @Transform(({value}: {value: string}) => hashSync(value, 10))
    password: string
}
