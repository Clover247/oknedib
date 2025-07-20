import { TaskStatus } from '../../3-domain/entities/task.entity';
export declare class CreateTaskDto {
    title: string;
    description?: string;
    status?: TaskStatus;
    dueDate?: string;
    projectId: string;
    assigneeId?: string;
}
