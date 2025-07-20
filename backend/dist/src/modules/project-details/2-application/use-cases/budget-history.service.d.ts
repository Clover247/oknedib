import { BudgetHistory } from '@/modules/project-details/3-domain/entities/budget-history.entity';
import { Project } from '@/modules/projects/3-domain/entities/project.entity';
import { Repository, EntityManager } from 'typeorm';
import { CreateBudgetHistoryDto } from '@/modules/project-details/1-presentation/dtos/create-budget-history.dto';
import { UpdateBudgetHistoryDto } from '@/modules/project-details/1-presentation/dtos/update-budget-history.dto';
export declare class BudgetHistoryService {
    private budgetHistoryRepository;
    private projectsRepository;
    private entityManager;
    constructor(budgetHistoryRepository: Repository<BudgetHistory>, projectsRepository: Repository<Project>, entityManager: EntityManager);
    create(createBudgetHistoryDto: CreateBudgetHistoryDto): Promise<BudgetHistory>;
    findAll(projectId: string): Promise<BudgetHistory[]>;
    findOne(id: string): Promise<BudgetHistory>;
    update(id: string, updateBudgetHistoryDto: UpdateBudgetHistoryDto): Promise<BudgetHistory>;
    remove(id: string): Promise<void>;
}
