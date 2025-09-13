import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserDataDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { QueryFailedError, Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) { }

  async getUsers() {
    return await this.usersRepository.find()
  }

  async createUser(userData: UserDataDto) {
    try {
      await this.usersRepository
        .createQueryBuilder()
        .insert().into('users')
        .values({ ...userData })
        .execute()

      return { message: "User created successfully" }
    } catch (err) {
      if (err instanceof QueryFailedError && (err as any).code === '23505') {
        throw new ConflictException('User already exists');
      }

      console.error('Create failed:', err);
      throw new InternalServerErrorException('Could not create user');
    }

  }
}
