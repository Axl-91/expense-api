import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDataDto, UserLoginDto, UserResponseDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

type UserDb = { id: string; username: string; email: string; password: string };

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async getUsers() {
    return await this.usersRepository.find();
  }

  generateJsonWebToken(user: UserDb) {
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
    );
  }

  async createUser(userData: UserDataDto) {
    try {
      const user = this.usersRepository.create(userData);
      const resultUser = await this.usersRepository.save(user);

      const userToken = this.generateJsonWebToken(resultUser);

      return { message: 'User created successfully', token: userToken };
    } catch (err) {
      if (err instanceof QueryFailedError) {
        const code = (err as { code?: string }).code;
        if (code === '23505')
          throw new ConflictException('User already exists');
      }

      console.error('Create failed:', err);
      throw new InternalServerErrorException('Could not create user');
    }
  }

  async loginUser(userData: UserLoginDto) {
    const user = await this.usersRepository.findOne({
      where: {
        email: userData.email,
      },
    });

    const userPassword = user ? user.password : '';
    const isValid = await bcrypt.compare(userData.password, userPassword);

    if (!user || !isValid)
      throw new UnauthorizedException(`Email or password incorrect`);

    return new UserResponseDto(user);
  }
}
