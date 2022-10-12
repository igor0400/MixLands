import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ServerInfoModule } from './server-info/server-info.module';
import { AuthDiscordModule } from './auth-discord/auth-discord.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    UsersModule,
    AuthModule,
    ServerInfoModule,
    AuthDiscordModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
