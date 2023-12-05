import { Module } from '@nestjs/common';
import { AppGateway } from './app/app.gateway';
import { UsersModule } from './modules/users/users.module';
import { RoomsModule } from './modules/rooms/rooms.module';

@Module({
  imports: [UsersModule, RoomsModule],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
