import { Payment } from '@/modules/payments/3-domain/entities/payment.entity';
import { PaymentReminder } from '@/modules/payments/3-domain/entities/payment-reminder.entity';
import { Project } from '@/modules/projects/3-domain/entities/project.entity';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from '@/modules/payments/1-presentation/dtos/create-payment.dto';
import { UpdatePaymentDto } from '@/modules/payments/1-presentation/dtos/update-payment.dto';
export declare class PaymentsService {
    private paymentsRepository;
    private paymentRemindersRepository;
    private projectsRepository;
    constructor(paymentsRepository: Repository<Payment>, paymentRemindersRepository: Repository<PaymentReminder>, projectsRepository: Repository<Project>);
    create(createPaymentDto: CreatePaymentDto): Promise<Payment>;
    findAll(): Promise<Payment[]>;
    findOne(id: string): Promise<Payment>;
    update(id: string, updatePaymentDto: UpdatePaymentDto): Promise<Payment>;
    remove(id: string): Promise<void>;
    private createReminders;
}
