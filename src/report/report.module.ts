import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportEntity } from './report.entity';
import { UserEntity } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReportEntity, UserEntity])],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
