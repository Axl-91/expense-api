import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDataDto, UserLoginDto } from './dto/user.dto';
import { User } from './decorators/user.decorator';
import { UserEntity } from './user.entity';
import { AuthGuard } from './guards/auth.guard';
import type { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  getUser(@User() user: UserEntity) {
    return this.userService.showUser(user);
  }

  @Post('register')
  async createUser(
    @Body() userData: UserDataDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, token } = await this.userService.createUser(userData);

    res.cookie('jwt', token, { httpOnly: true, sameSite: 'strict' });

    return user;
  }

  @Post('login')
  async loginUser(
    @Body() userData: UserLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, token } = await this.userService.loginUser(userData);

    res.cookie('jwt', token, { httpOnly: true, sameSite: 'strict' });

    return user;
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  logoutUser(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'strict' });

    return {
      message: 'logged out successfully',
    };
  }
}
