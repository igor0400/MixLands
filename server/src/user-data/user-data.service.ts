import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SiteUserData } from 'src/users/models/site-user-data.model';

interface ChangeDataType {
  bio: string;
  lor: string;
}

@Injectable()
export class UserDataService {
  constructor(
    @InjectModel(SiteUserData)
    private siteUserDataRepository: typeof SiteUserData,
  ) {}

  async changeUserInfo(nickname: string, data: ChangeDataType) {
    const { bio, lor } = data;

    const userData = await this.siteUserDataRepository.findOne({
      where: { nickname: nickname },
      include: { all: true },
    });

    if (userData) {
      userData.bio = bio;
      userData.lor = lor;
      userData.save();
    } else {
      const newUserData = new SiteUserData();
      newUserData.nickname = nickname;
      newUserData.bio = bio;
      newUserData.lor = lor;
      newUserData.save();
    }

    return 'Данные обновлены';
  }
}
