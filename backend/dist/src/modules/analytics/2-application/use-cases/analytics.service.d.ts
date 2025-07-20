import { Repository } from 'typeorm';
import { Project } from '@/modules/projects/3-domain/entities/project.entity';
import { User, UserRole } from '@/modules/users/3-domain/entities/user.entity';
import { Payment } from '@/modules/payments/3-domain/entities/payment.entity';
import { ContentPlan } from '@/modules/content-plans/3-domain/entities/content-plan.entity';
export declare class AnalyticsService {
    private projectsRepository;
    private paymentsRepository;
    private contentPlansRepository;
    private usersRepository;
    constructor(projectsRepository: Repository<Project>, paymentsRepository: Repository<Payment>, contentPlansRepository: Repository<ContentPlan>, usersRepository: Repository<User>);
    getProjectAnalytics(): Promise<{
        totalProjects: number;
        activeProjects: number;
        completedProjects: number;
        pausedProjects: number;
        projectsByStatus: any[];
    }>;
    getFinancialAnalytics(startDate?: Date, endDate?: Date): Promise<{
        totalIncome: number;
        pendingPayments: number;
        overduePayments: number;
        paymentsByStatus: any[];
    }>;
    getContentAnalytics(): Promise<{
        totalContentPlans: number;
        completedContentPlans: number;
        contentPlanProgress: any[];
    }>;
    getSpecialistAnalytics(): Promise<{
        totalSpecialists: number;
        specialistDetails: {
            id: string;
            firstName: string;
            lastName: string;
            role: UserRole;
            projectCount: number;
        }[];
    }>;
}
