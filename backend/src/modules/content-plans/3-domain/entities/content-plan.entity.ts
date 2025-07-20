import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Project } from '@/modules/projects/3-domain/entities/project.entity';
import { ContentPlanItem } from './content-plan-item.entity';

export enum ContentPlanStatus {
  DRAFT = 'DRAFT',
  APPROVED = 'APPROVED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

@Entity({ name: 'content_plans' })
export class ContentPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  month: number;

  @Column({ type: 'int' })
  year: number;

  @Column({
    type: 'enum',
    enum: ContentPlanStatus,
    default: ContentPlanStatus.DRAFT,
  })
  status: ContentPlanStatus;

  @Column({ type: 'int', default: 0 })
  totalPosts: number;

  @Column({ type: 'int', default: 0 })
  completedPosts: number;

  @Column({ type: 'int', default: 0 })
  totalStories: number;

  @Column({ type: 'int', default: 0 })
  completedStories: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 }) // Percentage
  progress: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Project, project => project.contentPlans)
  project: Project;

  @Column() // Foreign key for project
  projectId: string;

  @OneToMany(() => ContentPlanItem, item => item.contentPlan)
  items: ContentPlanItem[];

  // @OneToMany(() => ContentPlanFile, file => file.contentPlan)
  // attachments: ContentPlanFile[];
}
