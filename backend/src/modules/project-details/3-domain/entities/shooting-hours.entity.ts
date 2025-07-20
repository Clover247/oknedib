import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Project } from '@/modules/projects/3-domain/entities/project.entity';

@Entity({ name: 'shooting_hours' })
export class ShootingHours {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'int' })
  plannedHours: number;

  @Column({ type: 'int' })
  actualHours: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Project, project => project.shootingHours)
  project: Project;

  @Column() // Foreign key for project
  projectId: string;
}
