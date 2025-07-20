import { IsString, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsUUID()
  projectId: string;

  @IsUUID()
  authorId: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsUUID()
  @IsOptional()
  parentId?: string;

  @IsUUID()
  @IsOptional()
  taskId?: string;

  @IsUUID()
  @IsOptional()
  contentPlanItemId?: string;
}
