import { PartialType } from '@nestjs/mapped-types';
import { CreateBudgetHistoryDto } from './create-budget-history.dto';

export class UpdateBudgetHistoryDto extends PartialType(CreateBudgetHistoryDto) {}
