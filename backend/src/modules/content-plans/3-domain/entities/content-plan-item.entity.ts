import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ContentPlan } from './content-plan.entity';
import { User } from '@/modules/users/3-domain/entities/user.entity';

export enum ContentItemType {
  POST = 'POST',
  STORY = 'STORY',
  REEL = 'REEL',
}

export enum ContentItemStatus {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

@Entity({ name: 'content_plan_items' })
export class ContentPlanItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({
    type: 'enum',
    enum: ContentItemType,
  })
  type: ContentItemType;

  @Column({
    type: 'enum',
    enum: ContentItemStatus,
    default: ContentItemStatus.PLANNED,
  })
  status: ContentItemStatus;

  @Column({ type: 'text' })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => ContentPlan, contentPlan => contentPlan.items)
  contentPlan: ContentPlan;

  @Column() // Foreign key for contentPlan
  contentPlanId: string;

  @ManyToOne(() => User, user => user.assignedContentItems)
  assignee: User;

  @Column() // Foreign key for assignee
  assigneeId: string;

  @OneToMany(() => ContentPlanFile, file => file.contentPlanItem)
  attachments: ContentPlanFile[];

  // @OneToMany(() => Comment, comment => comment.contentPlanItem)
  // comments: Comment[];
}
