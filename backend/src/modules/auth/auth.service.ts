import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ){}

    async login(email: string, password: string) {
        const user = await this.usersService.findUserByEmail(email)

        console.log(user)
        if(!user) {
            throw new UnauthorizedException("Invalid email or password")
        }

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch) {
            throw new UnauthorizedException("Invalid email or password")
        }

        return {
            token: this.jwtService.sign({email: email}, {subject: user.id})
        }
    }
}
