import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDataDto, UserLoginDto } from './dto/user.dto';
import type { AuthRequest } from 'src/types/expressRequest.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser(@Req() req: AuthRequest) {
    return this.userService.showUser(req.user);
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
