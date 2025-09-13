import { Test, TestingModule } from '@nestjs/testing';
import { ReportService } from './report.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ReportEntity } from './report.entity';

describe('ReportService', () => {
  let service: ReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers:
        [
          ReportService,
          {
            provide: getRepositoryToken(ReportEntity),
            useValue: {
              find: jest.fn(),
              save: jest.fn(),
              findOne: jest.fn()
            }
          }
        ],
    }).compile();

    service = module.get<ReportService>(ReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
