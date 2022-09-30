import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @Get('/:nickname')
  getById(@Param('nickname') nickname: string) {
    return this.usersService.getUserByNickname(nickname.toLocaleLowerCase());
  }
}
