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
    const users = await this.userRepository.findAll();
    return users;
  }

  getOneUserById(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }
}
