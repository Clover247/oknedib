import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsService } from './2-application/use-cases/analytics.service';
import { AnalyticsController } from './1-presentation/controllers/analytics.controller';
import { Project } from '@/modules/projects/3-domain/entities/project.entity';
import { Payment } from '@/modules/payments/3-domain/entities/payment.entity';
import { ContentPlan } from '@/modules/content-plans/3-domain/entities/content-plan.entity';
import { User } from '@/modules/users/3-domain/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Payment, ContentPlan, User])],
  providers: [AnalyticsService],
  controllers: [AnalyticsController],
  exports: [],
})
export class AnalyticsModule {}
