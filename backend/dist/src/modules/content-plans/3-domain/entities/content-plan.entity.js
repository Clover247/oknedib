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
exports.ContentPlan = exports.ContentPlanStatus = void 0;
const typeorm_1 = require("typeorm");
const project_entity_1 = require("../../../projects/3-domain/entities/project.entity");
const content_plan_item_entity_1 = require("./content-plan-item.entity");
var ContentPlanStatus;
(function (ContentPlanStatus) {
    ContentPlanStatus["DRAFT"] = "DRAFT";
    ContentPlanStatus["APPROVED"] = "APPROVED";
    ContentPlanStatus["IN_PROGRESS"] = "IN_PROGRESS";
    ContentPlanStatus["COMPLETED"] = "COMPLETED";
})(ContentPlanStatus || (exports.ContentPlanStatus = ContentPlanStatus = {}));
let ContentPlan = class ContentPlan {
};
exports.ContentPlan = ContentPlan;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ContentPlan.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], ContentPlan.prototype, "month", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], ContentPlan.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ContentPlanStatus,
        default: ContentPlanStatus.DRAFT,
    }),
    __metadata("design:type", String)
], ContentPlan.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], ContentPlan.prototype, "totalPosts", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], ContentPlan.prototype, "completedPosts", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], ContentPlan.prototype, "totalStories", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], ContentPlan.prototype, "completedStories", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], ContentPlan.prototype, "progress", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ContentPlan.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ContentPlan.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_1.Project, project => project.contentPlans),
    __metadata("design:type", project_entity_1.Project)
], ContentPlan.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ContentPlan.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => content_plan_item_entity_1.ContentPlanItem, item => item.contentPlan),
    __metadata("design:type", Array)
], ContentPlan.prototype, "items", void 0);
exports.ContentPlan = ContentPlan = __decorate([
    (0, typeorm_1.Entity)({ name: 'content_plans' })
], ContentPlan);
//# sourceMappingURL=content-plan.entity.js.map