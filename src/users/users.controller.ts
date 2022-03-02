import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Session,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Get('/me')
  whoAmI(@CurrentUser() user: UserEntity) {
    console.log('typeof user', !!user);

    if (!user) {
      throw new HttpException('User is not Logged in', 401);
    }

    return user;
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.authService.signup(body);

    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto) {
    const response = await this.authService.signin(body.email, body.password);
    return response;
  }

  @Get(':id')
  findUser(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get()
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
