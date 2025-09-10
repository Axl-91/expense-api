import { Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { data, ReportType } from "./data";

@Controller('report/:type')
export class AppController {
  @Get()
  getAllReports(@Param('type') type: string) {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE
    return data.report.filter(
      (report) => report.type === reportType
    )
  }

  @Get(':id')
  getReportById(
    @Param('type') type: string,
    @Param('id') id: string
  ): Report | {} {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE
    const report = data.report.find((report) => report.type === reportType && report.id === id)
    return report || {}
  }

  @Post()
  createReport() {
    return {}
  }

  @Put(':id')
  editReport(@Param('id') id: string) {
    return { id: id }
  }

  @Delete(':id')
  removeReport(@Param('id') id: string) {
    return { id: id }
  }
}
