import { IsNotEmpty } from 'class-validator'

export class LoginRequest {
  @IsNotEmpty({ message: 'Поле nickname обязательно' })
  readonly nickname: string;

  @IsNotEmpty({ message: 'Поле password обязательно' })
  readonly password: string;

  @IsNotEmpty({ message: 'Поле userAgent обязательно' })
  readonly userAgent: string;
}

export class RefreshRequest {
  @IsNotEmpty({ message: 'The refresh token is required' })
  readonly refresh_token: string
}
