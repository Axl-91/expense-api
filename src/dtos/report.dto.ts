import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";
import { ReportType } from "src/data";

export class ReportDataDto {
  @IsString()
  @IsPositive()
  source: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number
};

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
    Object.assign(this, partial)
  }
};
