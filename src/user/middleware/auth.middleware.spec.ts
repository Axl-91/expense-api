import { AuthMiddleware } from './auth.middleware';

describe('MiddlewareMiddleware', () => {
  it('should be defined', () => {
    expect(new AuthMiddleware()).toBeDefined();
  });
});
