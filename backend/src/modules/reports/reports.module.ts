import { AnalyticsService } from '../analytics/2-application/use-cases/analytics.service';
import { AnalyticsModule } from '../analytics/analytics.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Payment, ContentPlan, User]), AnalyticsModule],
  providers: [ReportsService, AnalyticsService],
  controllers: [ReportsController],
  exports: [],
})
export class ReportsModule {}
