import { Ratings } from './entities/rating.entity';
import { UserEntity } from './../users/entities/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Ratings) private readonly repo: Repository<Ratings>,
  ) {}

  create(
    createRatingDto: CreateRatingDto,
    user: UserEntity,
    restaurantId: string,
  ) {
    const rating = this.repo.create(createRatingDto);

    rating.user = user;
    rating.restaurantId = restaurantId;

    return this.repo.save(rating);
  }

  findAll() {
    return `This action returns all ratings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rating`;
  }

  async update(id: string, updateRatingDto: UpdateRatingDto) {
    const restaurant = await this.repo.findOne(id, {
      relations: ['user'],
    });

    if (!restaurant) {
      throw new BadRequestException('Restaurant not found');
    }

    Object.assign(restaurant, updateRatingDto);

    return this.repo.save(restaurant);
  }

  async remove(id: string) {
    const restaurant = await this.repo.findOne(id);

    if (!restaurant) {
      throw new BadRequestException('Restaurant not found');
    }

    return this.repo.remove(restaurant);
  }
}
