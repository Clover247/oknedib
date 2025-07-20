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
exports.BudgetHistoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const budget_history_entity_1 = require("../../3-domain/entities/budget-history.entity");
const project_entity_1 = require("../../../projects/3-domain/entities/project.entity");
const typeorm_2 = require("typeorm");
let BudgetHistoryService = class BudgetHistoryService {
    constructor(budgetHistoryRepository, projectsRepository, entityManager) {
        this.budgetHistoryRepository = budgetHistoryRepository;
        this.projectsRepository = projectsRepository;
        this.entityManager = entityManager;
    }
    async create(createBudgetHistoryDto) {
        const project = await this.projectsRepository.findOneBy({ id: createBudgetHistoryDto.projectId });
        if (!project) {
            throw new common_1.NotFoundException(`Project with ID ${createBudgetHistoryDto.projectId} not found`);
        }
        const budgetHistory = this.budgetHistoryRepository.create({
            ...createBudgetHistoryDto,
            project,
        });
        return this.budgetHistoryRepository.save(budgetHistory);
    }
    async findAll(projectId) {
        return this.budgetHistoryRepository.find({ where: { projectId }, order: { createdAt: 'ASC' } });
    }
    async findOne(id) {
        const history = await this.budgetHistoryRepository.findOneBy({ id });
        if (!history) {
            throw new common_1.NotFoundException(`Budget History with ID ${id} not found`);
        }
        return history;
    }
    async update(id, updateBudgetHistoryDto) {
        const history = await this.budgetHistoryRepository.preload({
            id: id,
            ...updateBudgetHistoryDto,
        });
        if (!history) {
            throw new common_1.NotFoundException(`Budget History with ID ${id} not found`);
        }
        return this.budgetHistoryRepository.save(history);
    }
    async remove(id) {
        const result = await this.budgetHistoryRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Budget History with ID ${id} not found`);
        }
    }
};
exports.BudgetHistoryService = BudgetHistoryService;
exports.BudgetHistoryService = BudgetHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(budget_history_entity_1.BudgetHistory)),
    __param(1, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.EntityManager])
], BudgetHistoryService);
//# sourceMappingURL=budget-history.service.js.map