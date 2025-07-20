"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const payment_entity_1 = require("../../3-domain/entities/payment.entity");
const payment_reminder_entity_1 = require("../../3-domain/entities/payment-reminder.entity");
const project_entity_1 = require("../../../projects/3-domain/entities/project.entity");
const typeorm_2 = require("typeorm");
let PaymentsService = class PaymentsService {
    constructor(paymentsRepository, paymentRemindersRepository, projectsRepository) {
        this.paymentsRepository = paymentsRepository;
        this.paymentRemindersRepository = paymentRemindersRepository;
        this.projectsRepository = projectsRepository;
    }
    async create(createPaymentDto) {
        const project = await this.projectsRepository.findOneBy({ id: createPaymentDto.projectId });
        if (!project) {
            throw new common_1.NotFoundException(`Project with ID ${createPaymentDto.projectId} not found`);
        }
        const payment = this.paymentsRepository.create({
            ...createPaymentDto,
            project,
        });
        if (!createPaymentDto.dueDate) {
            if (payment.paymentPart === payment_entity_1.PaymentPart.FIRST_PART) {
                payment.dueDate = project.createdAt;
            }
            else if (payment.paymentPart === payment_entity_1.PaymentPart.SECOND_PART) {
                const firstPartPayment = await this.paymentsRepository.findOne({
                    where: { projectId: project.id, paymentPart: payment_entity_1.PaymentPart.FIRST_PART },
                    order: { createdAt: 'ASC' },
                });
                if (firstPartPayment) {
                    const dueDate = new Date(firstPartPayment.createdAt);
                    dueDate.setDate(dueDate.getDate() + 10);
                    payment.dueDate = dueDate;
                }
                else {
                    payment.dueDate = new Date();
                }
            }
        }
        const savedPayment = await this.paymentsRepository.save(payment);
        await this.createReminders(savedPayment);
        return savedPayment;
    }
    async findAll() {
        return this.paymentsRepository.find({ relations: ['project'] });
    }
    async findOne(id) {
        const payment = await this.paymentsRepository.findOne({ where: { id }, relations: ['project'] });
        if (!payment) {
            throw new common_1.NotFoundException(`Payment with ID ${id} not found`);
        }
        return payment;
    }
    async update(id, updatePaymentDto) {
        const payment = await this.paymentsRepository.preload({
            id: id,
            ...updatePaymentDto,
        });
        if (!payment) {
            throw new common_1.NotFoundException(`Payment with ID ${id} not found`);
        }
        return this.paymentsRepository.save(payment);
    }
    async remove(id) {
        const result = await this.paymentsRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Payment with ID ${id} not found`);
        }
    }
    async createReminders(payment) {
        const remindersToCreate = [];
        const dueDate = new Date(payment.dueDate);
        const threeDaysBefore = new Date(dueDate);
        threeDaysBefore.setDate(dueDate.getDate() - 3);
        remindersToCreate.push({
            payment,
            type: payment_reminder_entity_1.ReminderType.EMAIL,
            scheduledFor: threeDaysBefore,
            content: `Нагадування: Платіж по проекту ${payment.project.name} на суму ${payment.amount} грн. наближається. Дедлайн: ${dueDate.toLocaleDateString()}`,
        });
        const oneDayBefore = new Date(dueDate);
        oneDayBefore.setDate(dueDate.getDate() - 1);
        remindersToCreate.push({
            payment,
            type: payment_reminder_entity_1.ReminderType.EMAIL,
            scheduledFor: oneDayBefore,
            content: `Нагадування: Завтра дедлайн платежу по проекту ${payment.project.name} на суму ${payment.amount} грн.`,
        });
        remindersToCreate.push({
            payment,
            type: payment_reminder_entity_1.ReminderType.SYSTEM,
            scheduledFor: dueDate,
            content: `Сьогодні дедлайн платежу по проекту ${payment.project.name} на суму ${payment.amount} грн.`,
        });
        if (payment.status === payment_entity_1.PaymentStatus.PENDING || payment.status === payment_entity_1.PaymentStatus.PARTIALLY_PAID) {
            const oneDayAfter = new Date(dueDate);
            oneDayAfter.setDate(dueDate.getDate() + 1);
            remindersToCreate.push({
                payment,
                type: payment_reminder_entity_1.ReminderType.EMAIL,
                scheduledFor: oneDayAfter,
                content: `Увага: Платіж по проекту ${payment.project.name} на суму ${payment.amount} грн. прострочено.`,
            });
        }
        const newReminders = this.paymentRemindersRepository.create(remindersToCreate);
        await this.paymentRemindersRepository.save(newReminders);
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __param(1, (0, typeorm_1.InjectRepository)(payment_reminder_entity_1.PaymentReminder)),
    __param(2, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map