import { IsNotEmpty, Min, Max } from 'class-validator';

export class ChangeUserInfoRequest {
  @IsNotEmpty({ message: 'Поле bio обязательно' })
  @Min(1)
  @Max(200)
  readonly bio: string;

  @IsNotEmpty({ message: 'Поле lor обязательно' })
  @Min(1)
  @Max(200)
  readonly lor: string;
}
