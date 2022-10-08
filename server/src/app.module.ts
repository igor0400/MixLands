import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { PrivateUser } from './users/models/private-user.model';
import { User } from './users/models/user.model';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ServerInfoModule } from './server-info/server-info.module';
import { RefreshToken } from './auth/models/refresh-token.model';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
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
    UsersModule,
    AuthModule,
    ServerInfoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
