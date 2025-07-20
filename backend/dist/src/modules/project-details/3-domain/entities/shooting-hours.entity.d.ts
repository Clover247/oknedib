import { Project } from '@/modules/projects/3-domain/entities/project.entity';
export declare class ShootingHours {
    id: string;
    date: Date;
    plannedHours: number;
    actualHours: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    project: Project;
    projectId: string;
}
