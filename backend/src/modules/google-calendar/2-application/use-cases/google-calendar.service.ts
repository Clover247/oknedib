import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CalendarEvent } from '@/modules/google-calendar/3-domain/entities/calendar-event.entity';
import { GoogleApiCredentials } from '@/modules/google-calendar/3-domain/entities/google-api-credentials.entity';
import { User } from '@/modules/users/3-domain/entities/user.entity';
import { Project } from '@/modules/projects/3-domain/entities/project.entity';
import { Repository } from 'typeorm';
import { CreateCalendarEventDto } from '@/modules/google-calendar/1-presentation/dtos/create-calendar-event.dto';
import { UpdateCalendarEventDto } from '@/modules/google-calendar/1-presentation/dtos/update-calendar-event.dto';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';

@Injectable()
export class GoogleCalendarService {
  private oauth2Client;
  private calendar;

  constructor(
    @InjectRepository(CalendarEvent)
    private calendarEventsRepository: Repository<CalendarEvent>,
    @InjectRepository(GoogleApiCredentials)
    private credentialsRepository: Repository<GoogleApiCredentials>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    private configService: ConfigService,
  ) {
    this.oauth2Client = new google.auth.OAuth2(
      this.configService.get('GOOGLE_CLIENT_ID'),
      this.configService.get('GOOGLE_CLIENT_SECRET'),
      this.configService.get('GOOGLE_REDIRECT_URI'),
    );
    this.calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
  }

  getAuthUrl(): string {
    const scopes = [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events',
    ];
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
    });
  }

  async getTokens(code: string, userId: string) {
    const { tokens } = await this.oauth2Client.getToken(code);
    this.oauth2Client.setCredentials(tokens);

    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    let credentials = await this.credentialsRepository.findOne({ where: { userId } });
    if (credentials) {
      credentials.accessToken = tokens.access_token;
      if (tokens.refresh_token) {
        credentials.refreshToken = tokens.refresh_token;
      }
      credentials.expiryDate = tokens.expiry_date;
    } else {
      credentials = this.credentialsRepository.create({
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiryDate: tokens.expiry_date,
        user,
      });
    }

    await this.credentialsRepository.save(credentials);

    return tokens;
  }

  async createEvent(createCalendarEventDto: CreateCalendarEventDto): Promise<CalendarEvent> {
    const event = this.calendarEventsRepository.create(createCalendarEventDto);
    const savedEvent = await this.calendarEventsRepository.save(event);

    // Create event in Google Calendar
    const googleEvent = await this.calendar.events.insert({
      calendarId: 'primary',
      requestBody: {
        summary: savedEvent.title,
        description: savedEvent.description,
        start: { dateTime: savedEvent.startTime.toISOString(), timeZone: 'UTC' },
        end: { dateTime: savedEvent.endTime.toISOString(), timeZone: 'UTC' },
        location: savedEvent.location,
        attendees: savedEvent.attendees ? savedEvent.attendees.map(email => ({ email })) : [],
      },
    });

    savedEvent.googleEventId = googleEvent.data.id;
    savedEvent.lastSyncedAt = new Date();
    return this.calendarEventsRepository.save(savedEvent);
  }

  async findAllEvents(): Promise<CalendarEvent[]> {
    return this.calendarEventsRepository.find();
  }

  async findOneEvent(id: string): Promise<CalendarEvent> {
    const event = await this.calendarEventsRepository.findOneBy({ id });
    if (!event) {
      throw new NotFoundException(`Calendar Event with ID ${id} not found`);
    }
    return event;
  }

  async updateEvent(id: string, updateCalendarEventDto: UpdateCalendarEventDto): Promise<CalendarEvent> {
    const event = await this.calendarEventsRepository.preload({
      id: id,
      ...updateCalendarEventDto,
    });
    if (!event) {
      throw new NotFoundException(`Calendar Event with ID ${id} not found`);
    }

    const savedEvent = await this.calendarEventsRepository.save(event);

    // Update event in Google Calendar
    if (savedEvent.googleEventId) {
      await this.calendar.events.update({
        calendarId: 'primary',
        eventId: savedEvent.googleEventId,
        requestBody: {
          summary: savedEvent.title,
          description: savedEvent.description,
          start: { dateTime: savedEvent.startTime.toISOString(), timeZone: 'UTC' },
          end: { dateTime: savedEvent.endTime.toISOString(), timeZone: 'UTC' },
          location: savedEvent.location,
          attendees: savedEvent.attendees ? savedEvent.attendees.map(email => ({ email })) : [],
        },
      });
    }

    savedEvent.lastSyncedAt = new Date();
    return this.calendarEventsRepository.save(savedEvent);
  }

  async removeEvent(id: string): Promise<void> {
    const event = await this.calendarEventsRepository.findOneBy({ id });
    if (!event) {
      throw new NotFoundException(`Calendar Event with ID ${id} not found`);
    }

    // Delete event from Google Calendar
    if (event.googleEventId) {
      await this.calendar.events.delete({
        calendarId: 'primary',
        eventId: event.googleEventId,
      });
    }

    const result = await this.calendarEventsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Calendar Event with ID ${id} not found`);
    }
  }
}
