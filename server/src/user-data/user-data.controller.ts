import { Controller, Post, Body, UseGuards, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ChangeUserInfoRequest } from './requests';
import { UserDataService } from './user-data.service';

@Controller('user-data')
export class UserDataController {
  constructor(private userDataService: UserDataService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/change-info/:nickname')
  @HttpCode(HttpStatus.CREATED)
  changeUserInfo(
    @Param('nickname') nickname: string,
    @Body() data: ChangeUserInfoRequest,
  ) {
    return this.userDataService.changeUserInfo(nickname, data);
  }
}
