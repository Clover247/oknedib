import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment, PaymentStatus, PaymentPart } from '@/modules/payments/3-domain/entities/payment.entity';
import { PaymentReminder, ReminderType, ReminderStatus } from '@/modules/payments/3-domain/entities/payment-reminder.entity';
import { Project } from '@/modules/projects/3-domain/entities/project.entity';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from '@/modules/payments/1-presentation/dtos/create-payment.dto';
import { UpdatePaymentDto } from '@/modules/payments/1-presentation/dtos/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
    @InjectRepository(PaymentReminder)
    private paymentRemindersRepository: Repository<PaymentReminder>,
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const project = await this.projectsRepository.findOneBy({ id: createPaymentDto.projectId });
    if (!project) {
      throw new NotFoundException(`Project with ID ${createPaymentDto.projectId} not found`);
    }

    const payment = this.paymentsRepository.create({
      ...createPaymentDto,
      project,
    });

    // Автоматичний розрахунок дат (якщо не вказано в DTO)
    if (!createPaymentDto.dueDate) {
      if (payment.paymentPart === PaymentPart.FIRST_PART) {
        payment.dueDate = project.createdAt; // Дата створення проекту
      } else if (payment.paymentPart === PaymentPart.SECOND_PART) {
        const firstPartPayment = await this.paymentsRepository.findOne({
          where: { projectId: project.id, paymentPart: PaymentPart.FIRST_PART },
          order: { createdAt: 'ASC' },
        });
        if (firstPartPayment) {
          const dueDate = new Date(firstPartPayment.createdAt);
          dueDate.setDate(dueDate.getDate() + 10);
          payment.dueDate = dueDate;
        } else {
          // Якщо перша частина не знайдена, можна встановити дефолт або кинути помилку
          payment.dueDate = new Date();
        }
      }
    }

    const savedPayment = await this.paymentsRepository.save(payment);

    // Створення нагадувань
    await this.createReminders(savedPayment);

    return savedPayment;
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentsRepository.find({ relations: ['project'] });
  }

  async findOne(id: string): Promise<Payment> {
    const payment = await this.paymentsRepository.findOne({ where: { id }, relations: ['project'] });
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return payment;
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
    const payment = await this.paymentsRepository.preload({
      id: id,
      ...updatePaymentDto,
    });
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return this.paymentsRepository.save(payment);
  }

  async remove(id: string): Promise<void> {
    const result = await this.paymentsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
  }

  private async createReminders(payment: Payment): Promise<void> {
    const remindersToCreate = [];
    const dueDate = new Date(payment.dueDate);

    // За 3 дні до дедлайну
    const threeDaysBefore = new Date(dueDate);
    threeDaysBefore.setDate(dueDate.getDate() - 3);
    remindersToCreate.push({
      payment,
      type: ReminderType.EMAIL,
      scheduledFor: threeDaysBefore,
      content: `Нагадування: Платіж по проекту ${payment.project.name} на суму ${payment.amount} грн. наближається. Дедлайн: ${dueDate.toLocaleDateString()}`,
    });

    // За 1 день до дедлайну
    const oneDayBefore = new Date(dueDate);
    oneDayBefore.setDate(dueDate.getDate() - 1);
    remindersToCreate.push({
      payment,
      type: ReminderType.EMAIL,
      scheduledFor: oneDayBefore,
      content: `Нагадування: Завтра дедлайн платежу по проекту ${payment.project.name} на суму ${payment.amount} грн.`,
    });

    // В день дедлайну
    remindersToCreate.push({
      payment,
      type: ReminderType.SYSTEM,
      scheduledFor: dueDate,
      content: `Сьогодні дедлайн платежу по проекту ${payment.project.name} на суму ${payment.amount} грн.`,
    });

    // Через день після пропущеного дедлайну (якщо статус PENDING або PARTIALLY_PAID)
    if (payment.status === PaymentStatus.PENDING || payment.status === PaymentStatus.PARTIALLY_PAID) {
      const oneDayAfter = new Date(dueDate);
      oneDayAfter.setDate(dueDate.getDate() + 1);
      remindersToCreate.push({
        payment,
        type: ReminderType.EMAIL,
        scheduledFor: oneDayAfter,
        content: `Увага: Платіж по проекту ${payment.project.name} на суму ${payment.amount} грн. прострочено.`,
      });
    }

    const newReminders = this.paymentRemindersRepository.create(remindersToCreate);
    await this.paymentRemindersRepository.save(newReminders);
  }
}
