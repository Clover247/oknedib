"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const payment_entity_1 = require("./3-domain/entities/payment.entity");
const payment_reminder_entity_1 = require("./3-domain/entities/payment-reminder.entity");
const payments_controller_1 = require("./1-presentation/controllers/payments.controller");
const payments_service_1 = require("./2-application/use-cases/payments.service");
const reminder_scheduler_service_1 = require("./2-application/use-cases/reminder-scheduler.service");
const projects_module_1 = require("../projects/projects.module");
const project_entity_1 = require("../projects/3-domain/entities/project.entity");
const shared_module_1 = require("../../shared/shared.module");
let PaymentsModule = class PaymentsModule {
};
exports.PaymentsModule = PaymentsModule;
exports.PaymentsModule = PaymentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([payment_entity_1.Payment, payment_reminder_entity_1.PaymentReminder, project_entity_1.Project]),
            projects_module_1.ProjectsModule,
            shared_module_1.SharedModule,
        ],
        controllers: [payments_controller_1.PaymentsController],
        providers: [payments_service_1.PaymentsService, reminder_scheduler_service_1.ReminderSchedulerService],
    })
], PaymentsModule);
//# sourceMappingURL=payments.module.js.map