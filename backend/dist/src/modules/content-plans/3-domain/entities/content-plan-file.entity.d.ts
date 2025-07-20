import { ContentPlanItem } from './content-plan-item.entity';
export declare class ContentPlanFile {
    id: string;
    originalName: string;
    mimeType: string;
    path: string;
    createdAt: Date;
    contentPlanItem: ContentPlanItem;
    contentPlanItemId: string;
}
