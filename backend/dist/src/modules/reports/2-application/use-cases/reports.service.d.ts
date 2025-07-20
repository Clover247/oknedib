import { AnalyticsService } from '@/modules/analytics/2-application/use-cases/analytics.service';
export declare class ReportsService {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    generateProjectReport(): Promise<{
        totalProjects: number;
        activeProjects: number;
        completedProjects: number;
        pausedProjects: number;
        projectsByStatus: any[];
    }>;
    generateFinancialReport(startDate?: Date, endDate?: Date): Promise<{
        totalIncome: number;
        pendingPayments: number;
        overduePayments: number;
        paymentsByStatus: any[];
    }>;
    generatePerformanceReport(): Promise<{
        totalSpecialists: number;
        specialistDetails: {
            id: string;
            firstName: string;
            lastName: string;
            role: import("../../../users/3-domain/entities/user.entity").UserRole;
            projectCount: number;
        }[];
    }>;
    exportToExcel(data: any, reportName: string): Promise<string>;
    exportToPDF(data: any, reportName: string): Promise<string>;
    exportToCSV(data: any, reportName: string): Promise<string>;
}
