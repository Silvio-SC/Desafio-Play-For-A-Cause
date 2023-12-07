import { Module } from '@nestjs/common';
import { AppGateway } from './app/app.gateway';
import { UsersModule } from './modules/users/users.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppGModule } from './app/app.module';

@Module({
  imports: [UsersModule, RoomsModule, AuthModule, AppGModule],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
