import { IsString, MinLength } from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  @MinLength(4)
  name: string;

  @IsString()
  @MinLength(6)
  address: string;
}
