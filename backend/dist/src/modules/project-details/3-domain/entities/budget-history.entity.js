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
exports.BudgetHistory = exports.BudgetAction = exports.BudgetType = void 0;
const typeorm_1 = require("typeorm");
const project_entity_1 = require("../../../projects/3-domain/entities/project.entity");
var BudgetType;
(function (BudgetType) {
    BudgetType["TOTAL"] = "TOTAL";
    BudgetType["TARGETING"] = "TARGETING";
})(BudgetType || (exports.BudgetType = BudgetType = {}));
var BudgetAction;
(function (BudgetAction) {
    BudgetAction["INCREASE"] = "INCREASE";
    BudgetAction["DECREASE"] = "DECREASE";
})(BudgetAction || (exports.BudgetAction = BudgetAction = {}));
let BudgetHistory = class BudgetHistory {
};
exports.BudgetHistory = BudgetHistory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BudgetHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], BudgetHistory.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: BudgetType,
    }),
    __metadata("design:type", String)
], BudgetHistory.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: BudgetAction,
    }),
    __metadata("design:type", String)
], BudgetHistory.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], BudgetHistory.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], BudgetHistory.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_1.Project, project => project.budgetHistory),
    __metadata("design:type", project_entity_1.Project)
], BudgetHistory.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BudgetHistory.prototype, "projectId", void 0);
exports.BudgetHistory = BudgetHistory = __decorate([
    (0, typeorm_1.Entity)({ name: 'budget_history' })
], BudgetHistory);
//# sourceMappingURL=budget-history.entity.js.map