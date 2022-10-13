import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ServerInfoModule } from './server-info/server-info.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    UsersModule,
    AuthModule,
    ServerInfoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
