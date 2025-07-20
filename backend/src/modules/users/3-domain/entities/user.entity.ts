import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable, OneToOne } from 'typeorm';
import { Project } from '@/modules/projects/3-domain/entities/project.entity';
import { ContentPlanItem } from '@/modules/content-plans/3-domain/entities/content-plan-item.entity';
import { Comment } from '@/modules/project-details/3-domain/entities/comment.entity';
import { Task } from '@/modules/tasks/3-domain/entities/task.entity';
import { GoogleApiCredentials } from '@/modules/google-calendar/3-domain/entities/google-api-credentials.entity';

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  SPECIALIST = 'SPECIALIST',
  CONTENT_MAKER = 'CONTENT_MAKER',
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.SPECIALIST,
  })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Project, project => project.manager)
  managedProjects: Project[];

  @ManyToMany(() => Project, project => project.specialists)
  assignedProjects: Project[];

  @ManyToMany(() => Project, project => project.contentMakers)
  contentMakerProjects: Project[];

  @OneToMany(() => ContentPlanItem, item => item.assignee)
  assignedContentItems: ContentPlanItem[];

  @OneToMany(() => Comment, comment => comment.author)
  comments: Comment[];

  @OneToMany(() => Task, task => task.assignee)
  tasks: Task[];

  @OneToOne(() => GoogleApiCredentials, credentials => credentials.user)
  googleApiCredentials: GoogleApiCredentials;
}

