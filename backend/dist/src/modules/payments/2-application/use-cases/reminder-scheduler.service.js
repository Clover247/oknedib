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
var ReminderSchedulerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReminderSchedulerService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payment_entity_1 = require("../../3-domain/entities/payment.entity");
const payment_reminder_entity_1 = require("../../3-domain/entities/payment-reminder.entity");
let ReminderSchedulerService = ReminderSchedulerService_1 = class ReminderSchedulerService {
    constructor(paymentsRepository, paymentRemindersRepository) {
        this.paymentsRepository = paymentsRepository;
        this.paymentRemindersRepository = paymentRemindersRepository;
        this.logger = new common_1.Logger(ReminderSchedulerService_1.name);
    }
    async handleScheduledReminders() {
        this.logger.log('Running scheduled reminders check...');
        const remindersToSend = await this.paymentRemindersRepository.find({
            where: {
                status: payment_reminder_entity_1.ReminderStatus.SCHEDULED,
                scheduledFor: (0, typeorm_2.LessThanOrEqual)(new Date()),
            },
            relations: ['payment', 'payment.project'],
        });
        if (remindersToSend.length === 0) {
            this.logger.log('No reminders to send today.');
            return;
        }
        for (const reminder of remindersToSend) {
            this.logger.log(`Sending reminder for project: ${reminder.payment.project.name}, content: ${reminder.content}`);
            reminder.status = payment_reminder_entity_1.ReminderStatus.SENT;
            reminder.sentAt = new Date();
            await this.paymentRemindersRepository.save(reminder);
        }
        this.logger.log(`Successfully sent ${remindersToSend.length} reminders.`);
    }
    async handleOverduePayments() {
        this.logger.log('Running overdue payments check...');
        const overduePayments = await this.paymentsRepository.find({
            where: {
                status: (0, typeorm_2.In)([payment_entity_1.PaymentStatus.PENDING, payment_entity_1.PaymentStatus.PARTIALLY_PAID]),
                dueDate: (0, typeorm_2.LessThanOrEqual)(new Date()),
            }
        });
        if (overduePayments.length === 0) {
            this.logger.log('No overdue payments found.');
            return;
        }
        for (const payment of overduePayments) {
            payment.status = payment_entity_1.PaymentStatus.OVERDUE;
            await this.paymentsRepository.save(payment);
            this.logger.log(`Payment ${payment.id} for project ${payment.projectId} is now OVERDUE.`);
        }
        this.logger.log(`Updated ${overduePayments.length} payments to OVERDUE status.`);
    }
};
exports.ReminderSchedulerService = ReminderSchedulerService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_9AM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReminderSchedulerService.prototype, "handleScheduledReminders", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReminderSchedulerService.prototype, "handleOverduePayments", null);
exports.ReminderSchedulerService = ReminderSchedulerService = ReminderSchedulerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __param(1, (0, typeorm_1.InjectRepository)(payment_reminder_entity_1.PaymentReminder)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ReminderSchedulerService);
//# sourceMappingURL=reminder-scheduler.service.js.map