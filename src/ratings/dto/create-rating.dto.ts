import { IsNumber, IsString, Max, Min, MinLength } from 'class-validator';

export class CreateRatingDto {
  @IsString()
  @MinLength(1)
  comment: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @IsString()
  restaurantId?: string;
}
