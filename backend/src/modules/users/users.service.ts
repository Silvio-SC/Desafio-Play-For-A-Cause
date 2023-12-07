import { Injectable } from '@nestjs/common';
import { ConflictException } from '@nestjs/common/exceptions';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { User } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const foundedUser = await this.prisma.user.findFirst({
      where: {email: createUserDto.email}
    })

    if (foundedUser) throw new ConflictException("User already exists")

    const user = new User()
    Object.assign(user, {...createUserDto})

    await this.prisma.user.create({
      data: { ...user }
    })

    return plainToInstance(User, user);
  }

  async findAll() {
    const foundedUsers = await this.prisma.user.findMany()
    return plainToInstance(User, foundedUsers);
  }

  async findOne(id: string) {
    const foundedUser = await this.prisma.user.findUnique({
      where: {id},
      select: { email:true, id:true, name:true ,rooms: true}
    })
    return plainToInstance(User, foundedUser);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const foundedUser = await this.prisma.user.findUnique({
      where: {id}
    })
    const updatedUser = await this.prisma.user.update({
      where: {id}, 
      data: {...updateUserDto}
    })
    return plainToInstance(User, updatedUser);
  }

  async remove(id: string) {
    const foundedUser = await this.prisma.user.findUnique({
      where: {id}
    })
    
    await this.prisma.user.delete({
      where: {id}
    })
    return;
  }

  async findUserByEmail(email: string) {
    const foundedUser = await this.prisma.user.findUnique({
      where: {email}
    })
    return foundedUser
  }
}
