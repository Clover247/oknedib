import { IsString, IsNotEmpty, IsEnum, IsInt, Min, Max, IsArray, ValidateNested, IsOptional, IsDateString, IsUUID, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ContentPlanStatus } from '@/modules/content-plans/3-domain/entities/content-plan.entity';
import { ContentItemType, ContentItemStatus } from '@/modules/content-plans/3-domain/entities/content-plan-item.entity';

export class CreateContentItemDto {
  @IsString()
  @IsNotEmpty()
  date: string; // YYYY-MM-DD

  @IsEnum(ContentItemType)
  type: ContentItemType;

  @IsEnum(ContentItemStatus)
  @IsOptional()
  status?: ContentItemStatus;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUUID()
  assigneeId: string;
}

export class CreateContentPlanDto {
  @IsUUID()
  projectId: string;

  @IsNumber()
  month: number;

  @IsNumber()
  year: number;

  @IsEnum(ContentPlanStatus)
  @IsOptional()
  status?: ContentPlanStatus;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateContentItemDto)
  items: CreateContentItemDto[];
}
