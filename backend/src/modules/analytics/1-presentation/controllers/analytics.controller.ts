import { Controller, Get, UseGuards, Query, UseInterceptors } from '@nestjs/common';
import { AnalyticsService } from '@/modules/analytics/2-application/use-cases/analytics.service';
import { JwtAuthGuard } from '@/modules/auth/1-presentation/guards/jwt-auth.guard';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';

@UseGuards(JwtAuthGuard)
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('projects')
  getProjectAnalytics() {
    return this.analyticsService.getProjectAnalytics();
  }

  @Get('financial')
  @CacheKey('financial_analytics')
  getFinancialAnalytics(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    return this.analyticsService.getFinancialAnalytics(start, end);
  }

  @Get('content')
  getContentAnalytics() {
    return this.analyticsService.getContentAnalytics();
  }

  @Get('specialists')
  getSpecialistAnalytics() {
    return this.analyticsService.getSpecialistAnalytics();
  }
}
