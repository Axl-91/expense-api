import { Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";

@Controller('report')
export class AppController {
  @Get('income')
  getAllIncomeReport() {
    return []
  }

  @Get('income/:id')
  getIncomeReportById(@Param('id') id: String) {
    return { id: id }
  }

  @Post('income')
  createIncomeReport() {
    return {}
  }

  @Put('income/:id')
  editIncomeReport(@Param('id') id: String) {
    return { id: id }
  }

  @Delete('income/:id')
  removeIncomeReport(@Param('id') id: String) {
    return { id: id }
  }
}
