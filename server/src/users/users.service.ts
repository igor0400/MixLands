import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { PrivateUser } from './models/private-user.model';
import { UserHoursCreative } from './models/user-hours-creative.model';
import { UserHoursRolePlay } from './models/user-hours-roleplay.model';
import { SiteUserData } from './models/site-user-data.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
    @InjectModel(PrivateUser)
    private privateUserRepository: typeof PrivateUser,
    @InjectModel(UserHoursCreative)
    private privateUHCRepository: typeof UserHoursCreative,
    @InjectModel(UserHoursRolePlay)
    private privateUHRRepository: typeof UserHoursRolePlay,
    @InjectModel(SiteUserData)
    private siteUserDataRepository: typeof SiteUserData,
  ) {}

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll({ include: { all: true } });

    const usersHoursR = await this.privateUHCRepository.findAll({
      include: { all: true },
    });

    const usersHoursC = await this.privateUHRRepository.findAll({
      include: { all: true },
    });

    const usersWithHours = [];

    users.forEach((user) => {
      let hours: number = 0;

      usersHoursR.forEach((userHoursR) => {
        if (userHoursR.name === user.NICKNAME) {
          hours += userHoursR.time;
        }
      });
      usersHoursC.forEach((userHoursC) => {
        if (userHoursC.name === user.NICKNAME) {
          hours += userHoursC.time;
        }
      });

      usersWithHours.push(this.getUserObj(user, hours));
    });

    return usersWithHours;
  }

  async getUserByNickname(nickname: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { LOWERCASENICKNAME: nickname },
      include: { all: true },
    });

    return this.getUserWithHours(user);
  }

  async getPrivateUserByNickname(nickname: string): Promise<PrivateUser> {
    const user = await this.privateUserRepository.findOne({
      where: { LOWERCASENICKNAME: nickname },
      include: { all: true },
    });
    return this.getPrivateUserWithHours(user);
  }

  async getPrivateUserById(id: string): Promise<PrivateUser> {
    const user = await this.privateUserRepository.findOne({
      where: { UUID: id },
      include: { all: true },
    });
    return this.getPrivateUserWithHours(user);
  }

  private async getUserWithHours(user: User): Promise<any> {
    const userHoursR = await this.privateUHCRepository.findOne({
      where: { name: user.NICKNAME },
      include: { all: true },
    });

    const userHoursC = await this.privateUHRRepository.findOne({
      where: { name: user.NICKNAME },
      include: { all: true },
    });

    const rTime = userHoursR?.time || 0;
    const cTime = userHoursC?.time || 0;

    return this.getUserObj(user, rTime + cTime);
  }

  private async getPrivateUserWithHours(user: PrivateUser): Promise<any> {
    const userHoursR = await this.privateUHCRepository.findOne({
      where: { name: user.NICKNAME },
      include: { all: true },
    });

    const userHoursC = await this.privateUHRRepository.findOne({
      where: { name: user.NICKNAME },
      include: { all: true },
    });

    const rTime = userHoursR?.time || 0;
    const cTime = userHoursC?.time || 0;

    return this.getPrivateUserObj(user, rTime + cTime);
  }

  private async getUserObj(user: User, hours: number) {
    const siteData = await this.getSiteUserData(user.LOWERCASENICKNAME);

    return {
      NICKNAME: user.NICKNAME,
      LOWERCASENICKNAME: user.LOWERCASENICKNAME,
      REGDATE: user.REGDATE,
      HOURS: Math.ceil(hours / 3.6e6),
      siteData,
    };
  }

  private async getPrivateUserObj(user: PrivateUser, hours: number) {
    const siteData = await this.getSiteUserData(user.LOWERCASENICKNAME);

    return {
      NICKNAME: user.NICKNAME,
      LOWERCASENICKNAME: user.LOWERCASENICKNAME,
      REGDATE: user.REGDATE,
      HASH: user.HASH,
      IP: user.IP,
      UUID: user.UUID,
      PREMIUMUUID: user.PREMIUMUUID,
      HOURS: Math.ceil(hours / 3.6e6),
      siteData,
    };
  }

  private async getSiteUserData(nickname: string) {
    const userData = await this.siteUserDataRepository.findOne({
      where: { nickname },
      include: { all: true },
    });

    return userData;
  }
}
