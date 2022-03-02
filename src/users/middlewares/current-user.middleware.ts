import { UsersService } from './../users.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verifyJwt } from '../../helpers/jwt';
import { UserEntity } from '../entities/user.entity';

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserEntity;
    }
  }
}

@Injectable()
export class CurrentUserMddleware implements NestMiddleware {
  constructor(private readonly userService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const accessToken = (req.headers.authorization || '').split(' ')[1];

    if (accessToken) {
      const userId = verifyJwt<string>(accessToken);
      const user = await this.userService.findOne(userId);
      req.currentUser = user;
    }

    next();
  }
}
