
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, In } from 'typeorm';
import { Payment, PaymentStatus } from '@/modules/payments/3-domain/entities/payment.entity';
import { PaymentReminder, ReminderStatus } from '@/modules/payments/3-domain/entities/payment-reminder.entity';
import { EmailService } from '@/shared/services/email.service';

@Injectable()
export class ReminderSchedulerService {
  private readonly logger = new Logger(ReminderSchedulerService.name);

  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
    @InjectRepository(PaymentReminder)
    private paymentRemindersRepository: Repository<PaymentReminder>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_9AM)
  async handleScheduledReminders() {
    this.logger.log('Running scheduled reminders check...');

    const remindersToSend = await this.paymentRemindersRepository.find({
      where: {
        status: ReminderStatus.SCHEDULED,
        scheduledFor: LessThanOrEqual(new Date()),
      },
      relations: ['payment', 'payment.project'],
    });

    if (remindersToSend.length === 0) {
      this.logger.log('No reminders to send today.');
      return;
    }

    for (const reminder of remindersToSend) {
      // Тут буде логіка відправки (наприклад, email)
      // А поки що просто логуємо і оновлюємо статус
      this.logger.log(`Sending reminder for project: ${reminder.payment.project.name}, content: ${reminder.content}`);
      reminder.status = ReminderStatus.SENT;
      reminder.sentAt = new Date();
      await this.paymentRemindersRepository.save(reminder);
    }

    this.logger.log(`Successfully sent ${remindersToSend.length} reminders.`);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleOverduePayments() {
    this.logger.log('Running overdue payments check...');

    const overduePayments = await this.paymentsRepository.find({
        where: {
            status: In([PaymentStatus.PENDING, PaymentStatus.PARTIALLY_PAID]),
            dueDate: LessThanOrEqual(new Date()),
        }
    });

    if (overduePayments.length === 0) {
        this.logger.log('No overdue payments found.');
        return;
    }

    for (const payment of overduePayments) {
        payment.status = PaymentStatus.OVERDUE;
        await this.paymentsRepository.save(payment);
        this.logger.log(`Payment ${payment.id} for project ${payment.projectId} is now OVERDUE.`);
    }

    this.logger.log(`Updated ${overduePayments.length} payments to OVERDUE status.`);
  }
}
