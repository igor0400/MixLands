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

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { UUID: id },
      include: { all: true },
    });
    return user;
  }
}
