import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDataDto, UserLoginDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('login')
  loginUser(@Body() userData: UserLoginDto) {
    return this.userService.loginUser(userData);
  }

  @Post()
  createUser(@Body() userData: UserDataDto) {
    return this.userService.createUser(userData);
  }
}
