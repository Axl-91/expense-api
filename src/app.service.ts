import { Injectable, NotFoundException } from '@nestjs/common';
import { data, ReportType } from './data';
import { v4 as uuid } from "uuid";
import type { Report } from './data'
import { ReportDataDto } from './dtos/report.dto';

@Injectable()
export class AppService {
  getAllReports(type: ReportType) {
    return data.report.filter(
      (report) => report.type === type
    )
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
    return report
  }

  createReport(
    type: ReportType,
    reportData: ReportDataDto
  ): Report {
    const newReport: Report = {
      id: uuid(),
      ...reportData,
      created_at: new Date(),
      updated_at: new Date(),
      type: type
    }

    data.report.push(newReport)
    return newReport
  }

  editReport(
    type: ReportType,
    id: string,
    reportData: ReportDataDto
  ) {
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
    return report
  }

  removeReport(
    type: ReportType,
    id: string
  ) {
    const reportToDelete =
      data.report.findIndex(
        (report) =>
          report.type === type && report.id === id
      )

    if (reportToDelete === -1)
      throw new NotFoundException(`Report with id ${id} not found`);

    const [reportDeleted] = data.report.splice(reportToDelete, 1)

    return reportDeleted
  }
}
