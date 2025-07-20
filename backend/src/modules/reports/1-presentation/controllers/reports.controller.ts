import { Controller, Get, Post, Body, UseGuards, Query, Res, Header } from '@nestjs/common';
import { Response } from 'express';
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
  exportToExcel(@Body() data: any, @Query('name') name: string) {
    return this.reportsService.exportToExcel(data, name);
  }

  @Post('export/pdf')
  exportToPDF(@Body() data: any, @Query('name') name: string) {
    return this.reportsService.exportToPDF(data, name);
  }

  @Post('export/csv')
  exportToCSV(@Body() data: any, @Query('name') name: string) {
    return this.reportsService.exportToCSV(data, name);
  }
}
