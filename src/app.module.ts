import { Restaurant } from './restaurant/entities/restaurant.entity';
import { Ratings } from './ratings/entities/rating.entity';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/entities/user.entity';
import { RestaurantModule } from './restaurant/restaurant.module';
import { RatingsModule } from './ratings/ratings.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [UserEntity, Ratings, Restaurant],
      synchronize: true,
    }),
    UsersModule,
    RestaurantModule,
    RatingsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
