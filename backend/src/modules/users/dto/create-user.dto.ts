import { Exclude, Transform } from "class-transformer"
import { Optional } from "@nestjs/common/decorators"
import { hashSync } from "bcryptjs"
import { IsString, IsEmail, IsNotEmpty, MinLength, ArrayMaxSize } from "class-validator"

 
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsEmail()
    email: string

    // @ArrayMaxSize(2)
    // @Optional()
    // rooms: string[]

    @MinLength(2)
    @Transform(({value}: {value: string}) => hashSync(value, 10))
    password: string

    
}
