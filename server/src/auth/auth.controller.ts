import { Body, Controller, Post, Res, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest } from './requests';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  public async login(
    @Body() loginRequest: LoginRequest,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(loginRequest, response);
  }

  @Get('/refresh')
  public async refresh(@Req() request: Request) {
    return this.authService.refresh(request.cookies.refreshToken);
  }
}
