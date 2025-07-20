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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentPlansController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const content_plans_service_1 = require("../../2-application/use-cases/content-plans.service");
const create_content_plan_dto_1 = require("../dtos/create-content-plan.dto");
const update_content_plan_dto_1 = require("../dtos/update-content-plan.dto");
const jwt_auth_guard_1 = require("../../../auth/1-presentation/guards/jwt-auth.guard");
let ContentPlansController = class ContentPlansController {
    constructor(contentPlansService) {
        this.contentPlansService = contentPlansService;
    }
    create(createContentPlanDto) {
        return this.contentPlansService.create(createContentPlanDto);
    }
    findAll() {
        return this.contentPlansService.findAll();
    }
    findOne(id) {
        return this.contentPlansService.findOne(id);
    }
    update(id, updateContentPlanDto) {
        return this.contentPlansService.update(id, updateContentPlanDto);
    }
    remove(id) {
        return this.contentPlansService.remove(id);
    }
    uploadFile(itemId, file) {
        return this.contentPlansService.addFileToContentItem(itemId, file);
    }
};
exports.ContentPlansController = ContentPlansController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_content_plan_dto_1.CreateContentPlanDto]),
    __metadata("design:returntype", void 0)
], ContentPlansController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContentPlansController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContentPlansController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_content_plan_dto_1.UpdateContentPlanDto]),
    __metadata("design:returntype", void 0)
], ContentPlansController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContentPlansController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':itemId/files'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('itemId')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ContentPlansController.prototype, "uploadFile", null);
exports.ContentPlansController = ContentPlansController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('content-plans'),
    __metadata("design:paramtypes", [content_plans_service_1.ContentPlansService])
], ContentPlansController);
//# sourceMappingURL=content-plans.controller.js.map