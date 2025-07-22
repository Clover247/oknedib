import { Project } from '@/modules/projects/3-domain/entities/project.entity';
import { User } from '@/modules/users/3-domain/entities/user.entity';
import { Comment } from '@/modules/project-details/3-domain/entities/comment.entity';
export declare enum TaskStatus {
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    IN_REVIEW = "IN_REVIEW",
    DONE = "DONE",
    ABANDONED = "ABANDONED"
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
