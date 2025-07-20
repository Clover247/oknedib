
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsUUID } from 'class-validator';
import { TaskStatus } from '../../3-domain/entities/task.entity';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

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
  @IsNotEmpty()
  projectId: string;

  @IsUUID()
  @IsOptional()
  assigneeId?: string;
}
