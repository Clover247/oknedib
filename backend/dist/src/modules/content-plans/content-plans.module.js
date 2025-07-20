"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentPlansModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const content_plan_entity_1 = require("./3-domain/entities/content-plan.entity");
const content_plan_item_entity_1 = require("./3-domain/entities/content-plan-item.entity");
const content_plan_file_entity_1 = require("./3-domain/entities/content-plan-file.entity");
const content_plans_service_1 = require("./2-application/use-cases/content-plans.service");
const content_plans_controller_1 = require("./1-presentation/controllers/content-plans.controller");
const projects_module_1 = require("../projects/projects.module");
const users_module_1 = require("../users/users.module");
const project_entity_1 = require("../projects/3-domain/entities/project.entity");
const user_entity_1 = require("../users/3-domain/entities/user.entity");
const shared_module_1 = require("../../shared/shared.module");
let ContentPlansModule = class ContentPlansModule {
};
exports.ContentPlansModule = ContentPlansModule;
exports.ContentPlansModule = ContentPlansModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([content_plan_entity_1.ContentPlan, content_plan_item_entity_1.ContentPlanItem, content_plan_file_entity_1.ContentPlanFile, project_entity_1.Project, user_entity_1.User]),
            projects_module_1.ProjectsModule,
            users_module_1.UsersModule,
            shared_module_1.SharedModule,
        ],
        providers: [content_plans_service_1.ContentPlansService],
        controllers: [content_plans_controller_1.ContentPlansController],
        exports: [typeorm_1.TypeOrmModule],
    })
], ContentPlansModule);
//# sourceMappingURL=content-plans.module.js.map