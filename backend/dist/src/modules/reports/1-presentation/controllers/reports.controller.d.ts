import { ReportsService } from '@/modules/reports/2-application/use-cases/reports.service';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    getProjectReport(): Promise<{
        totalProjects: number;
        activeProjects: number;
        completedProjects: number;
        pausedProjects: number;
        projectsByStatus: any[];
    }>;
    getFinancialReport(startDate?: string, endDate?: string): Promise<{
        totalIncome: number;
        pendingPayments: number;
        overduePayments: number;
        paymentsByStatus: any[];
    }>;
    getPerformanceReport(): Promise<{
        totalSpecialists: number;
        specialistDetails: {
            id: string;
            firstName: string;
            lastName: string;
            role: import("../../../users/3-domain/entities/user.entity").UserRole;
            projectCount: number;
        }[];
    }>;
    exportToExcel(data: any, name: string): Promise<string>;
    exportToPDF(data: any, name: string): Promise<string>;
    exportToCSV(data: any, name: string): Promise<string>;
}
