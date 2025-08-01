"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const analytics_service_1 = require("./2-application/use-cases/analytics.service");
const analytics_controller_1 = require("./1-presentation/controllers/analytics.controller");
const project_entity_1 = require("../projects/3-domain/entities/project.entity");
const payment_entity_1 = require("../payments/3-domain/entities/payment.entity");
const content_plan_entity_1 = require("../content-plans/3-domain/entities/content-plan.entity");
const user_entity_1 = require("../users/3-domain/entities/user.entity");
let AnalyticsModule = class AnalyticsModule {
};
exports.AnalyticsModule = AnalyticsModule;
exports.AnalyticsModule = AnalyticsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([project_entity_1.Project, payment_entity_1.Payment, content_plan_entity_1.ContentPlan, user_entity_1.User])],
        providers: [analytics_service_1.AnalyticsService],
        controllers: [analytics_controller_1.AnalyticsController],
        exports: [],
    })
], AnalyticsModule);
//# sourceMappingURL=analytics.module.js.map