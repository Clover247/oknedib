import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum CalendarEventType {
  SHOOTING = 'SHOOTING',
  MEETING = 'MEETING',
  OTHER = 'OTHER',
}

export enum CalendarEventStatus {
  CONFIRMED = 'CONFIRMED',
  TENTATIVE = 'TENTATIVE',
  CANCELLED = 'CANCELLED',
}

@Entity({ name: 'calendar_events' })
export class CalendarEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  googleEventId: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'timestamp' })
  endTime: Date;

  @Column({ nullable: true })
  location: string;

  @Column({ type: 'simple-array', nullable: true })
  attendees: string[];

  @Column({
    type: 'enum',
    enum: CalendarEventType,
  })
  type: CalendarEventType;

  @Column({
    type: 'enum',
    enum: CalendarEventStatus,
    default: CalendarEventStatus.CONFIRMED,
  })
  status: CalendarEventStatus;

  @Column({ type: 'timestamp', nullable: true })
  lastSyncedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Project, project => project.calendarEvents)
  project: Project;

  @Column({ nullable: true })
  projectId: string;
}
