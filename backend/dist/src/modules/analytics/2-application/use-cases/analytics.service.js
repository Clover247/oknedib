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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const project_entity_1 = require("../../../projects/3-domain/entities/project.entity");
const user_entity_1 = require("../../../users/3-domain/entities/user.entity");
const payment_entity_1 = require("../../../payments/3-domain/entities/payment.entity");
const content_plan_entity_1 = require("../../../content-plans/3-domain/entities/content-plan.entity");
const typeorm_3 = require("typeorm");
let AnalyticsService = class AnalyticsService {
    constructor(projectsRepository, paymentsRepository, contentPlansRepository, usersRepository) {
        this.projectsRepository = projectsRepository;
        this.paymentsRepository = paymentsRepository;
        this.contentPlansRepository = contentPlansRepository;
        this.usersRepository = usersRepository;
    }
    async getProjectAnalytics() {
        const totalProjects = await this.projectsRepository.count();
        const activeProjects = await this.projectsRepository.count({ where: { status: project_entity_1.ProjectStatus.ACTIVE } });
        const completedProjects = await this.projectsRepository.count({ where: { status: project_entity_1.ProjectStatus.COMPLETED } });
        const pausedProjects = await this.projectsRepository.count({ where: { status: project_entity_1.ProjectStatus.PAUSED } });
        const projectsByStatus = await this.projectsRepository
            .createQueryBuilder('project')
            .select('project.status', 'status')
            .addSelect('COUNT(project.id)', 'count')
            .groupBy('project.status')
            .getRawMany();
        return {
            totalProjects,
            activeProjects,
            completedProjects,
            pausedProjects,
            projectsByStatus,
        };
    }
    async getFinancialAnalytics(startDate, endDate) {
        const query = {};
        if (startDate && endDate) {
            query.createdAt = (0, typeorm_3.Between)(startDate, endDate);
        }
        const totalIncome = await this.paymentsRepository.sum('amount', query);
        const pendingPayments = await this.paymentsRepository.count({ where: { status: payment_entity_1.PaymentStatus.PENDING } });
        const overduePayments = await this.paymentsRepository.count({ where: { status: payment_entity_1.PaymentStatus.OVERDUE } });
        const paymentsByStatus = await this.paymentsRepository
            .createQueryBuilder('payment')
            .select('payment.status', 'status')
            .addSelect('SUM(payment.amount)', 'totalAmount')
            .groupBy('payment.status')
            .getRawMany();
        return {
            totalIncome,
            pendingPayments,
            overduePayments,
            paymentsByStatus,
        };
    }
    async getContentAnalytics() {
        const totalContentPlans = await this.contentPlansRepository.count();
        const completedContentPlans = await this.contentPlansRepository.count({ where: { status: content_plan_entity_1.ContentPlanStatus.COMPLETED } });
        const contentPlanProgress = await this.contentPlansRepository
            .createQueryBuilder('contentPlan')
            .select('contentPlan.status', 'status')
            .addSelect('AVG(contentPlan.progress)', 'averageProgress')
            .groupBy('contentPlan.status')
            .getRawMany();
        return {
            totalContentPlans,
            completedContentPlans,
            contentPlanProgress,
        };
    }
    async getSpecialistAnalytics() {
        const totalSpecialists = await this.usersRepository.count({ where: { role: (0, typeorm_2.In)([user_entity_1.UserRole.SPECIALIST, user_entity_1.UserRole.CONTENT_MAKER]) } });
        const specialistsWithProjects = await this.usersRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.assignedProjects', 'assignedProjects')
            .leftJoinAndSelect('user.contentMakerProjects', 'contentMakerProjects')
            .where('user.role IN (:...roles)', { roles: [user_entity_1.UserRole.SPECIALIST, user_entity_1.UserRole.CONTENT_MAKER] })
            .getMany();
        const specialistDetails = specialistsWithProjects.map(s => ({
            id: s.id,
            firstName: s.firstName,
            lastName: s.lastName,
            role: s.role,
            projectCount: s.assignedProjects.length + s.contentMakerProjects.length,
        }));
        return {
            totalSpecialists,
            specialistDetails,
        };
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __param(1, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __param(2, (0, typeorm_1.InjectRepository)(content_plan_entity_1.ContentPlan)),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map