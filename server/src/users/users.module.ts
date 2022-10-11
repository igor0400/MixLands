import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { PrivateUser } from './models/private-user.model';
import { AuthModule } from '../auth/auth.module';
import { RefreshToken } from 'src/auth/models/refresh-token.model';
import { UserHoursRolePlay } from './models/user-hours-roleplay.model';
import { UserHoursCreative } from './models/user-hours-creative.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([
      User,
      PrivateUser,
      UserHoursCreative,
      UserHoursRolePlay,
    ]),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DBNAME,
      models: [User, PrivateUser, RefreshToken],
      define: { timestamps: false },
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_CREATIVE_DBNAME,
      models: [UserHoursCreative],
      define: { timestamps: false },
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_ROLEPLAY_DBNAME,
      models: [UserHoursRolePlay],
      define: { timestamps: false },
    }),
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
