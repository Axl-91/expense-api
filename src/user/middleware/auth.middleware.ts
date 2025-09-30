import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { AuthRequest } from 'src/types/expressRequest.interface';
import { UserService } from '../user.service';

interface JwtUserPayload extends JwtPayload {
  id: string;
  username: string;
  email: string;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: AuthRequest, _res: Response, next: NextFunction) {
    const token = req.cookies.jwt as string;

    if (!token) {
      req.user = undefined;
      next();
    } else {
      try {
        const decode = verify(
          token,
          process.env.JWT_SECRET as string,
        ) as JwtUserPayload;
        const user = await this.userService.getUserById(decode.id);
        req.user = user;
      } catch {
        req.user = undefined;
      } finally {
        next();
      }
    }
  }
}
