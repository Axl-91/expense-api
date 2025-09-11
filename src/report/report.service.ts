import { Injectable, NotFoundException } from '@nestjs/common';
import { data, ReportType } from 'src/data';
import { v4 as uuid } from "uuid";
import type { Report } from 'src/data'
import { ReportDataDto, ReportResponseDto } from 'src/dtos/report.dto';

@Injectable()
export class ReportService {
  getAllReports(type: ReportType): ReportResponseDto[] {
    return data.report.filter(
      (report) => report.type === type
    ).map((report) => new ReportResponseDto(report))
  }

  getReportById(
    type: ReportType,
    id: string
  ) {
    const report =
      data.report.find(
        (report) =>
          report.type === type && report.id === id
      )
    if (!report)
      throw new NotFoundException(`Report with id ${id} not found`);

    return new ReportResponseDto(report)
  }

  createReport(
    type: ReportType,
    reportData: ReportDataDto
  ): ReportResponseDto {
    const newReport: Report = {
      id: uuid(),
      ...reportData,
      created_at: new Date(),
      updated_at: new Date(),
      type: type
    }

    data.report.push(newReport)
    return new ReportResponseDto(newReport)
  }

  editReport(
    type: ReportType,
    id: string,
    reportData: ReportDataDto
  ): ReportResponseDto {
    let report =
      data.report.find(
        (report) =>
          report.type === type && report.id === id
      )

    if (!report)
      throw new NotFoundException(`Report with id ${id} not found`);

    report.source = reportData.source
    report.amount = reportData.amount
    report.updated_at = new Date()

    return new ReportResponseDto(report)
  }

  removeReport(
    type: ReportType,
    id: string
  ): ReportResponseDto {
    const reportToDelete =
      data.report.findIndex(
        (report) =>
          report.type === type && report.id === id
      )

    if (reportToDelete === -1)
      throw new NotFoundException(`Report with id ${id} not found`);

    const [reportDeleted] = data.report.splice(reportToDelete, 1)

    return new ReportResponseDto(reportDeleted)
  }
}
