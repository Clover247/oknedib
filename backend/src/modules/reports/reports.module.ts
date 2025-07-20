import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsService } from './2-application/use-cases/reports.service';
import { ReportsController } from './1-presentation/controllers/reports.controller';
import { Project } from '@/modules/projects/3-domain/entities/project.entity';
import { Payment } from '@/modules/payments/3-domain/entities/payment.entity';
import { ContentPlan } from '@/modules/content-plans/3-domain/entities/content-plan.entity';
import { User } from '@/modules/users/3-domain/entities/user.entity';
import { AnalyticsModule } from '../analytics/analytics.module';
import { AnalyticsService } from '../analytics/2-application/use-cases/analytics.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Payment, ContentPlan, User]), AnalyticsModule],
  providers: [ReportsService, AnalyticsService],
  controllers: [ReportsController],
  exports: [],
})
export class ReportsModule {}
