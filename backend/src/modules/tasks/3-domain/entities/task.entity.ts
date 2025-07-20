
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Project } from '@/modules/projects/3-domain/entities/project.entity';
import { User } from '@/modules/users/3-domain/entities/user.entity';
import { Comment } from '@/modules/project-details/3-domain/entities/comment.entity';

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  status: TaskStatus;

  @Column({ type: 'date', nullable: true })
  dueDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Project, project => project.tasks)
  project: Project;

  @Column()
  projectId: string;

  @ManyToOne(() => User, user => user.tasks)
  assignee: User;

  @Column({ nullable: true })
  assigneeId: string;

  @OneToMany(() => Comment, comment => comment.task)
  comments: Comment[];
}
