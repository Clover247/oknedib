import { Project } from '@/modules/projects/3-domain/entities/project.entity';
import { PaymentReminder } from './payment-reminder.entity';
export declare enum PaymentStatus {
    PENDING = "PENDING",
    PARTIALLY_PAID = "PARTIALLY_PAID",
    PAID = "PAID",
    OVERDUE = "OVERDUE"
}
export declare enum PaymentPart {
    FIRST_PART = "FIRST_PART",
    SECOND_PART = "SECOND_PART"
}
export declare enum PaymentMethod {
    CASH = "CASH",
    BANK_TRANSFER = "BANK_TRANSFER"
}
export declare class Payment {
    id: string;
    amount: number;
    status: PaymentStatus;
    paymentPart: PaymentPart;
    dueDate: Date;
    paidDate: Date;
    paidAmount: number;
    paymentMethod: PaymentMethod;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
    project: Project;
    projectId: string;
    reminders: PaymentReminder[];
}
