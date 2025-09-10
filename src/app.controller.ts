import { Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { data, ReportType } from "./data";

@Controller('report/:type')
export class AppController {
  @Get()
  getAllIncomeReport(@Param('type') type: string) {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE
    return data.report.filter(
      (report) => report.type === reportType
    )
  }

  @Get(':id')
  getIncomeReportById(@Param('id') id: string) {
    return { id: id }
  }

  @Post()
  createIncomeReport() {
    return {}
  }

  @Put(':id')
  editIncomeReport(@Param('id') id: string) {
    return { id: id }
  }

  @Delete(':id')
  removeIncomeReport(@Param('id') id: string) {
    return { id: id }
  }
}
