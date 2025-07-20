import { ContentPlan } from './content-plan.entity';
import { User } from '@/modules/users/3-domain/entities/user.entity';
import { ContentPlanFile } from './content-plan-file.entity';
export declare enum ContentItemType {
    POST = "POST",
    STORY = "STORY",
    REEL = "REEL"
}
export declare enum ContentItemStatus {
    PLANNED = "PLANNED",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED"
}
export declare class ContentPlanItem {
    id: string;
    date: Date;
    type: ContentItemType;
    status: ContentItemStatus;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    contentPlan: ContentPlan;
    contentPlanId: string;
    assignee: User;
    assigneeId: string;
    attachments: ContentPlanFile[];
}
