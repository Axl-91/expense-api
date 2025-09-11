import { Body, Controller, Delete, Get, Param, ParseEnumPipe, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { ReportType } from "src/data";
import { ReportService } from './report.service';
import { ReportDataDto } from "src/dtos/report.dto";

const reportTypePipe = new ParseEnumPipe(ReportType);

@Controller('report/:type')
export class ReportController {
  constructor(private readonly reportService: ReportService) { }

  @Get()
  getAllReports(@Param('type', reportTypePipe) type: ReportType) {
    return this.reportService.getAllReports(type)
  }

  @Get(':id')
  getReportById(
    @Param('type', reportTypePipe) type: ReportType,
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return this.reportService.getReportById(type, id)
  }

  @Post()
  createReport(
    @Param('type', reportTypePipe) type: ReportType,
    @Body() body: ReportDataDto
  ) {
    return this.reportService.createReport(type, body)
  }

  @Put(':id')
  editReport(
    @Param('type', reportTypePipe) type: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: ReportDataDto
  ) {
    return this.reportService.editReport(type, id, body)
  }

  @Delete(':id')
  removeReport(
    @Param('type', reportTypePipe) type: ReportType,
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return this.reportService.removeReport(type, id)
  }

}
