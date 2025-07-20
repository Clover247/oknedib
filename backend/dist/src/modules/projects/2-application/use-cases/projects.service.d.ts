import { Project } from '@/modules/projects/3-domain/entities/project.entity';
import { User } from '@/modules/users/3-domain/entities/user.entity';
import { ShootingHours } from '@/modules/project-details/3-domain/entities/shooting-hours.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from '@/modules/projects/1-presentation/dtos/create-project.dto';
import { UpdateProjectDto } from '@/modules/projects/1-presentation/dtos/update-project.dto';
export declare class ProjectsService {
    private projectsRepository;
    private usersRepository;
    private shootingHoursRepository;
    constructor(projectsRepository: Repository<Project>, usersRepository: Repository<User>, shootingHoursRepository: Repository<ShootingHours>);
    create(createProjectDto: CreateProjectDto): Promise<Project>;
    findAll(): Promise<Project[]>;
    findOne(id: string): Promise<Project>;
    update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project>;
    remove(id: string): Promise<void>;
}
