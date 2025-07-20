import { ContentPlanStatus } from '@/modules/content-plans/3-domain/entities/content-plan.entity';
import { ContentItemType, ContentItemStatus } from '@/modules/content-plans/3-domain/entities/content-plan-item.entity';
export declare class CreateContentItemDto {
    date: string;
    type: ContentItemType;
    status?: ContentItemStatus;
    description: string;
    assigneeId: string;
}
export declare class CreateContentPlanDto {
    projectId: string;
    month: number;
    year: number;
    status?: ContentPlanStatus;
    items: CreateContentItemDto[];
}
