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

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('user/:id')
  getReportsByUser(@Param('id', ParseUUIDPipe) userId: string) {
    return this.reportService.getReportsByUser(userId);
  }

  @Get(':type')
  getAllReports(@Param('type', reportTypePipe) type: ReportType) {
    return this.reportService.getAllReports(type);
  }

  @Get(':type/:id')
  getReportById(
    @Param('type', reportTypePipe) type: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.reportService.getReportById(type, id);
  }

  @Post(':type/user/:id')
  createReport(
    @Param('type', reportTypePipe) type: ReportType,
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() body: ReportDataDto,
  ) {
    return this.reportService.createReport(type, body, userId);
  }

  @Put(':type/:id')
  editReport(
    @Param('type', reportTypePipe) type: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: ReportDataDto,
  ) {
    return this.reportService.editReport(type, id, body);
  }

  @Delete(':type/:id')
  removeReport(
    @Param('type', reportTypePipe) type: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.reportService.removeReport(type, id);
  }
}
