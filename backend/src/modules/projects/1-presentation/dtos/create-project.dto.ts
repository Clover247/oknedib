import { IsString, IsNotEmpty, IsEnum, IsDateString, IsNumber, IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { ProjectStatus } from '@/modules/projects/3-domain/entities/project.entity';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(ProjectStatus)
  status: ProjectStatus;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  @IsOptional()
  endDate?: Date;

  @IsNumber()
  budget: number;

  @IsNumber()
  targetingBudget: number;

  @IsNumber()
  postsCount: number;

  @IsNumber()
  storiesCount: number;

  @IsBoolean()
  hasTargeting: boolean;

  @IsNumber()
  shootingHours: number;

  @IsUUID()
  managerId: string;

  @IsUUID('all', { each: true })
  @IsOptional()
  specialistIds?: string[];

  @IsUUID('all', { each: true })
  @IsOptional()
  contentMakerIds?: string[];
}
