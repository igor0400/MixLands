import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { TokensService } from './tokens.service';
import { LoginRequest } from './requests';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private tokensService: TokensService,
  ) {}

  async login(loginRequest: LoginRequest, response: Response) {
    const user = await this.userService.getPrivateUserByNickname(
      loginRequest.nickname,
    );
    const valid = user
      ? await compare(loginRequest.password, user.HASH)
      : false;

    if (!valid) {
      throw new UnauthorizedException('Некорректный никнейм или пароль');
    }

    const accessToken = await this.tokensService.generateAccessToken(user);
    const refreshToken = await this.tokensService.generateRefreshToken(
      user,
      15 * 24 * 60 * 60,
    );

    response.cookie('refreshToken', refreshToken);
    return {
      user,
      accessToken,
    };
  }

  async refresh(refreshToken: string) {
    const { user, token } =
      await this.tokensService.createAccessTokenFromRefreshToken(refreshToken);

    return {
      user,
      accessToken: token,
    };
  }
}
