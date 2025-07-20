import { ShootingHours } from '@/modules/project-details/3-domain/entities/shooting-hours.entity';
import { Project } from '@/modules/projects/3-domain/entities/project.entity';
import { Repository } from 'typeorm';
import { CreateShootingHoursDto } from '@/modules/project-details/1-presentation/dtos/create-shooting-hours.dto';
import { UpdateShootingHoursDto } from '@/modules/project-details/1-presentation/dtos/update-shooting-hours.dto';
export declare class ShootingHoursService {
    private shootingHoursRepository;
    private projectsRepository;
    constructor(shootingHoursRepository: Repository<ShootingHours>, projectsRepository: Repository<Project>);
    create(createShootingHoursDto: CreateShootingHoursDto): Promise<ShootingHours>;
    findAll(projectId: string): Promise<ShootingHours[]>;
    findOne(id: string): Promise<ShootingHours>;
    update(id: string, updateShootingHoursDto: UpdateShootingHoursDto): Promise<ShootingHours>;
    remove(id: string): Promise<void>;
}
