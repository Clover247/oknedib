
import { IsString, IsOptional, IsEnum, IsUUID } from 'class-validator';
import { TaskStatus } from '../../3-domain/entities/task.entity';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsString()
  @IsOptional()
  dueDate?: string;

  @IsUUID()
  @IsOptional()
  assigneeId?: string;
}
