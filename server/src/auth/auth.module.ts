import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RefreshToken } from './models/refresh-token.model';
import { RefreshTokensRepository } from './refresh-tokens.repository';
import { TokensService } from './tokens.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, TokensService, RefreshTokensRepository],
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY,
      signOptions: {
        expiresIn: '15m',
      },
    }),
    SequelizeModule.forFeature([RefreshToken]),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
