import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BudgetHistory, BudgetAction, BudgetType } from '@/modules/project-details/3-domain/entities/budget-history.entity';
import { Project } from '@/modules/projects/3-domain/entities/project.entity';
import { Repository, EntityManager } from 'typeorm';
import { CreateBudgetHistoryDto } from '@/modules/project-details/1-presentation/dtos/create-budget-history.dto';
import { UpdateBudgetHistoryDto } from '@/modules/project-details/1-presentation/dtos/update-budget-history.dto';

@Injectable()
export class BudgetHistoryService {
  constructor(
    @InjectRepository(BudgetHistory)
    private budgetHistoryRepository: Repository<BudgetHistory>,
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    private entityManager: EntityManager,
  ) {}

  async create(createBudgetHistoryDto: CreateBudgetHistoryDto): Promise<BudgetHistory> {
    const project = await this.projectsRepository.findOneBy({ id: createBudgetHistoryDto.projectId });
    if (!project) {
      throw new NotFoundException(`Project with ID ${createBudgetHistoryDto.projectId} not found`);
    }

    const budgetHistory = this.budgetHistoryRepository.create({
      ...createBudgetHistoryDto,
      project,
    });
    return this.budgetHistoryRepository.save(budgetHistory);
  }

  async findAll(projectId: string): Promise<BudgetHistory[]> {
    return this.budgetHistoryRepository.find({ where: { projectId }, order: { createdAt: 'ASC' } });
  }

  async findOne(id: string): Promise<BudgetHistory> {
    const history = await this.budgetHistoryRepository.findOneBy({ id });
    if (!history) {
      throw new NotFoundException(`Budget History with ID ${id} not found`);
    }
    return history;
  }

  async update(id: string, updateBudgetHistoryDto: UpdateBudgetHistoryDto): Promise<BudgetHistory> {
    const history = await this.budgetHistoryRepository.preload({
      id: id,
      ...updateBudgetHistoryDto,
    });
    if (!history) {
      throw new NotFoundException(`Budget History with ID ${id} not found`);
    }
    return this.budgetHistoryRepository.save(history);
  }

  async remove(id: string): Promise<void> {
    const result = await this.budgetHistoryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Budget History with ID ${id} not found`);
    }
  }
}
