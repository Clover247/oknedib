import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Payment } from './payment.entity';

export enum ReminderType {
  EMAIL = 'EMAIL',
  PUSH = 'PUSH',
  SYSTEM = 'SYSTEM',
}

export enum ReminderStatus {
  SCHEDULED = 'SCHEDULED',
  SENT = 'SENT',
  FAILED = 'FAILED',
}

@Entity({ name: 'payment_reminders' })
export class PaymentReminder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ReminderType,
  })
  type: ReminderType;

  @Column({
    type: 'enum',
    enum: ReminderStatus,
    default: ReminderStatus.SCHEDULED,
  })
  status: ReminderStatus;

  @Column({ type: 'timestamp with time zone' })
  scheduledFor: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  sentAt: Date;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Payment, payment => payment.reminders, { onDelete: 'CASCADE' })
  payment: Payment;

  @Column() // Foreign key for payment
  paymentId: string;
}
