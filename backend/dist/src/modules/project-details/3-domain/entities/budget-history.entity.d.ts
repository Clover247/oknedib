import { Project } from '@/modules/projects/3-domain/entities/project.entity';
export declare enum BudgetType {
    TOTAL = "TOTAL",
    TARGETING = "TARGETING"
}
export declare enum BudgetAction {
    INCREASE = "INCREASE",
    DECREASE = "DECREASE"
}
export declare class BudgetHistory {
    id: string;
    amount: number;
    type: BudgetType;
    action: BudgetAction;
    description: string;
    createdAt: Date;
    project: Project;
    projectId: string;
}
