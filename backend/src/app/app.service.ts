import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AppService {
  constructor(private user: UsersService) {}
  create(id, createAiDto) {
    this.user.update(id, createAiDto)
  }
}
