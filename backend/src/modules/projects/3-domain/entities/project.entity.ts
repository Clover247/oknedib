import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { User } from '@/modules/users/3-domain/entities/user.entity';
import { Payment } from '@/modules/payments/3-domain/entities/payment.entity';
import { BudgetHistory } from '@/modules/project-details/3-domain/entities/budget-history.entity';
import { ShootingHours } from '@/modules/project-details/3-domain/entities/shooting-hours.entity';
import { Comment } from '@/modules/project-details/3-domain/entities/comment.entity';
import { ContentPlan } from '@/modules/content-plans/3-domain/entities/content-plan.entity';

export enum ProjectStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  ARCHIVED = 'ARCHIVED',
  PAUSED = 'PAUSED',
}

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.ACTIVE,
  })
  status: ProjectStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  budget: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  budgetForTargeting: number;

  @Column({ type: 'date', nullable: true })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, user => user.managedProjects, { nullable: true })
  manager: User;

  @Column({ nullable: true }) // Foreign key for manager
  managerId: string;

  @ManyToMany(() => User, user => user.assignedProjects)
  @JoinTable({
    name: 'project_specialists',
    joinColumn: { name: 'projectId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
  })
  specialists: User[];

  @ManyToMany(() => User, user => user.contentMakerProjects)
  @JoinTable({
    name: 'project_content_makers',
    joinColumn: { name: 'projectId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
  })
  contentMakers: User[];

  @OneToMany(() => Payment, payment => payment.project)
  payments: Payment[];

  @OneToMany(() => BudgetHistory, history => history.project)
  budgetHistory: BudgetHistory[];

  @OneToMany(() => ShootingHours, hours => hours.project)
  shootingHours: ShootingHours[];

  @OneToMany(() => Comment, comment => comment.project)
  comments: Comment[];

  @OneToMany(() => ContentPlan, contentPlan => contentPlan.project)
  contentPlans: ContentPlan[];

  @OneToMany(() => Task, task => task.project)
  tasks: Task[];

  @OneToMany(() => CalendarEvent, event => event.project)
  calendarEvents: CalendarEvent[];
}

