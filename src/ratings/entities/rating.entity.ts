import { Restaurant } from './../../restaurant/entities/restaurant.entity';
import { UserEntity } from './../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ratings')
export class Ratings {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  comment: string;

  @Column()
  rating: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @ManyToOne(() => UserEntity, (user) => user.ratings)
  user: UserEntity;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.id)
  restaurantId: string;
}
