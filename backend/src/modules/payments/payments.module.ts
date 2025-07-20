import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './3-domain/entities/payment.entity';
import { PaymentReminder } from './3-domain/entities/payment-reminder.entity';
import { PaymentsController } from './1-presentation/controllers/payments.controller';
import { PaymentsService } from './2-application/use-cases/payments.service';
import { ReminderSchedulerService } from './2-application/use-cases/reminder-scheduler.service';
import { Project } from '../projects/3-domain/entities/project.entity';

import { EmailService } from '@/shared/services/email.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, PaymentReminder, Project]), // Додаємо Project до forFeature
    ProjectsModule, // Додаємо ProjectsModule до імпортів
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService, ReminderSchedulerService, EmailService],
})
export class PaymentsModule {}
