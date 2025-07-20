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
exports.ContentPlanFile = void 0;
const typeorm_1 = require("typeorm");
const content_plan_item_entity_1 = require("./content-plan-item.entity");
let ContentPlanFile = class ContentPlanFile {
};
exports.ContentPlanFile = ContentPlanFile;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ContentPlanFile.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ContentPlanFile.prototype, "originalName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ContentPlanFile.prototype, "mimeType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ContentPlanFile.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ContentPlanFile.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => content_plan_item_entity_1.ContentPlanItem, item => item.attachments, { onDelete: 'CASCADE' }),
    __metadata("design:type", content_plan_item_entity_1.ContentPlanItem)
], ContentPlanFile.prototype, "contentPlanItem", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ContentPlanFile.prototype, "contentPlanItemId", void 0);
exports.ContentPlanFile = ContentPlanFile = __decorate([
    (0, typeorm_1.Entity)({ name: 'content_plan_files' })
], ContentPlanFile);
//# sourceMappingURL=content-plan-file.entity.js.map