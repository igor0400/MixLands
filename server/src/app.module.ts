import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ServerInfoModule } from './server-info/server-info.module';
import { UserDataModule } from './user-data/user-data.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/models/user.model';
import { PrivateUser } from './users/models/private-user.model';
import { UserHoursCreative } from './users/models/user-hours-creative.model';
import { UserHoursRolePlay } from './users/models/user-hours-roleplay.model';
import { SiteUserData } from './users/models/site-user-data.model';
import { RefreshToken } from './auth/models/refresh-token.model';
import { DehashedPassword } from './auth/models/dehashed-password.model';
import { PostsModule } from './posts/posts.module';
import { FilesModule } from './files/files.module';
import { UserPost } from './posts/models/user-post.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '../static'),
    }),

    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_MAIN_DBNAME,
      models: [
        User,
        PrivateUser,
        RefreshToken,
        SiteUserData,
        DehashedPassword,
        UserPost,
      ],
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
    UsersModule,
    AuthModule,
    ServerInfoModule,
    UserDataModule,
    PostsModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
