import { Body, Controller, Delete, Get, Param, ParseEnumPipe, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { ReportType } from "./data";
import type { Report } from "./data"
import { AppService } from "./app.service";
import { ReportDataDto } from "./dtos/report.dto";

const reportTypePipe = new ParseEnumPipe(ReportType);

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getAllReports(@Param('type', reportTypePipe) type: ReportType) {
    return this.appService.getAllReports(type)
  }

  @Get(':id')
  getReportById(
    @Param('type', reportTypePipe) type: ReportType,
    @Param('id', ParseUUIDPipe) id: string
  ): Report | {} {
    return this.appService.getReportById(type, id)
  }

  @Post()
  createReport(
    @Param('type', reportTypePipe) type: ReportType,
    @Body() body: ReportDataDto
  ): Report {
    return this.appService.createReport(type, body)
  }

  @Put(':id')
  editReport(
    @Param('type', reportTypePipe) type: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: ReportDataDto
  ) {
    return this.appService.editReport(type, id, body)
  }

  @Delete(':id')
  removeReport(
    @Param('type', reportTypePipe) type: ReportType,
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return this.appService.removeReport(type, id)
  }
}
