import { ContentPlansService } from '@/modules/content-plans/2-application/use-cases/content-plans.service';
import { CreateContentPlanDto } from '@/modules/content-plans/1-presentation/dtos/create-content-plan.dto';
import { UpdateContentPlanDto } from '@/modules/content-plans/1-presentation/dtos/update-content-plan.dto';
export declare class ContentPlansController {
    private readonly contentPlansService;
    constructor(contentPlansService: ContentPlansService);
    create(createContentPlanDto: CreateContentPlanDto): Promise<import("../../3-domain/entities/content-plan.entity").ContentPlan>;
    findAll(): Promise<import("../../3-domain/entities/content-plan.entity").ContentPlan[]>;
    findOne(id: string): Promise<import("../../3-domain/entities/content-plan.entity").ContentPlan>;
    update(id: string, updateContentPlanDto: UpdateContentPlanDto): Promise<import("../../3-domain/entities/content-plan.entity").ContentPlan>;
    remove(id: string): Promise<void>;
    uploadFile(itemId: string, file: Express.Multer.File): Promise<import("../../3-domain/entities/content-plan-file.entity").ContentPlanFile>;
}
