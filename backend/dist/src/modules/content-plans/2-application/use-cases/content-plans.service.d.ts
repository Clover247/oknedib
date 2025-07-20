import { ContentPlan } from '@/modules/content-plans/3-domain/entities/content-plan.entity';
import { ContentPlanItem } from '@/modules/content-plans/3-domain/entities/content-plan-item.entity';
import { ContentPlanFile } from '@/modules/content-plans/3-domain/entities/content-plan-file.entity';
import { Project } from '@/modules/projects/3-domain/entities/project.entity';
import { User } from '@/modules/users/3-domain/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateContentPlanDto } from '@/modules/content-plans/1-presentation/dtos/create-content-plan.dto';
import { UpdateContentPlanDto } from '@/modules/content-plans/1-presentation/dtos/update-content-plan.dto';
import { CloudinaryService } from '@/shared/services/cloudinary.service';
export declare class ContentPlansService {
    private contentPlansRepository;
    private contentPlanItemsRepository;
    private contentPlanFilesRepository;
    private projectsRepository;
    private usersRepository;
    private cloudinaryService;
    constructor(contentPlansRepository: Repository<ContentPlan>, contentPlanItemsRepository: Repository<ContentPlanItem>, contentPlanFilesRepository: Repository<ContentPlanFile>, projectsRepository: Repository<Project>, usersRepository: Repository<User>, cloudinaryService: CloudinaryService);
    create(createContentPlanDto: CreateContentPlanDto): Promise<ContentPlan>;
    findAll(): Promise<ContentPlan[]>;
    findOne(id: string): Promise<ContentPlan>;
    update(id: string, updateContentPlanDto: UpdateContentPlanDto): Promise<ContentPlan>;
    remove(id: string): Promise<void>;
    addFileToContentItem(itemId: string, file: Express.Multer.File): Promise<ContentPlanFile>;
    private calculateProgress;
}
