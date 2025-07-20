import { PaymentsService } from '@/modules/payments/2-application/use-cases/payments.service';
import { CreatePaymentDto } from '@/modules/payments/1-presentation/dtos/create-payment.dto';
import { UpdatePaymentDto } from '@/modules/payments/1-presentation/dtos/update-payment.dto';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    create(createPaymentDto: CreatePaymentDto): Promise<import("../../3-domain/entities/payment.entity").Payment>;
    findAll(): Promise<import("../../3-domain/entities/payment.entity").Payment[]>;
    findOne(id: string): Promise<import("../../3-domain/entities/payment.entity").Payment>;
    update(id: string, updatePaymentDto: UpdatePaymentDto): Promise<import("../../3-domain/entities/payment.entity").Payment>;
    remove(id: string): Promise<void>;
}
