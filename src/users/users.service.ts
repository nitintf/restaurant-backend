import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private readonly repo: Repository<UserEntity>,
  ) {}

  create(body: CreateUserDto) {
    const user = this.repo.create(body);

    return this.repo.save(user);
  }

  findOne(id: string) {
    if (!id) {
      return null;
    }

    return this.repo.findOne(id);
  }

  find(email: string) {
    return this.repo.find({ email });
  }

  findAll() {
    const users = this.repo.find();
    return users;
  }

  async update(id: string, attrs: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!user) {
      throw new HttpException('User not Found', 404);
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    if (!user) {
      throw new HttpException('User not Found', 404);
    }

    return this.repo.remove(user);
  }
}
