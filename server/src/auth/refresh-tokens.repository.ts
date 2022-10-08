import { Injectable } from '@nestjs/common';

import { RefreshToken } from './models/refresh-token.model';
import { PrivateUser } from 'src/users/models/private-user.model';

@Injectable()
export class RefreshTokensRepository {
  public async createRefreshToken(
    user: PrivateUser,
    ttl: number,
  ): Promise<RefreshToken> {
    const token = new RefreshToken();

    token.user_id = user.UUID;
    token.is_revoked = false;

    const expiration = new Date();
    expiration.setTime(expiration.getTime() + ttl);

    token.expires = expiration;

    return token.save();
  }

  public async findTokenById(id: string): Promise<RefreshToken | null> {
    return RefreshToken.findOne({
      where: {
        user_id: id,
      },
    });
  }
}
