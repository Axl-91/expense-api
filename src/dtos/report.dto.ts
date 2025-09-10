import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class ReportDataDto {
  @IsString()
  @IsPositive()
  source: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number
};

