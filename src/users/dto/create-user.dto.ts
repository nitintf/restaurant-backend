import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  name: string;

  @MinLength(6)
  @IsString()
  password: string;

  @IsBoolean()
  @IsOptional()
  admin?: boolean;
}
