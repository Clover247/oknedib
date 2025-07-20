import { Repository } from 'typeorm';
import { Payment } from '@/modules/payments/3-domain/entities/payment.entity';
import { PaymentReminder } from '@/modules/payments/3-domain/entities/payment-reminder.entity';
export declare class ReminderSchedulerService {
    private paymentsRepository;
    private paymentRemindersRepository;
    private readonly logger;
    constructor(paymentsRepository: Repository<Payment>, paymentRemindersRepository: Repository<PaymentReminder>);
    handleScheduledReminders(): Promise<void>;
    handleOverduePayments(): Promise<void>;
}
