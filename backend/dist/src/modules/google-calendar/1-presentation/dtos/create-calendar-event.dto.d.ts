import { CalendarEventType, CalendarEventStatus } from '@/modules/google-calendar/3-domain/entities/calendar-event.entity';
export declare class CreateCalendarEventDto {
    title: string;
    description?: string;
    startTime: Date;
    endTime: Date;
    location?: string;
    attendees?: string[];
    type: CalendarEventType;
    status?: CalendarEventStatus;
    projectId?: string;
}
