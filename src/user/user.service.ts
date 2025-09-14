import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserDataDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';

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

  addJsonWebToken(user: UserDb) {
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
      const result = await this.usersRepository
        .createQueryBuilder()
        .insert()
        .into('users')
        .values({ ...userData })
        .execute();

      const id = (result.identifiers[0] as { id: string }).id;
      const user: UserDb = { id, ...userData };
      const userToken = this.addJsonWebToken(user);

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
}
