import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDataDto, UserLoginDto, UserResponseDto } from './dto/user.dto';
import { UserEntity } from './user.entity';
import { instanceToPlain } from 'class-transformer';

describe('UserController', () => {
  let controller: UserController;

  const date = new Date();
  const mockUserData = {
    id: 'uuid',
    username: 'user',
    email: 'email@mail.com',
    password: '1234',
    created_at: date,
    updated_at: date,
  };
  const mockUserResponse = {
    id: 'uuid',
    username: 'user',
    email: 'email@mail.com',
    createdAt: date,
  };

  const serializeResponse = (data: UserResponseDto) => {
    return instanceToPlain(data, {
      exposeUnsetFields: false,
    });
  };
  const mockUserService = {
    showUser: jest.fn((user: UserEntity) => {
      return new UserResponseDto(user);
    }),
    loginUser: jest.fn((userLogin: UserLoginDto) => {
      return new UserResponseDto(userLogin);
    }),
    createUser: jest.fn((userData: UserDataDto) => {
      void userData;
      return { message: 'User created successfully', token: 'Token' };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('Should get user', () => {
    const response = controller.getUser(mockUserData as UserEntity);
    const serializedResponse = serializeResponse(response);

    expect(serializedResponse).toEqual(mockUserResponse);
    expect(mockUserService.showUser).toHaveBeenCalled();
  });

  it('Should login user', async () => {
    const response = await controller.loginUser(mockUserData as UserEntity);
    const serializedResponse = serializeResponse(response);

    expect(serializedResponse).toEqual(mockUserResponse);
    expect(mockUserService.loginUser).toHaveBeenCalled();
  });

  it('Should create user', async () => {
    const expectedResponse = {
      message: 'User created successfully',
      token: 'Token',
    };
    const response = await controller.createUser(mockUserData as UserEntity);

    expect(response).toEqual(expectedResponse);
    expect(mockUserService.createUser).toHaveBeenCalled();
  });
});
