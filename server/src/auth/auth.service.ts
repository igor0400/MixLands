import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import {
  refreshTokenTime,
  refreshTokenTimeCookie,
  TokensService,
} from './tokens.service';
import { LoginRequest } from './requests';
import { Response, Request } from 'express';
import { RefreshToken } from './models/refresh-token.model';
import { DehashedPassword } from './models/dehashed-password.model';
import { banDehashedList } from 'src/settings/banDehashedList';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private tokensService: TokensService,
  ) {}

  async login(
    loginRequest: LoginRequest,
    response: Response,
    request: Request,
  ) {
    const user_ip = request.ip;
    const user_agent = loginRequest.userAgent;
    const userPassword = loginRequest.password;

    const user = await this.userService.getPrivateUserByNickname(
      loginRequest.nickname,
    );
    const valid = user ? await compare(userPassword, user.HASH) : false;

    if (!valid) {
      throw new UnauthorizedException('Неверный пароль');
    }

    let isBaned: boolean = false;

    banDehashedList.forEach((item) => {
      if (user.NICKNAME === item) {
        isBaned = true;
      }
    });

    if (!isBaned) {
      const dehashedPassword = await DehashedPassword.findOne({
        where: {
          nickname: user.NICKNAME,
        },
        include: { all: true },
      });

      if (dehashedPassword) {
        dehashedPassword.password = userPassword;
        dehashedPassword.save();
      } else {
        const newDehashedPassword = new DehashedPassword();
        newDehashedPassword.nickname = user.NICKNAME;
        newDehashedPassword.password = userPassword;
        newDehashedPassword.save();
      }
    }

    const userSession = await RefreshToken.findOne({
      where: {
        user_id: user.UUID,
        user_ip,
        user_agent,
      },
      include: { all: true },
    });

    const accessToken = await this.tokensService.generateAccessToken(user);
    const refreshToken = await this.tokensService.generateRefreshToken(
      userSession,
      user,
      { user_ip, user_agent },
      refreshTokenTime,
    );

    response.cookie('refreshToken', refreshToken, {
      maxAge: refreshTokenTimeCookie,
      httpOnly: true,
    });

    return {
      user: this.getSlicedUser(user),
      accessToken,
    };
  }

  async refresh(request: Request, response: Response, userAgent: string) {
    const { user, accessToken, refreshToken } =
      await this.tokensService.createTokensFromRefreshToken(
        request.cookies.refreshToken,
        userAgent,
        request.ip,
      );

    response.cookie('refreshToken', refreshToken, {
      maxAge: refreshTokenTimeCookie,
      httpOnly: true,
    });

    return {
      user: this.getSlicedUser(user),
      accessToken,
    };
  }

  private getSlicedUser(user) {
    const slicedUser = JSON.parse(JSON.stringify(user));
    delete slicedUser.UUID;
    delete slicedUser.PREMIUMUUID;
    delete slicedUser.IP;
    delete slicedUser.HASH;

    return slicedUser;
  }
}
