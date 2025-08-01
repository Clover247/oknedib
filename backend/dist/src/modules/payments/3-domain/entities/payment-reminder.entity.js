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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentReminder = exports.ReminderStatus = exports.ReminderType = void 0;
const typeorm_1 = require("typeorm");
const payment_entity_1 = require("./payment.entity");
var ReminderType;
(function (ReminderType) {
    ReminderType["EMAIL"] = "EMAIL";
    ReminderType["PUSH"] = "PUSH";
    ReminderType["SYSTEM"] = "SYSTEM";
})(ReminderType || (exports.ReminderType = ReminderType = {}));
var ReminderStatus;
(function (ReminderStatus) {
    ReminderStatus["SCHEDULED"] = "SCHEDULED";
    ReminderStatus["SENT"] = "SENT";
    ReminderStatus["FAILED"] = "FAILED";
})(ReminderStatus || (exports.ReminderStatus = ReminderStatus = {}));
let PaymentReminder = class PaymentReminder {
};
exports.PaymentReminder = PaymentReminder;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PaymentReminder.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ReminderType,
    }),
    __metadata("design:type", String)
], PaymentReminder.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ReminderStatus,
        default: ReminderStatus.SCHEDULED,
    }),
    __metadata("design:type", String)
], PaymentReminder.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], PaymentReminder.prototype, "scheduledFor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp with time zone', nullable: true }),
    __metadata("design:type", Date)
], PaymentReminder.prototype, "sentAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], PaymentReminder.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PaymentReminder.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], PaymentReminder.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => payment_entity_1.Payment, payment => payment.reminders, { onDelete: 'CASCADE' }),
    __metadata("design:type", payment_entity_1.Payment)
], PaymentReminder.prototype, "payment", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PaymentReminder.prototype, "paymentId", void 0);
exports.PaymentReminder = PaymentReminder = __decorate([
    (0, typeorm_1.Entity)({ name: 'payment_reminders' })
], PaymentReminder);
//# sourceMappingURL=payment-reminder.entity.js.map