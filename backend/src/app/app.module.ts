import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [ UsersModule ],
  providers: [AppGateway, AppService]
})
export class AppGModule {}
