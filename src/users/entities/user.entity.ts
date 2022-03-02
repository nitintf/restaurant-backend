import { Ratings } from './../../ratings/entities/rating.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  admin: boolean;

  @OneToMany(() => Ratings, (ratings) => ratings.user)
  ratings: Ratings[];
}
