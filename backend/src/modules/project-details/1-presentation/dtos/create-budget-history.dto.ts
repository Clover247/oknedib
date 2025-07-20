import { IsString, IsNotEmpty, IsEnum, IsNumber, IsUUID } from 'class-validator';
import { BudgetType, BudgetAction } from '@/modules/project-details/3-domain/entities/budget-history.entity';

export class CreateBudgetHistoryDto {
  @IsUUID()
  projectId: string;

  @IsNumber()
  amount: number;

  @IsEnum(BudgetType)
  type: BudgetType;

  @IsEnum(BudgetAction)
  action: BudgetAction;

  @IsString()
  @IsNotEmpty()
  description: string;
}
