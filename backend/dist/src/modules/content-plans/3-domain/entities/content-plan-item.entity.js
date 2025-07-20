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
exports.ContentPlanItem = exports.ContentItemStatus = exports.ContentItemType = void 0;
const typeorm_1 = require("typeorm");
const content_plan_entity_1 = require("./content-plan.entity");
const user_entity_1 = require("../../../users/3-domain/entities/user.entity");
const content_plan_file_entity_1 = require("./content-plan-file.entity");
var ContentItemType;
(function (ContentItemType) {
    ContentItemType["POST"] = "POST";
    ContentItemType["STORY"] = "STORY";
    ContentItemType["REEL"] = "REEL";
})(ContentItemType || (exports.ContentItemType = ContentItemType = {}));
var ContentItemStatus;
(function (ContentItemStatus) {
    ContentItemStatus["PLANNED"] = "PLANNED";
    ContentItemStatus["IN_PROGRESS"] = "IN_PROGRESS";
    ContentItemStatus["COMPLETED"] = "COMPLETED";
})(ContentItemStatus || (exports.ContentItemStatus = ContentItemStatus = {}));
let ContentPlanItem = class ContentPlanItem {
};
exports.ContentPlanItem = ContentPlanItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ContentPlanItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], ContentPlanItem.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ContentItemType,
    }),
    __metadata("design:type", String)
], ContentPlanItem.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ContentItemStatus,
        default: ContentItemStatus.PLANNED,
    }),
    __metadata("design:type", String)
], ContentPlanItem.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], ContentPlanItem.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ContentPlanItem.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ContentPlanItem.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => content_plan_entity_1.ContentPlan, contentPlan => contentPlan.items),
    __metadata("design:type", content_plan_entity_1.ContentPlan)
], ContentPlanItem.prototype, "contentPlan", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ContentPlanItem.prototype, "contentPlanId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.assignedContentItems),
    __metadata("design:type", user_entity_1.User)
], ContentPlanItem.prototype, "assignee", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ContentPlanItem.prototype, "assigneeId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => content_plan_file_entity_1.ContentPlanFile, file => file.contentPlanItem),
    __metadata("design:type", Array)
], ContentPlanItem.prototype, "attachments", void 0);
exports.ContentPlanItem = ContentPlanItem = __decorate([
    (0, typeorm_1.Entity)({ name: 'content_plan_items' })
], ContentPlanItem);
//# sourceMappingURL=content-plan-item.entity.js.map