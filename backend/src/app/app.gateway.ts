import { 
  SubscribeMessage, 
  WebSocketGateway, 
  WebSocketServer, 
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect
} from '@nestjs/websockets';
import { Server, Socket } from 'net';

@WebSocketGateway({cors : {oringin: 'http://localhost:3001'}})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server

  afterInit () {
    console.log("init")
  }
  
  async handleConnection(socket) {
    console.log(`${socket.id} has connect`)
  }

  async handleDisconnect(socket) {
    console.log(`${socket.id} has disconnect`)
  }

  @SubscribeMessage('messageToServer')
  handleMessage(client: Socket, payload: any): string {
    return 'Hello world! 22';
  }


}
