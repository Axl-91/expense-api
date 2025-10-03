import { Exclude, Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { ReportEntity, ReportType } from '../../report/report.entity';
import { UserEntity } from '../../user/user.entity';

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

  @Transform(({ obj }: { obj: ReportEntity }) => obj.user?.id, {
    toPlainOnly: true,
  })
  user_id: string;

  @Exclude()
  user: UserEntity;

  constructor(partial: Partial<ReportDataDto>) {
    Object.assign(this, partial);
  }
}
