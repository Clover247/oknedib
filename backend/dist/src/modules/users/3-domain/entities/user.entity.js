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
exports.User = exports.UserRole = void 0;
const typeorm_1 = require("typeorm");
const project_entity_1 = require("../../../projects/3-domain/entities/project.entity");
const content_plan_item_entity_1 = require("../../../content-plans/3-domain/entities/content-plan-item.entity");
const comment_entity_1 = require("../../../project-details/3-domain/entities/comment.entity");
const task_entity_1 = require("../../../tasks/3-domain/entities/task.entity");
const google_api_credentials_entity_1 = require("../../../google-calendar/3-domain/entities/google-api-credentials.entity");
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["MANAGER"] = "MANAGER";
    UserRole["SPECIALIST"] = "SPECIALIST";
    UserRole["CONTENT_MAKER"] = "CONTENT_MAKER";
})(UserRole || (exports.UserRole = UserRole = {}));
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "passwordHash", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: UserRole,
        default: UserRole.SPECIALIST,
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => project_entity_1.Project, project => project.manager),
    __metadata("design:type", Array)
], User.prototype, "managedProjects", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => project_entity_1.Project, project => project.specialists),
    __metadata("design:type", Array)
], User.prototype, "assignedProjects", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => project_entity_1.Project, project => project.contentMakers),
    __metadata("design:type", Array)
], User.prototype, "contentMakerProjects", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => content_plan_item_entity_1.ContentPlanItem, item => item.assignee),
    __metadata("design:type", Array)
], User.prototype, "assignedContentItems", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, comment => comment.author),
    __metadata("design:type", Array)
], User.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => task_entity_1.Task, task => task.assignee),
    __metadata("design:type", Array)
], User.prototype, "tasks", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => google_api_credentials_entity_1.GoogleApiCredentials, credentials => credentials.user),
    __metadata("design:type", google_api_credentials_entity_1.GoogleApiCredentials)
], User.prototype, "googleApiCredentials", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)({ name: 'users' })
], User);
//# sourceMappingURL=user.entity.js.map