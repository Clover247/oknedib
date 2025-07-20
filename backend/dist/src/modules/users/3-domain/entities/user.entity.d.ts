import { Project } from '@/modules/projects/3-domain/entities/project.entity';
import { ContentPlanItem } from '@/modules/content-plans/3-domain/entities/content-plan-item.entity';
import { Comment } from '@/modules/project-details/3-domain/entities/comment.entity';
import { Task } from '@/modules/tasks/3-domain/entities/task.entity';
import { GoogleApiCredentials } from '@/modules/google-calendar/3-domain/entities/google-api-credentials.entity';
export declare enum UserRole {
    ADMIN = "ADMIN",
    MANAGER = "MANAGER",
    SPECIALIST = "SPECIALIST",
    CONTENT_MAKER = "CONTENT_MAKER"
}
export declare class User {
    id: string;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
    managedProjects: Project[];
    assignedProjects: Project[];
    contentMakerProjects: Project[];
    assignedContentItems: ContentPlanItem[];
    comments: Comment[];
    tasks: Task[];
    googleApiCredentials: GoogleApiCredentials;
}
