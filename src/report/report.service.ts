import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportEntity, ReportType } from './report.entity';
import { ReportDataDto, ReportResponseDto } from './dto/report.dto';

type ResponseJson = { message: string };

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(ReportEntity)
    private readonly reportsRepository: Repository<ReportEntity>,
  ) {}

  async getAllReports(type: ReportType): Promise<ReportResponseDto[]> {
    const reports = await this.reportsRepository.find({
      where: { type: type },
    });
    return reports.map((report) => new ReportResponseDto(report));
  }

  async getReportById(
    type: ReportType,
    id: string,
  ): Promise<ReportResponseDto> {
    const report = await this.reportsRepository.findOne({
      where: {
        id: id,
        type: type,
      },
    });

    if (!report) throw new NotFoundException(`Report with id ${id} not found`);

    return new ReportResponseDto(report);
  }

  async createReport(
    type: ReportType,
    reportData: ReportDataDto,
  ): Promise<ResponseJson> {
    try {
      await this.reportsRepository
        .createQueryBuilder()
        .insert()
        .into('reports')
        .values({
          ...reportData,
          type: type,
        })
        .execute();

      return { message: 'Report created successfully' };
    } catch (err) {
      console.error('Insert failed:', err);
      throw new InternalServerErrorException('Could not insert report');
    }
  }

  async editReport(
    type: ReportType,
    id: string,
    reportData: ReportDataDto,
  ): Promise<ResponseJson> {
    try {
      const result = await this.reportsRepository
        .createQueryBuilder()
        .update(ReportEntity)
        .set({ ...reportData })
        .where('id = :id AND type = :type', { id: id, type: type })
        .execute();

      if (result.affected == 0)
        throw new NotFoundException(`Report with id ${id} not found`);

      return { message: 'Report deleted successfully' };
    } catch (err) {
      if (err instanceof NotFoundException) throw err;

      console.error('Delete failed:', err);
      throw new InternalServerErrorException('Could not delete report');
    }
  }

  async removeReport(type: ReportType, id: string): Promise<ResponseJson> {
    try {
      const result = await this.reportsRepository
        .createQueryBuilder()
        .delete()
        .from(ReportEntity)
        .where('id = :id AND type = :type', { id: id, type: type })
        .execute();

      if (result.affected == 0)
        throw new NotFoundException(`Report with id ${id} not found`);

      return { message: 'Report deleted successfully' };
    } catch (err) {
      if (err instanceof NotFoundException) throw err;

      console.error('Delete failed:', err);
      throw new InternalServerErrorException('Could not delete report');
    }
  }
}
