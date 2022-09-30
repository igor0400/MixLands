import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
  ) {}

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByNickname(nickname: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { LOWERCASENICKNAME: nickname },
      include: { all: true },
    });
    return user;
  }
}
