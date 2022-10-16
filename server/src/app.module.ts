import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ServerInfoModule } from './server-info/server-info.module';
import { UserDataModule } from './user-data/user-data.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    UsersModule,
    AuthModule,
    ServerInfoModule,
    UserDataModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
