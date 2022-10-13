import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthDiscordController } from './auth-discord.controller';
import { AuthDiscordService } from './auth-discord.service';
import { SiteUserData } from 'src/users/models/site-user-data.model';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AuthDiscordController],
  providers: [AuthDiscordService, JwtService],
  imports: [
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    SequelizeModule.forFeature([SiteUserData]),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_MAIN_DBNAME,
      models: [SiteUserData],
      define: { timestamps: false },
    }),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY,
      signOptions: {
        expiresIn: '5m',
      },
    }),
  ],
  exports: [JwtModule],
})
export class AuthDiscordModule {}
