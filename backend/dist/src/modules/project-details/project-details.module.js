"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectDetailsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const budget_history_entity_1 = require("./3-domain/entities/budget-history.entity");
const shooting_hours_entity_1 = require("./3-domain/entities/shooting-hours.entity");
const comment_entity_1 = require("./3-domain/entities/comment.entity");
const budget_history_service_1 = require("./2-application/use-cases/budget-history.service");
const shooting_hours_service_1 = require("./2-application/use-cases/shooting-hours.service");
const comments_service_1 = require("./2-application/use-cases/comments.service");
const project_details_controller_1 = require("./1-presentation/controllers/project-details.controller");
const projects_module_1 = require("../projects/projects.module");
const users_module_1 = require("../users/users.module");
const project_entity_1 = require("../projects/3-domain/entities/project.entity");
const user_entity_1 = require("../users/3-domain/entities/user.entity");
const tasks_module_1 = require("../tasks/tasks.module");
let ProjectDetailsModule = class ProjectDetailsModule {
};
exports.ProjectDetailsModule = ProjectDetailsModule;
exports.ProjectDetailsModule = ProjectDetailsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([budget_history_entity_1.BudgetHistory, shooting_hours_entity_1.ShootingHours, comment_entity_1.Comment, project_entity_1.Project, user_entity_1.User]),
            projects_module_1.ProjectsModule,
            users_module_1.UsersModule,
            tasks_module_1.TasksModule
        ],
        providers: [budget_history_service_1.BudgetHistoryService, shooting_hours_service_1.ShootingHoursService, comments_service_1.CommentsService],
        controllers: [project_details_controller_1.ProjectDetailsController],
        exports: [typeorm_1.TypeOrmModule],
    })
], ProjectDetailsModule);
//# sourceMappingURL=project-details.module.js.map