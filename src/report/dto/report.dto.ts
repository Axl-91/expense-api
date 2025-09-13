import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { ReportType } from 'src/report/report.entity';

export class ReportDataDto {
  @IsString()
  source: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  amount: number;
}

export class ReportResponseDto {
  id: string;
  source: string;
  amount: number;

  @Expose({ name: 'createdAt' })
  created_at: Date;

  @Exclude()
  updated_at: Date;

  type: ReportType;

  constructor(partial: Partial<ReportDataDto>) {
    Object.assign(this, partial);
  }
}
