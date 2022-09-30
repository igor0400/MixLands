import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/comparepass')
  comparePasswords(@Query() query: { password: string; hash: string }) {
    const { password, hash } = query;
    return this.authService.comparePasswords(password, hash);
  }
}
