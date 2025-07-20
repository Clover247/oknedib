import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '@/modules/projects/3-domain/entities/project.entity';
import { User } from '@/modules/users/3-domain/entities/user.entity';
import { ShootingHours } from '@/modules/project-details/3-domain/entities/shooting-hours.entity';
import { Repository, In } from 'typeorm';
import { CreateProjectDto } from '@/modules/projects/1-presentation/dtos/create-project.dto';
import { UpdateProjectDto } from '@/modules/projects/1-presentation/dtos/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(ShootingHours)
    private shootingHoursRepository: Repository<ShootingHours>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const { managerId, specialistIds, contentMakerIds, shootingHours, ...projectData } = createProjectDto;

    const project = this.projectsRepository.create(projectData);

    if (managerId) {
      const manager = await this.usersRepository.findOneBy({ id: managerId });
      if (!manager) {
        throw new NotFoundException(`Manager with ID ${managerId} not found`);
      }
      project.manager = manager;
    }

    if (specialistIds && specialistIds.length > 0) {
      project.specialists = await this.usersRepository.findBy({ id: In(specialistIds) });
    }

    if (contentMakerIds && contentMakerIds.length > 0) {
      project.contentMakers = await this.usersRepository.findBy({ id: In(contentMakerIds) });
    }

    const savedProject = await this.projectsRepository.save(project);

    if (shootingHours) {
      const shootingHoursEntity = this.shootingHoursRepository.create({
        plannedHours: shootingHours,
        project: savedProject,
      });
      await this.shootingHoursRepository.save(shootingHoursEntity);
    }

    return savedProject;
  }

  async findAll(): Promise<Project[]> {
    return this.projectsRepository.find({
      relations: ['manager', 'specialists', 'contentMakers'],
    });
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectsRepository.findOne({
      where: { id },
      relations: ['manager', 'specialists', 'contentMakers'],
    });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const project = await this.projectsRepository.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    if (updateProjectDto.managerId) {
      const manager = await this.usersRepository.findOneBy({ id: updateProjectDto.managerId });
      if (!manager) {
        throw new NotFoundException(`Manager with ID ${updateProjectDto.managerId} not found`);
      }
      project.manager = manager;
    }

    if (updateProjectDto.specialistIds) {
      project.specialists = await this.usersRepository.findBy({ id: In(updateProjectDto.specialistIds) });
    }

    if (updateProjectDto.contentMakerIds) {
      project.contentMakers = await this.usersRepository.findBy({ id: In(updateProjectDto.contentMakerIds) });
    }

    Object.assign(project, updateProjectDto);
    return this.projectsRepository.save(project);
  }

  async remove(id: string): Promise<void> {
    // Implement soft delete here if needed, for now, hard delete
    const result = await this.projectsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
  }
}
