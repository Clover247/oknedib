import { IsString, IsNotEmpty, IsEnum, IsDateString, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { PaymentStatus, PaymentPart, PaymentMethod } from '@/modules/payments/3-domain/entities/payment.entity';

export class CreatePaymentDto {
  @IsUUID()
  projectId: string;

  @IsNumber()
  amount: number;

  @IsEnum(PaymentStatus)
  @IsOptional()
  status?: PaymentStatus;

  @IsEnum(PaymentPart)
  paymentPart: PaymentPart;

  @IsDateString()
  dueDate: Date;

  @IsDateString()
  @IsOptional()
  paidDate?: Date;

  @IsNumber()
  @IsOptional()
  paidAmount?: number;

  @IsEnum(PaymentMethod)
  @IsOptional()
  paymentMethod?: PaymentMethod;

  @IsString()
  @IsOptional()
  notes?: string;
}
