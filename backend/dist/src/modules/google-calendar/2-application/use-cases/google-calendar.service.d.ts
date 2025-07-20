import { CalendarEvent } from '@/modules/google-calendar/3-domain/entities/calendar-event.entity';
import { GoogleApiCredentials } from '@/modules/google-calendar/3-domain/entities/google-api-credentials.entity';
import { User } from '@/modules/users/3-domain/entities/user.entity';
import { Project } from '@/modules/projects/3-domain/entities/project.entity';
import { Repository } from 'typeorm';
import { CreateCalendarEventDto } from '@/modules/google-calendar/1-presentation/dtos/create-calendar-event.dto';
import { UpdateCalendarEventDto } from '@/modules/google-calendar/1-presentation/dtos/update-calendar-event.dto';
import { ConfigService } from '@nestjs/config';
export declare class GoogleCalendarService {
    private calendarEventsRepository;
    private credentialsRepository;
    private usersRepository;
    private projectsRepository;
    private configService;
    private oauth2Client;
    private calendar;
    constructor(calendarEventsRepository: Repository<CalendarEvent>, credentialsRepository: Repository<GoogleApiCredentials>, usersRepository: Repository<User>, projectsRepository: Repository<Project>, configService: ConfigService);
    getAuthUrl(): string;
    getTokens(code: string, userId: string): Promise<any>;
    createEvent(createCalendarEventDto: CreateCalendarEventDto): Promise<CalendarEvent>;
    findAllEvents(): Promise<CalendarEvent[]>;
    findOneEvent(id: string): Promise<CalendarEvent>;
    updateEvent(id: string, updateCalendarEventDto: UpdateCalendarEventDto): Promise<CalendarEvent>;
    removeEvent(id: string): Promise<void>;
}
