import { Body, Controller, Post, Get, UseGuards, Headers } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserDto } from '../users/dto/user.dto';
import { TokenDto } from './dto/token.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() userDto: UserDto) {
    return this.authService.login(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/refresh')
  refresh(@Headers() token: TokenDto) {
    return this.authService.refresh(token);
  }
}
