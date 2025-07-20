import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { ReportsService } from '@/modules/reports/2-application/use-cases/reports.service';
import { JwtAuthGuard } from '@/modules/auth/1-presentation/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('projects')
  getProjectReport() {
    return this.reportsService.generateProjectReport();
  }

  @Get('financial')
  getFinancialReport(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    return this.reportsService.generateFinancialReport(start, end);
  }

  @Get('performance')
  getPerformanceReport() {
    return this.reportsService.generatePerformanceReport();
  }

  @Post('export/excel')
  @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  async exportToExcel(@Body() data: any, @Query('name') name: string, @Res() res: Response) {
    const buffer = await this.reportsService.exportToExcel(data, name);
    res.send(buffer);
  }

  @Post('export/pdf')
  @Header('Content-Type', 'application/pdf')
  async exportToPDF(@Body() data: any, @Query('name') name: string, @Res() res: Response) {
    const buffer = await this.reportsService.exportToPDF(data, name);
    res.send(buffer);
  }

  @Post('export/csv')
  @Header('Content-Type', 'text/csv')
  async exportToCSV(@Body() data: any, @Query('name') name: string, @Res() res: Response) {
    const csv = await this.reportsService.exportToCSV(data, name);
    res.send(csv);
  }
}
