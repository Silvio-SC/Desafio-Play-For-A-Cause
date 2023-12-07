import { 
  SubscribeMessage, 
  WebSocketGateway, 
  WebSocketServer, 
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody
} from '@nestjs/websockets';
import { User, PrismaClient } from '@prisma/client';
import { Server, Socket } from 'socket.io';
import { Message } from 'src/modules/rooms/entities/room.entity';
import { RoomsController } from 'src/modules/rooms/rooms.controller';
import { RoomsService } from 'src/modules/rooms/rooms.service';
import { AppService } from './app.service';

@WebSocketGateway({cors : {oringin: 'http://localhost:3001'}})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly appService: AppService) {}
  @WebSocketServer() server: Server

  afterInit () {
    console.log("init")
  }

  @SubscribeMessage('joinRoom')
  EnterInRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: {roomId: string, user: User},
  ): void {
    client.join(body.roomId)

    client.broadcast.to(body.roomId).emit("receiveMessage", body )
  }
  
  async handleConnection(socket) {
    console.log(`${socket.id} has connect`)
  }

  async handleDisconnect(socket) {
    console.log(`${socket.id} has disconnect`)
  }

  @SubscribeMessage('sendMessage')

  sendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: {text:string, owner_id: string, roomId: string},
  ): void {
    const newMessage = new Message()
    Object.assign(newMessage, {...body})

    this.appService.create(body.owner_id, newMessage)

    console.log(body)
    client.to(body.roomId).emit("receiveMessage", newMessage)
  }


}
