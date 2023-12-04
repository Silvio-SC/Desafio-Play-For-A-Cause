import { Module } from '@nestjs/common';
import { AppGateway } from './app/app.gateway';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
