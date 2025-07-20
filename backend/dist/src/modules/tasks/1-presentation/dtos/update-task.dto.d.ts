import { TaskStatus } from '../../3-domain/entities/task.entity';
export declare class UpdateTaskDto {
    title?: string;
    description?: string;
    status?: TaskStatus;
    dueDate?: string;
    assigneeId?: string;
}
