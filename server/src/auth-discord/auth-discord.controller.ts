import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthDiscordService } from './auth-discord.service';
import { Response } from 'express';

@Controller('auth/discord')
export class AuthDiscordController {
  constructor(private authDiscordService: AuthDiscordService) {}

  @Get('/redirect')
  redirect(@Query('code') code: string, @Res() res: Response) {
    if (code) {
      this.authDiscordService.authRedirect(res, code);
      return 'Loading...';
    }
  }

  @UseGuards(JwtAuthGuard) // ошибка
  @Post('/user')
  user(@Body('nickname') nickname: string) {
    return this.authDiscordService.getUser(nickname);
  }
}
