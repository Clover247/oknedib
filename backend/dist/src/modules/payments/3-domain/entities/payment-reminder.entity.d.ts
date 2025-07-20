import { Payment } from './payment.entity';
export declare enum ReminderType {
    EMAIL = "EMAIL",
    PUSH = "PUSH",
    SYSTEM = "SYSTEM"
}
export declare enum ReminderStatus {
    SCHEDULED = "SCHEDULED",
    SENT = "SENT",
    FAILED = "FAILED"
}
export declare class PaymentReminder {
    id: string;
    type: ReminderType;
    status: ReminderStatus;
    scheduledFor: Date;
    sentAt: Date;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    payment: Payment;
    paymentId: string;
}
