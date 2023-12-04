import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({cors : {oringin: 'http://localhost:3001'}})
export class AppGateway {
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world! 22';
  }
}
