import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { SiteUserData } from 'src/users/models/site-user-data.model';
import { UserDataController } from './user-data.controller';
import { UserDataService } from './user-data.service';

@Module({
  controllers: [UserDataController],
  providers: [UserDataService],
  imports: [
    JwtModule.register({
      secret: process.env.PRIVATE_KEY,
      signOptions: {
        expiresIn: '5m',
      },
    }),
    SequelizeModule.forFeature([SiteUserData]),
  ],
})
export class UserDataModule {}
