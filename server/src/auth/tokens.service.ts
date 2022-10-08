import { UnprocessableEntityException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignOptions, TokenExpiredError } from 'jsonwebtoken';

import { RefreshToken } from './models/refresh-token.model';
import { PrivateUser } from 'src/users/models/private-user.model';

import { UsersService } from 'src/users/users.service';
import { RefreshTokensRepository } from './refresh-tokens.repository';

export interface RefreshTokenPayload {
  jti: number;
  sub: string;
}

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
    user: PrivateUser,
    expiresIn: number,
  ): Promise<string> {
    const token = await this.tokens.createRefreshToken(user, expiresIn);

    const opts: SignOptions = {
      expiresIn,
      subject: user.UUID,
      jwtid: String(token.id),
    };

    return this.jwt.signAsync({}, opts);
  }

  public async resolveRefreshToken(
    encoded: string,
  ): Promise<{ user: PrivateUser; token: RefreshToken }> {
    const payload = await this.decodeRefreshToken(encoded);
    const token = await this.getStoredTokenFromRefreshTokenPayload(payload);

    console.log(payload);

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

  public async createAccessTokenFromRefreshToken(
    refresh: string,
  ): Promise<{ token: string; user: PrivateUser }> {
    const { user } = await this.resolveRefreshToken(refresh);

    const token = await this.generateAccessToken(user);

    return { user, token };
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
    const tokenId = payload.sub;

    if (!tokenId) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }

    return this.tokens.findTokenById(tokenId);
  }
}
