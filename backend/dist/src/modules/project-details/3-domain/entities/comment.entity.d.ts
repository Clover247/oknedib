import { Project } from '@/modules/projects/3-domain/entities/project.entity';
import { User } from '@/modules/users/3-domain/entities/user.entity';
import { Task } from '@/modules/tasks/3-domain/entities/task.entity';
export declare class Comment {
    id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    project: Project;
    projectId: string;
    author: User;
    authorId: string;
    parentId: string;
    task: Task;
    taskId: string;
}
