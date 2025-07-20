import { AnalyticsService } from '@/modules/analytics/2-application/use-cases/analytics.service';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    getProjectAnalytics(): Promise<{
        totalProjects: number;
        activeProjects: number;
        completedProjects: number;
        pausedProjects: number;
        projectsByStatus: any[];
    }>;
    getFinancialAnalytics(startDate?: string, endDate?: string): Promise<{
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
            role: import("../../../users/3-domain/entities/user.entity").UserRole;
            projectCount: number;
        }[];
    }>;
}
