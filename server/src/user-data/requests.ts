import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class ChangeUserInfoRequest {
  @IsNotEmpty({ message: 'Поле bio обязательно' })
  @MinLength(1, {
    message: 'Поле bio должно быть не короче 1 символа',
  })
  @MaxLength(50, {
    message: 'Поле bio должно быть не больше 200 символов',
  })
  readonly bio: string;

  @IsNotEmpty({ message: 'Поле lor обязательно' })
  @MinLength(1, {
    message: 'Поле lor должно быть не короче 1 символа',
  })
  @MaxLength(200, {
    message: 'Поле lor должно быть не больше 200 символов',
  })
  readonly lor: string;
}
