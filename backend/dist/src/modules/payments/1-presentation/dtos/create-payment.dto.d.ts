import { PaymentStatus, PaymentPart, PaymentMethod } from '@/modules/payments/3-domain/entities/payment.entity';
export declare class CreatePaymentDto {
    projectId: string;
    amount: number;
    status?: PaymentStatus;
    paymentPart: PaymentPart;
    dueDate: Date;
    paidDate?: Date;
    paidAmount?: number;
    paymentMethod?: PaymentMethod;
    notes?: string;
}
