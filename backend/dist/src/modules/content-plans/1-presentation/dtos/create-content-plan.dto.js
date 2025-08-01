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
exports.CreateContentPlanDto = exports.CreateContentItemDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const content_plan_entity_1 = require("../../3-domain/entities/content-plan.entity");
const content_plan_item_entity_1 = require("../../3-domain/entities/content-plan-item.entity");
class CreateContentItemDto {
}
exports.CreateContentItemDto = CreateContentItemDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateContentItemDto.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(content_plan_item_entity_1.ContentItemType),
    __metadata("design:type", String)
], CreateContentItemDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(content_plan_item_entity_1.ContentItemStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateContentItemDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateContentItemDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateContentItemDto.prototype, "assigneeId", void 0);
class CreateContentPlanDto {
}
exports.CreateContentPlanDto = CreateContentPlanDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateContentPlanDto.prototype, "projectId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateContentPlanDto.prototype, "month", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateContentPlanDto.prototype, "year", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(content_plan_entity_1.ContentPlanStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateContentPlanDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateContentItemDto),
    __metadata("design:type", Array)
], CreateContentPlanDto.prototype, "items", void 0);
//# sourceMappingURL=create-content-plan.dto.js.map