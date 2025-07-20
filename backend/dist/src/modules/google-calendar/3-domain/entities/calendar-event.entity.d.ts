import { Project } from '@/modules/projects/3-domain/entities/project.entity';
export declare enum CalendarEventType {
    SHOOTING = "SHOOTING",
    MEETING = "MEETING",
    OTHER = "OTHER"
}
export declare enum CalendarEventStatus {
    CONFIRMED = "CONFIRMED",
    TENTATIVE = "TENTATIVE",
    CANCELLED = "CANCELLED"
}
export declare class CalendarEvent {
    id: string;
    googleEventId: string;
    title: string;
    description: string;
    startTime: Date;
    endTime: Date;
    location: string;
    attendees: string[];
    type: CalendarEventType;
    status: CalendarEventStatus;
    lastSyncedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    project: Project;
    projectId: string;
}
