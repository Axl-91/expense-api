import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseEnumPipe,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportType } from './report.entity';
import { ReportDataDto } from './dto/report.dto';

const reportTypePipe = new ParseEnumPipe(ReportType);

@Controller('report/:type')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  getAllReports(@Param('type', reportTypePipe) type: ReportType) {
    return this.reportService.getAllReports(type);
  }

  @Get(':id')
  getReportById(
    @Param('type', reportTypePipe) type: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.reportService.getReportById(type, id);
  }

  @Get('/user/:id')
  getReportsByUser(
    @Param('type', reportTypePipe) type: ReportType,
    @Param('id', ParseUUIDPipe) userId: string,
  ) {
    return this.reportService.getReportsByUser(type, userId);
  }

  @Post('/user/:id')
  createReport(
    @Param('type', reportTypePipe) type: ReportType,
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() body: ReportDataDto,
  ) {
    return this.reportService.createReport(type, body, userId);
  }

  @Put(':id')
  editReport(
    @Param('type', reportTypePipe) type: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: ReportDataDto,
  ) {
    return this.reportService.editReport(type, id, body);
  }

  @Delete(':id')
  removeReport(
    @Param('type', reportTypePipe) type: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.reportService.removeReport(type, id);
  }
}
