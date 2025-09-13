import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let service: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppController],
    }).compile();

    service = module.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
