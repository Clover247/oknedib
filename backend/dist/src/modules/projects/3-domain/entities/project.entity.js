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
exports.Project = exports.ProjectStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../../users/3-domain/entities/user.entity");
const payment_entity_1 = require("../../../payments/3-domain/entities/payment.entity");
const budget_history_entity_1 = require("../../../project-details/3-domain/entities/budget-history.entity");
const shooting_hours_entity_1 = require("../../../project-details/3-domain/entities/shooting-hours.entity");
const comment_entity_1 = require("../../../project-details/3-domain/entities/comment.entity");
const content_plan_entity_1 = require("../../../content-plans/3-domain/entities/content-plan.entity");
const task_entity_1 = require("../../../tasks/3-domain/entities/task.entity");
const calendar_event_entity_1 = require("../../../google-calendar/3-domain/entities/calendar-event.entity");
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus["ACTIVE"] = "ACTIVE";
    ProjectStatus["COMPLETED"] = "COMPLETED";
    ProjectStatus["ARCHIVED"] = "ARCHIVED";
    ProjectStatus["PAUSED"] = "PAUSED";
})(ProjectStatus || (exports.ProjectStatus = ProjectStatus = {}));
let Project = class Project {
};
exports.Project = Project;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Project.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Project.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ProjectStatus,
        default: ProjectStatus.ACTIVE,
    }),
    __metadata("design:type", String)
], Project.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Project.prototype, "budget", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Project.prototype, "budgetForTargeting", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Project.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Project.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Project.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Project.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.managedProjects, { nullable: true }),
    __metadata("design:type", user_entity_1.User)
], Project.prototype, "manager", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "managerId", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, user => user.assignedProjects),
    (0, typeorm_1.JoinTable)({
        name: 'project_specialists',
        joinColumn: { name: 'projectId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], Project.prototype, "specialists", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, user => user.contentMakerProjects),
    (0, typeorm_1.JoinTable)({
        name: 'project_content_makers',
        joinColumn: { name: 'projectId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], Project.prototype, "contentMakers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => payment_entity_1.Payment, payment => payment.project),
    __metadata("design:type", Array)
], Project.prototype, "payments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => budget_history_entity_1.BudgetHistory, history => history.project),
    __metadata("design:type", Array)
], Project.prototype, "budgetHistory", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => shooting_hours_entity_1.ShootingHours, hours => hours.project),
    __metadata("design:type", Array)
], Project.prototype, "shootingHours", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, comment => comment.project),
    __metadata("design:type", Array)
], Project.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => content_plan_entity_1.ContentPlan, contentPlan => contentPlan.project),
    __metadata("design:type", Array)
], Project.prototype, "contentPlans", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => task_entity_1.Task, task => task.project),
    __metadata("design:type", Array)
], Project.prototype, "tasks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => calendar_event_entity_1.CalendarEvent, event => event.project),
    __metadata("design:type", Array)
], Project.prototype, "calendarEvents", void 0);
exports.Project = Project = __decorate([
    (0, typeorm_1.Entity)({ name: 'projects' })
], Project);
//# sourceMappingURL=project.entity.js.map