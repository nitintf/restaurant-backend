import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { Like, Repository } from 'typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant) private readonly repo: Repository<Restaurant>,
  ) {}

  create(createRestaurantDto: CreateRestaurantDto) {
    const restaurant = this.repo.create(createRestaurantDto);

    return this.repo.save(restaurant);
  }

  async findAll() {
    const restaurants = await this.repo.find({
      relations: ['ratings'],
    });

    const newData = restaurants.map((rest) => ({
      ...rest,
      rating: this.calculateRating(rest.ratings),
    }));

    return newData;
  }

  async findOne(id: string) {
    const restaurant = await this.repo.findOne(id, {
      relations: ['ratings', 'ratings.user'],
    });

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    return restaurant;
  }

  async update(id: string, updateRestaurantDto: UpdateRestaurantDto) {
    const restaurant = await this.repo.findOne(id);
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    Object.assign(restaurant, updateRestaurantDto);

    return this.repo.save(restaurant);
  }

  async remove(id: string) {
    const restaurant = await this.repo.findOne(id);
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    return this.repo.remove(restaurant);
  }

  async search(query: string) {
    const result = await this.repo.find({
      name: Like(`%${query}%`),
    });

    return result;
  }

  calculateRating(ratings: any) {
    if (ratings.length === 0) return 0;

    const plainRatings = ratings.map((rating) => instanceToPlain(rating));
    const sumOfRatings = plainRatings.reduce((curr, prev) => {
      return curr + prev.rating;
    }, 0);

    const avgOfRatings = sumOfRatings / plainRatings.length;

    return avgOfRatings;
  }
}
