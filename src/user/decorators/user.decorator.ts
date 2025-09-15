import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from 'src/types/expressRequest.interface';
import { UserEntity } from '../user.entity';

export const User = createParamDecorator(
  (data: keyof UserEntity, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<AuthRequest>();
    const user = req.user ?? new UserEntity();

    if (data) return user[data];

    return user;
  },
);
