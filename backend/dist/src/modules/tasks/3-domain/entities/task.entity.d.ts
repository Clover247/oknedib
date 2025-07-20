import { Project } from '@/modules/projects/3-domain/entities/project.entity';
import { User } from '@/modules/users/3-domain/entities/user.entity';
import { Comment } from '@/modules/project-details/3-domain/entities/comment.entity';
export declare enum TaskStatus {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED"
}
export declare class Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    dueDate: Date;
    createdAt: Date;
    updatedAt: Date;
    project: Project;
    projectId: string;
    assignee: User;
    assigneeId: string;
    comments: Comment[];
}
