import { Injectable } from '@nestjs/common';
import { CreateMessageDto, CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Message, Room } from './entities/room.entity';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/database/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}

  async create(createRoomDto: CreateRoomDto) {
    const foundedFisrtUser: User = await this.prisma.user.findFirst({
      where: {  
        id: createRoomDto.users[0],
      }
    })
    const foundedSecondUser = await this.prisma.user.findFirst({
      where: {  
        id: createRoomDto.users[1],
      }
    })
    
    const room = new Room()
    const roomId = room.id

    const createdRoom = await this.prisma.room.create({
      data: {
        id: roomId,
        users: {
          create: [
            {
              usersId: createRoomDto.users[0]
            },
            {
              usersId: createRoomDto.users[1]
            }
          ]
        }
      } 
    })
    
    return plainToInstance(Room, createdRoom)
  }

  async findAll(userId: string) {
    const rooms = await this.prisma.room.findMany({
      select: {id:true, texts: true, users: { select: { users:true }}},
      where: {users: { some: { usersId: userId}}}
    })
    return rooms;
  }

  async findOne(id: string) {
    const foundedRoom = await this.prisma.room.findUnique({
      where: {id},
      select: {texts: true, users: { select: { users:true }}}
    })
    return plainToInstance(Room, foundedRoom);
  }

  async sendNewMessage(id: string, updateRoomDto: CreateMessageDto) {
    const foundedRoom = await this.prisma.room.findFirst({
      where: {id},
      select: {texts: true, users: true}
    })

    const newMessage = new Message()
    Object.assign(newMessage, {...updateRoomDto})

    const updatedRoom = await this.prisma.message.create({
      data: {
        ...newMessage
      }
    })
    return plainToInstance(Room, updatedRoom);
  }
}
