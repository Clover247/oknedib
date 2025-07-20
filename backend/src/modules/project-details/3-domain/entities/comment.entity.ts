import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Project } from '@/modules/projects/3-domain/entities/project.entity';
import { User } from '@/modules/users/3-domain/entities/user.entity';
// import { Task } from '@/modules/tasks/3-domain/entities/task.entity'; // Uncomment when Task entity is created
// import { ContentPlanItem } from '@/modules/content-plans/3-domain/entities/content-plan-item.entity'; // Uncomment when ContentPlanItem entity is created

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Project, project => project.comments)
  project: Project;

  @Column({ nullable: true }) // Foreign key for project
  projectId: string;

  @ManyToOne(() => User, user => user.comments)
  author: User;

  @Column() // Foreign key for author
  authorId: string;

  @Column({ nullable: true }) // For replies
  parentId: string;

  @ManyToOne(() => Task, task => task.comments)
  task: Task;

  @Column({ nullable: true }) // Foreign key for task
  taskId: string;

  // @ManyToOne(() => ContentPlanItem, item => item.comments)
  // contentPlanItem: ContentPlanItem;

  // @Column({ nullable: true }) // Foreign key for content plan item
  // contentPlanItemId: string;
}
