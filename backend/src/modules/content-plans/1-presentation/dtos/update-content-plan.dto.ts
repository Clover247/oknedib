import { PartialType } from '@nestjs/mapped-types';
import { CreateContentPlanDto, CreateContentItemDto } from './create-content-plan.dto';
import { IsUUID, IsOptional, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateContentItemDto extends PartialType(CreateContentItemDto) {
  @IsUUID()
  @IsOptional()
  id?: string;
}

export class UpdateContentPlanDto extends PartialType(CreateContentPlanDto) {}
