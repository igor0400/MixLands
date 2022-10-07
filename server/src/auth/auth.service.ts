import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDto } from 'src/users/dto/user.dto';
import * as bcrypt from 'bcryptjs';
import { PrivateUser } from '../users/models/private-user.model';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: UserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async refresh(token: TokenDto) {
    try {
      const decoded = this.jwtService.verify(token.authorization.split(' ')[1]);
      return this.userService.getPrivateUserById(decoded?.id);
    } catch (e) {
      throw new UnauthorizedException({
        message: 'Некорректный токен',
      });
    }
  }

  private async generateToken(user: PrivateUser) {
    const payload = { nickname: user.LOWERCASENICKNAME, id: user.UUID };
    return {
      token: this.jwtService.sign(payload),
      user,
    };
  }

  private async validateUser(userDto: UserDto) {
    const user = await this.userService.getPrivateUserByNickname(
      userDto.nickname.toLowerCase(),
    );
    if (user) {
      const passwordEquals = await bcrypt.compare(userDto.password, user.HASH);
      if (passwordEquals) {
        return user;
      }
    }

    throw new UnauthorizedException({
      message: 'Некорректный никнейм или пароль',
    });
  }
}
