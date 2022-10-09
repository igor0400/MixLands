import { Injectable } from '@nestjs/common';

import { RefreshToken } from './models/refresh-token.model';
import { PrivateUser } from 'src/users/models/private-user.model';
import { AddOptionsType } from './tokens.service';

interface AddTekenOptionsType extends AddOptionsType {
  tokenId: string;
}

@Injectable()
export class RefreshTokensRepository {
  public async createRefreshToken(
    user: PrivateUser,
    ttl: number,
    addTokenOptions: AddTekenOptionsType,
  ): Promise<RefreshToken> {
    const token = new RefreshToken();
    const { user_agent, user_ip, tokenId } = addTokenOptions;

    token.id = tokenId;
    token.user_id = user.UUID;
    token.is_revoked = false;
    token.user_agent = user_agent;
    token.user_ip = user_ip;

    const expiration = new Date();
    expiration.setTime(expiration.getTime() + ttl);

    token.expires = expiration;

    return token.save();
  }

  public async findTokenById(id: string): Promise<RefreshToken | null> {
    return RefreshToken.findOne({
      where: {
        id,
      },
    });
  }
}
