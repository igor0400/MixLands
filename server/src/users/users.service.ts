import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { PrivateUser } from './models/private-user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
    @InjectModel(PrivateUser)
    private privateUserRepository: typeof PrivateUser,
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

  async getPrivateUserByNickname(nickname: string): Promise<PrivateUser> {
    const user = await this.privateUserRepository.findOne({
      where: { LOWERCASENICKNAME: nickname },
      include: { all: true },
    });
    return user;
  }

  async getPrivateUserById(id: string): Promise<PrivateUser> {
    const user = await this.privateUserRepository.findOne({
      where: { UUID: id },
      include: { all: true },
    });
    return user;
  }
}
