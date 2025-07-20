import { BudgetType, BudgetAction } from '@/modules/project-details/3-domain/entities/budget-history.entity';
export declare class CreateBudgetHistoryDto {
    projectId: string;
    amount: number;
    type: BudgetType;
    action: BudgetAction;
    description: string;
}
