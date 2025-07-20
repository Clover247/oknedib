import { GoogleCalendarService } from '@/modules/google-calendar/2-application/use-cases/google-calendar.service';
import { CreateCalendarEventDto } from '@/modules/google-calendar/1-presentation/dtos/create-calendar-event.dto';
import { UpdateCalendarEventDto } from '@/modules/google-calendar/1-presentation/dtos/update-calendar-event.dto';
import { Response } from 'express';
export declare class GoogleCalendarController {
    private readonly googleCalendarService;
    constructor(googleCalendarService: GoogleCalendarService);
    getAuthUrl(res: Response): void;
    oauth2Callback(code: string, state: string): Promise<{
        message: string;
        tokens: any;
    }>;
    createEvent(createCalendarEventDto: CreateCalendarEventDto): Promise<import("../../3-domain/entities/calendar-event.entity").CalendarEvent>;
    findAllEvents(): Promise<import("../../3-domain/entities/calendar-event.entity").CalendarEvent[]>;
    findOneEvent(id: string): Promise<import("../../3-domain/entities/calendar-event.entity").CalendarEvent>;
    updateEvent(id: string, updateCalendarEventDto: UpdateCalendarEventDto): Promise<import("../../3-domain/entities/calendar-event.entity").CalendarEvent>;
    removeEvent(id: string): Promise<void>;
}
