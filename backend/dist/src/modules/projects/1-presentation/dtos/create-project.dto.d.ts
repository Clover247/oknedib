import { ProjectStatus } from '@/modules/projects/3-domain/entities/project.entity';
export declare class CreateProjectDto {
    name: string;
    status: ProjectStatus;
    description?: string;
    startDate: Date;
    endDate?: Date;
    budget: number;
    targetingBudget: number;
    postsCount: number;
    storiesCount: number;
    hasTargeting: boolean;
    shootingHours: number;
    managerId: string;
    specialistIds?: string[];
    contentMakerIds?: string[];
}
