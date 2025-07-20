
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { ContentPlanItem } from './content-plan-item.entity';

@Entity({ name: 'content_plan_files' })
export class ContentPlanFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  originalName: string;

  @Column()
  mimeType: string;

  @Column()
  path: string; // Шлях до файлу (локальний або URL)

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => ContentPlanItem, item => item.attachments, { onDelete: 'CASCADE' })
  contentPlanItem: ContentPlanItem;

  @Column()
  contentPlanItemId: string;
}
