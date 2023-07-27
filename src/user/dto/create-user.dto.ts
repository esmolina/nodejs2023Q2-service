import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(5)
  login: string;

  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
