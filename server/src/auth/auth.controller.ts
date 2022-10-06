import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from '../users/dto/user.dto';
import { TokenDto } from './dto/token.dto';
import { AuthService } from './auth.service';

interface tokenType {
  token: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() userDto: UserDto) {
    return this.authService.login(userDto);
  }

  @Post('/refresh')
  refresh(@Body() token: TokenDto) {
    return this.authService.refresh(token.token);
  }
}
