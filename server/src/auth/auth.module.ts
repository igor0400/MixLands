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
import { PrivateUser } from '../users/models/private-user.model';
import { User } from '../users/models/user.model';
import { DehashedPassword } from './models/dehashed-password.model';

@Module({
  controllers: [AuthController],
  providers: [AuthService, TokensService, RefreshTokensRepository],
  imports: [
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY,
      signOptions: {
        expiresIn: '5m',
      },
    }),
    SequelizeModule.forFeature([
      User,
      PrivateUser,
      RefreshToken,
      DehashedPassword,
    ]),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
