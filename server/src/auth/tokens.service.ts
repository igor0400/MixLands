import { UnprocessableEntityException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignOptions, TokenExpiredError } from 'jsonwebtoken';

import { RefreshToken } from './models/refresh-token.model';
import { PrivateUser } from 'src/users/models/private-user.model';

import { UsersService } from 'src/users/users.service';
import { RefreshTokensRepository } from './refresh-tokens.repository';

import { v4 } from 'uuid';

export interface RefreshTokenPayload {
  jti: string;
  sub: string;
  user_ip: string;
  user_agent: string;
}

export interface AddOptionsType {
  user_ip: string;
  user_agent: string;
}

interface CreateTokensType {
  accessToken: string;
  refreshToken: string;
  user: PrivateUser;
}

interface RefreshTokenOptions {
  user_ip: string;
  user_agent: string;
}

export const refreshTokenTime = 60 * 24 * 60 * 60;
export const refreshTokenTimeCookie = 60 * 24 * 60 * 60 * 1000;

@Injectable()
export class TokensService {
  private readonly tokens: RefreshTokensRepository;
  private readonly users: UsersService;
  private readonly jwt: JwtService;

  public constructor(
    tokens: RefreshTokensRepository,
    users: UsersService,
    jwt: JwtService,
  ) {
    this.tokens = tokens;
    this.users = users;
    this.jwt = jwt;
  }

  public async generateAccessToken(user: PrivateUser): Promise<string> {
    const opts: SignOptions = {
      subject: user.UUID,
    };

    return this.jwt.signAsync({}, opts);
  }

  public async generateRefreshToken(
    userSession: RefreshToken | undefined,
    user: PrivateUser,
    addOptions: AddOptionsType,
    expiresIn: number,
  ): Promise<string> {
    let token;
    const { user_ip, user_agent } = addOptions;

    const tokenId: string = v4();
    const opts: SignOptions = {
      expiresIn,
      subject: user.UUID,
      jwtid: userSession ? userSession.id : tokenId,
    };

    const refreshOpts: RefreshTokenOptions = {
      user_ip,
      user_agent,
    };

    if (userSession) {
      token = this.jwt.signAsync(refreshOpts, opts);

      const expiration = new Date();
      expiration.setTime(expiration.getTime() + expiresIn);

      userSession.expires = expiration;
      userSession.save();
    } else {
      token = this.jwt.signAsync(refreshOpts, opts);

      const addTokenOptions = {
        user_ip,
        user_agent,
        tokenId,
      };

      await this.tokens.createRefreshToken(user, expiresIn, addTokenOptions);
    }

    return token;
  }

  public async resolveRefreshToken(
    encoded: string,
  ): Promise<{ user: PrivateUser; token: RefreshToken }> {
    const payload = await this.decodeRefreshToken(encoded);
    const token = await this.getStoredTokenFromRefreshTokenPayload(payload);

    if (!token) {
      throw new UnprocessableEntityException('Refresh token not found');
    }

    if (token.is_revoked) {
      throw new UnprocessableEntityException('Refresh token revoked');
    }

    const user = await this.getUserFromRefreshTokenPayload(payload);

    if (!user) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }

    return { user, token };
  }

  public async createTokensFromRefreshToken(
    refresh: string,
    user_agent: string,
    user_ip: string,
  ): Promise<CreateTokensType> {
    const { user } = await this.resolveRefreshToken(refresh);

    const userSession = await RefreshToken.findOne({
      where: {
        user_id: user.UUID,
        user_ip,
        user_agent,
      },
      include: { all: true },
    });

    if (!userSession) {
      throw new UnprocessableEntityException('Refresh token not found');
    }

    const addOptions = { user_ip, user_agent };

    const expiration = new Date();
    expiration.setTime(expiration.getTime() + refreshTokenTime);

    userSession.expires = expiration;
    userSession.save();

    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(
      userSession,
      user,
      addOptions,
      refreshTokenTime,
    );

    return { user, accessToken, refreshToken };
  }

  private async decodeRefreshToken(
    token: string,
  ): Promise<RefreshTokenPayload> {
    try {
      return this.jwt.verifyAsync(token);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnprocessableEntityException('Refresh token expired');
      } else {
        throw new UnprocessableEntityException('Refresh token malformed');
      }
    }
  }

  private async getUserFromRefreshTokenPayload(
    payload: RefreshTokenPayload,
  ): Promise<PrivateUser> {
    const subId = payload.sub;

    if (!subId) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }

    return this.users.getPrivateUserById(subId);
  }

  private async getStoredTokenFromRefreshTokenPayload(
    payload: RefreshTokenPayload,
  ): Promise<RefreshToken | null> {
    const tokenId = payload.jti;

    if (!tokenId) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }

    return this.tokens.findTokenById(tokenId);
  }
}
