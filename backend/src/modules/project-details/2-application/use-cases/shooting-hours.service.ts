import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShootingHours } from '@/modules/project-details/3-domain/entities/shooting-hours.entity';
import { Project } from '@/modules/projects/3-domain/entities/project.entity';
import { Repository } from 'typeorm';
import { CreateShootingHoursDto } from '@/modules/project-details/1-presentation/dtos/create-shooting-hours.dto';
import { UpdateShootingHoursDto } from '@/modules/project-details/1-presentation/dtos/update-shooting-hours.dto';

@Injectable()
export class ShootingHoursService {
  constructor(
    @InjectRepository(ShootingHours)
    private shootingHoursRepository: Repository<ShootingHours>,
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async create(createShootingHoursDto: CreateShootingHoursDto): Promise<ShootingHours> {
    const project = await this.projectsRepository.findOneBy({ id: createShootingHoursDto.projectId });
    if (!project) {
      throw new NotFoundException(`Project with ID ${createShootingHoursDto.projectId} not found`);
    }

    const shootingHours = this.shootingHoursRepository.create({
      ...createShootingHoursDto,
      project,
    });
    return this.shootingHoursRepository.save(shootingHours);
  }

  async findAll(projectId: string): Promise<ShootingHours[]> {
    return this.shootingHoursRepository.find({ where: { projectId }, order: { date: 'ASC' } });
  }

  async findOne(id: string): Promise<ShootingHours> {
    const hours = await this.shootingHoursRepository.findOneBy({ id });
    if (!hours) {
      throw new NotFoundException(`Shooting Hours with ID ${id} not found`);
    }
    return hours;
  }

  async update(id: string, updateShootingHoursDto: UpdateShootingHoursDto): Promise<ShootingHours> {
    const hours = await this.shootingHoursRepository.preload({
      id: id,
      ...updateShootingHoursDto,
    });
    if (!hours) {
      throw new NotFoundException(`Shooting Hours with ID ${id} not found`);
    }
    return this.shootingHoursRepository.save(hours);
  }

  async remove(id: string): Promise<void> {
    const result = await this.shootingHoursRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Shooting Hours with ID ${id} not found`);
    }
  }
}
