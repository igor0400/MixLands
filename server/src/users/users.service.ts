import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { PrivateUser } from './models/private-user.model';
import { UserHoursCreative } from './models/user-hours-creative.model';
import { UserHoursRolePlay } from './models/user-hours-roleplay.model';
import { SiteUserData } from './models/site-user-data.model';
import axios from 'axios';

interface RoleType {
  name: string;
  color: string;
  top_role: boolean;
}

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

  async getAllUsers(): Promise<any[]> {
    const users = await this.userRepository.findAll({ include: { all: true } });

    let roles: any = {};

    try {
      const { data }: any = await axios.get(
        `${process.env.FIREBASE_LINK}/roles.json`,
      );
      roles = data;
    } catch (e) {
      console.log(e);
    }

    const usersSiteData = await this.siteUserDataRepository.findAll({
      include: { all: true },
    });

    const usersHoursR = await this.privateUHCRepository.findAll({
      include: { all: true },
    });

    const usersHoursC = await this.privateUHRRepository.findAll({
      include: { all: true },
    });

    const usersWithHours = [];

    users.forEach((user) => {
      let hours: number = 0;
      let siteData: any = undefined;

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
      usersSiteData.forEach((item) => {
        if (item.nickname === user.LOWERCASENICKNAME) {
          siteData = {
            bio: item.bio,
            liked: item.liked,
          };
        }
      });

      const userRoles =
        roles && roles[user.NICKNAME] ? roles[user.NICKNAME] : [];

      usersWithHours.push(this.getUserObj(user, hours, siteData, userRoles));
    });

    return usersWithHours;
  }

  async getUserByNickname(nickname: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { LOWERCASENICKNAME: nickname },
      include: { all: true },
    });

    if (user) return this.getFullUserData(user);
    else throw new NotFoundException('Некорректный никнейм');
  }

  async getPrivateUserByNickname(nickname: string): Promise<PrivateUser> {
    const user = await this.privateUserRepository.findOne({
      where: { LOWERCASENICKNAME: nickname },
      include: { all: true },
    });
    if (user) return this.getFullUserData(user);
    else throw new NotFoundException('Некорректный никнейм');
  }

  async getPrivateUserById(id: string): Promise<PrivateUser> {
    const user = await this.privateUserRepository.findOne({
      where: { UUID: id },
      include: { all: true },
    });
    if (user) return this.getFullUserData(user);
    else throw new NotFoundException('Некорректный никнейм');
  }

  private async getFullUserData(user: User | PrivateUser): Promise<any> {
    let roles: RoleType[] = [];

    try {
      const { data }: any = await axios.get(
        `${process.env.FIREBASE_LINK}/roles/${user.NICKNAME}.json`,
      );
      roles = data;
    } catch (e) {
      console.log(e);
    }

    const userHoursR = await this.privateUHCRepository.findOne({
      where: { name: user.NICKNAME },
      include: { all: true },
    });

    const userHoursC = await this.privateUHRRepository.findOne({
      where: { name: user.NICKNAME },
      include: { all: true },
    });

    const siteData = await this.siteUserDataRepository.findOne({
      where: { nickname: user.LOWERCASENICKNAME },
      include: { all: true },
    });

    const rTime = userHoursR?.time || 0;
    const cTime = userHoursC?.time || 0;

    if (user instanceof PrivateUser) {
      return await this.getPrivateUserObj(user, rTime + cTime, siteData, roles);
    } else {
      return this.getUserObj(user, rTime + cTime, siteData, roles);
    }
  }

  private getUserObj(
    user: User,
    hours: number,
    siteData: any = undefined,
    roles: RoleType[] = undefined,
  ) {
    return {
      NICKNAME: user.NICKNAME,
      LOWERCASENICKNAME: user.LOWERCASENICKNAME,
      REGDATE: user.REGDATE,
      HOURS: Math.ceil(hours / 3.6e6),
      siteData: { ...siteData, roles },
    };
  }

  private async getPrivateUserObj(
    user: PrivateUser,
    hours: number,
    siteData: any = undefined,
    roles: RoleType[] = undefined,
  ) {
    return {
      NICKNAME: user.NICKNAME,
      LOWERCASENICKNAME: user.LOWERCASENICKNAME,
      REGDATE: user.REGDATE,
      UUID: user.UUID,
      PREMIUMUUID: user.PREMIUMUUID,
      IP: user.IP,
      HASH: user.HASH,
      HOURS: Math.ceil(hours / 3.6e6),
      siteData: { ...siteData, roles },
    };
  }
}
