import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Project } from '@/modules/projects/3-domain/entities/project.entity';

export enum BudgetType {
  TOTAL = 'TOTAL',
  TARGETING = 'TARGETING',
}

export enum BudgetAction {
  INCREASE = 'INCREASE',
  DECREASE = 'DECREASE',
}

@Entity({ name: 'budget_history' })
export class BudgetHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: BudgetType,
  })
  type: BudgetType;

  @Column({
    type: 'enum',
    enum: BudgetAction,
  })
  action: BudgetAction;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Project, project => project.budgetHistory)
  project: Project;

  @Column() // Foreign key for project
  projectId: string;
}
