import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthDiscordController } from './auth-discord.controller';
import { AuthDiscordService } from './auth-discord.service';
import { SiteUserData } from 'src/users/models/site-user-data.model';

@Module({
  controllers: [AuthDiscordController],
  providers: [AuthDiscordService],
  imports: [
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
  ],
})
export class AuthDiscordModule {}
