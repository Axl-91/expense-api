import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDataDto, UserLoginDto } from './dto/user.dto';
import { User } from './decorators/user.decorator';
import { UserEntity } from './user.entity';
import { AuthGuard } from './guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  getUser(@User() user: UserEntity) {
    return this.userService.showUser(user);
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
