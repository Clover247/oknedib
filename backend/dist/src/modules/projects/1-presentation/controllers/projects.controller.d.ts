import { ProjectsService } from '@/modules/projects/2-application/use-cases/projects.service';
import { CreateProjectDto } from '@/modules/projects/1-presentation/dtos/create-project.dto';
import { UpdateProjectDto } from '@/modules/projects/1-presentation/dtos/update-project.dto';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    create(createProjectDto: CreateProjectDto): Promise<import("../../3-domain/entities/project.entity").Project>;
    findAll(): Promise<import("../../3-domain/entities/project.entity").Project[]>;
    findOne(id: string): Promise<import("../../3-domain/entities/project.entity").Project>;
    update(id: string, updateProjectDto: UpdateProjectDto): Promise<import("../../3-domain/entities/project.entity").Project>;
    remove(id: string): Promise<void>;
}
