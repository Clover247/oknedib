import { Project } from '@/modules/projects/3-domain/entities/project.entity';
import { ContentPlanItem } from './content-plan-item.entity';
export declare enum ContentPlanStatus {
    DRAFT = "DRAFT",
    APPROVED = "APPROVED",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED"
}
export declare class ContentPlan {
    id: string;
    month: number;
    year: number;
    status: ContentPlanStatus;
    totalPosts: number;
    completedPosts: number;
    totalStories: number;
    completedStories: number;
    progress: number;
    createdAt: Date;
    updatedAt: Date;
    project: Project;
    projectId: string;
    items: ContentPlanItem[];
}
