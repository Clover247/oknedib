"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const project_entity_1 = require("./3-domain/entities/project.entity");
const projects_service_1 = require("./2-application/use-cases/projects.service");
const projects_controller_1 = require("./1-presentation/controllers/projects.controller");
const users_module_1 = require("../users/users.module");
const user_entity_1 = require("../users/3-domain/entities/user.entity");
const shooting_hours_entity_1 = require("../project-details/3-domain/entities/shooting-hours.entity");
let ProjectsModule = class ProjectsModule {
};
exports.ProjectsModule = ProjectsModule;
exports.ProjectsModule = ProjectsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([project_entity_1.Project, user_entity_1.User, shooting_hours_entity_1.ShootingHours]), users_module_1.UsersModule],
        providers: [projects_service_1.ProjectsService],
        controllers: [projects_controller_1.ProjectsController],
        exports: [typeorm_1.TypeOrmModule],
    })
], ProjectsModule);
//# sourceMappingURL=projects.module.js.map