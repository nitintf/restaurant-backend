import { CreateUserDto } from './dto/create-user.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { signJwt } from '../helpers/jwt';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signup(body: CreateUserDto) {
    const users = await this.usersService.find(body.email);

    if (users.length) {
      throw new BadRequestException('Email in use');
    }

    const user = await this.usersService.create(body);
    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);

    if (!user) {
      throw new NotFoundException('Invalid Credentials');
    }

    const isPasswordValid = password === user.password;

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid Credentilas');
    }

    const accessToken = this.signAccessToken({ userId: user.id.toString() });

    return { ...user, token: accessToken };
  }

  signAccessToken(userId: Record<string, string>) {
    const accessToken = signJwt(userId, {
      expiresIn: '1d',
    });

    return accessToken;
  }
}
