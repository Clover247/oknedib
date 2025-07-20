import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './3-domain/entities/payment.entity';
import { PaymentReminder } from './3-domain/entities/payment-reminder.entity';
import { PaymentsController } from './1-presentation/controllers/payments.controller';
import { PaymentsService } from './2-application/use-cases/payments.service';
import { ReminderSchedulerService } from './2-application/use-cases/reminder-scheduler.service';
import { ProjectsModule } from '../projects/projects.module';
import { Project } from '../projects/3-domain/entities/project.entity';
import { SharedModule } from '@/shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, PaymentReminder, Project]),
    ProjectsModule,
    SharedModule,
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService, ReminderSchedulerService],
})
export class PaymentsModule {}
