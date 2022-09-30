import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  async comparePasswords(password: string, hash: string): Promise<boolean> {
    const match = await bcrypt.compare(password, hash);

    if (match) {
      return true;
    }

    return false;
  }
}
