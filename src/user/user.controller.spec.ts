import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDataDto, UserLoginDto, UserResponseDto } from './dto/user.dto';
import { UserEntity } from './user.entity';
import { instanceToPlain } from 'class-transformer';
import { Response } from 'express';

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

  const mockedJWT = {
    name: 'jwt',
    token: 'token',
    options: { httpOnly: true, sameSite: 'strict' },
  };

  const createMockResponse = (): Response => {
    const res = {} as Partial<Response>;
    res.cookie = jest.fn().mockReturnValue(res);
    res.clearCookie = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    return res as Response;
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
      return { user: new UserResponseDto(userLogin), token: mockedJWT.token };
    }),
    createUser: jest.fn((userData: UserDataDto) => {
      void userData;
      return { user: new UserResponseDto(userData), token: mockedJWT.token };
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
    const mockedRes = createMockResponse();
    const response = await controller.loginUser(
      mockUserData as UserEntity,
      mockedRes,
    );
    const serializedResponse = serializeResponse(response);

    expect(serializedResponse).toEqual(mockUserResponse);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockedRes.cookie).toHaveBeenCalledWith(
      mockedJWT.name,
      mockedJWT.token,
      mockedJWT.options,
    );
    expect(mockUserService.loginUser).toHaveBeenCalled();
  });

  it('Should create user', async () => {
    const mockedRes = createMockResponse();
    const response = await controller.createUser(
      mockUserData as UserEntity,
      mockedRes,
    );
    const serializedResponse = serializeResponse(response);

    expect(serializedResponse).toEqual(mockUserResponse);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockedRes.cookie).toHaveBeenCalledWith(
      mockedJWT.name,
      mockedJWT.token,
      mockedJWT.options,
    );
    expect(mockUserService.createUser).toHaveBeenCalled();
  });
});
