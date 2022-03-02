import { Ratings } from './entities/rating.entity';
import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Ratings])],
  controllers: [RatingsController],
  providers: [RatingsService],
})
export class RatingsModule {}
