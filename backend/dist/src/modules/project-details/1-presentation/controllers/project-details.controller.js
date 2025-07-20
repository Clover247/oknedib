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
exports.ProjectDetailsController = void 0;
const common_1 = require("@nestjs/common");
const budget_history_service_1 = require("../../2-application/use-cases/budget-history.service");
const shooting_hours_service_1 = require("../../2-application/use-cases/shooting-hours.service");
const comments_service_1 = require("../../2-application/use-cases/comments.service");
const create_budget_history_dto_1 = require("../dtos/create-budget-history.dto");
const update_budget_history_dto_1 = require("../dtos/update-budget-history.dto");
const create_shooting_hours_dto_1 = require("../dtos/create-shooting-hours.dto");
const update_shooting_hours_dto_1 = require("../dtos/update-shooting-hours.dto");
const create_comment_dto_1 = require("../dtos/create-comment.dto");
const update_comment_dto_1 = require("../dtos/update-comment.dto");
const jwt_auth_guard_1 = require("../../../auth/1-presentation/guards/jwt-auth.guard");
let ProjectDetailsController = class ProjectDetailsController {
    constructor(budgetHistoryService, shootingHoursService, commentsService) {
        this.budgetHistoryService = budgetHistoryService;
        this.shootingHoursService = shootingHoursService;
        this.commentsService = commentsService;
    }
    createBudgetHistory(projectId, createBudgetHistoryDto) {
        return this.budgetHistoryService.create({ ...createBudgetHistoryDto, projectId });
    }
    findAllBudgetHistory(projectId) {
        return this.budgetHistoryService.findAll(projectId);
    }
    findOneBudgetHistory(id) {
        return this.budgetHistoryService.findOne(id);
    }
    updateBudgetHistory(id, updateBudgetHistoryDto) {
        return this.budgetHistoryService.update(id, updateBudgetHistoryDto);
    }
    removeBudgetHistory(id) {
        return this.budgetHistoryService.remove(id);
    }
    createShootingHours(projectId, createShootingHoursDto) {
        return this.shootingHoursService.create({ ...createShootingHoursDto, projectId });
    }
    findAllShootingHours(projectId) {
        return this.shootingHoursService.findAll(projectId);
    }
    findOneShootingHours(id) {
        return this.shootingHoursService.findOne(id);
    }
    updateShootingHours(id, updateShootingHoursDto) {
        return this.shootingHoursService.update(id, updateShootingHoursDto);
    }
    removeShootingHours(id) {
        return this.shootingHoursService.remove(id);
    }
    createComment(projectId, createCommentDto) {
        return this.commentsService.create({ ...createCommentDto, projectId });
    }
    findAllComments(projectId) {
        return this.commentsService.findAll(projectId);
    }
    findOneComment(id) {
        return this.commentsService.findOne(id);
    }
    updateComment(id, updateCommentDto) {
        return this.commentsService.update(id, updateCommentDto);
    }
    removeComment(id) {
        return this.commentsService.remove(id);
    }
};
exports.ProjectDetailsController = ProjectDetailsController;
__decorate([
    (0, common_1.Post)('budget-history'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_budget_history_dto_1.CreateBudgetHistoryDto]),
    __metadata("design:returntype", void 0)
], ProjectDetailsController.prototype, "createBudgetHistory", null);
__decorate([
    (0, common_1.Get)('budget-history'),
    __param(0, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectDetailsController.prototype, "findAllBudgetHistory", null);
__decorate([
    (0, common_1.Get)('budget-history/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectDetailsController.prototype, "findOneBudgetHistory", null);
__decorate([
    (0, common_1.Patch)('budget-history/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_budget_history_dto_1.UpdateBudgetHistoryDto]),
    __metadata("design:returntype", void 0)
], ProjectDetailsController.prototype, "updateBudgetHistory", null);
__decorate([
    (0, common_1.Delete)('budget-history/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectDetailsController.prototype, "removeBudgetHistory", null);
__decorate([
    (0, common_1.Post)('shooting-hours'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_shooting_hours_dto_1.CreateShootingHoursDto]),
    __metadata("design:returntype", void 0)
], ProjectDetailsController.prototype, "createShootingHours", null);
__decorate([
    (0, common_1.Get)('shooting-hours'),
    __param(0, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectDetailsController.prototype, "findAllShootingHours", null);
__decorate([
    (0, common_1.Get)('shooting-hours/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectDetailsController.prototype, "findOneShootingHours", null);
__decorate([
    (0, common_1.Patch)('shooting-hours/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_shooting_hours_dto_1.UpdateShootingHoursDto]),
    __metadata("design:returntype", void 0)
], ProjectDetailsController.prototype, "updateShootingHours", null);
__decorate([
    (0, common_1.Delete)('shooting-hours/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectDetailsController.prototype, "removeShootingHours", null);
__decorate([
    (0, common_1.Post)('comments'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_comment_dto_1.CreateCommentDto]),
    __metadata("design:returntype", void 0)
], ProjectDetailsController.prototype, "createComment", null);
__decorate([
    (0, common_1.Get)('comments'),
    __param(0, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectDetailsController.prototype, "findAllComments", null);
__decorate([
    (0, common_1.Get)('comments/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectDetailsController.prototype, "findOneComment", null);
__decorate([
    (0, common_1.Patch)('comments/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_comment_dto_1.UpdateCommentDto]),
    __metadata("design:returntype", void 0)
], ProjectDetailsController.prototype, "updateComment", null);
__decorate([
    (0, common_1.Delete)('comments/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectDetailsController.prototype, "removeComment", null);
exports.ProjectDetailsController = ProjectDetailsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('projects/:projectId'),
    __metadata("design:paramtypes", [budget_history_service_1.BudgetHistoryService,
        shooting_hours_service_1.ShootingHoursService,
        comments_service_1.CommentsService])
], ProjectDetailsController);
//# sourceMappingURL=project-details.controller.js.map