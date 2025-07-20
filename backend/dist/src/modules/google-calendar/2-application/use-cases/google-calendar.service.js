"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleCalendarService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const calendar_event_entity_1 = require("../../3-domain/entities/calendar-event.entity");
const google_api_credentials_entity_1 = require("../../3-domain/entities/google-api-credentials.entity");
const user_entity_1 = require("../../../users/3-domain/entities/user.entity");
const project_entity_1 = require("../../../projects/3-domain/entities/project.entity");
const typeorm_2 = require("typeorm");
const config_1 = require("@nestjs/config");
const googleapis_1 = require("googleapis");
let GoogleCalendarService = class GoogleCalendarService {
    constructor(calendarEventsRepository, credentialsRepository, usersRepository, projectsRepository, configService) {
        this.calendarEventsRepository = calendarEventsRepository;
        this.credentialsRepository = credentialsRepository;
        this.usersRepository = usersRepository;
        this.projectsRepository = projectsRepository;
        this.configService = configService;
        this.oauth2Client = new googleapis_1.google.auth.OAuth2(this.configService.get('GOOGLE_CLIENT_ID'), this.configService.get('GOOGLE_CLIENT_SECRET'), this.configService.get('GOOGLE_REDIRECT_URI'));
        this.calendar = googleapis_1.google.calendar({ version: 'v3', auth: this.oauth2Client });
    }
    getAuthUrl() {
        const scopes = [
            'https://www.googleapis.com/auth/calendar',
            'https://www.googleapis.com/auth/calendar.events',
        ];
        return this.oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes,
        });
    }
    async getTokens(code, userId) {
        const { tokens } = await this.oauth2Client.getToken(code);
        this.oauth2Client.setCredentials(tokens);
        const user = await this.usersRepository.findOneBy({ id: userId });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        }
        let credentials = await this.credentialsRepository.findOne({ where: { userId } });
        if (credentials) {
            credentials.accessToken = tokens.access_token;
            if (tokens.refresh_token) {
                credentials.refreshToken = tokens.refresh_token;
            }
            credentials.expiryDate = tokens.expiry_date;
        }
        else {
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
    async createEvent(createCalendarEventDto) {
        const event = this.calendarEventsRepository.create(createCalendarEventDto);
        const savedEvent = await this.calendarEventsRepository.save(event);
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
    async findAllEvents() {
        return this.calendarEventsRepository.find();
    }
    async findOneEvent(id) {
        const event = await this.calendarEventsRepository.findOneBy({ id });
        if (!event) {
            throw new common_1.NotFoundException(`Calendar Event with ID ${id} not found`);
        }
        return event;
    }
    async updateEvent(id, updateCalendarEventDto) {
        const event = await this.calendarEventsRepository.preload({
            id: id,
            ...updateCalendarEventDto,
        });
        if (!event) {
            throw new common_1.NotFoundException(`Calendar Event with ID ${id} not found`);
        }
        const savedEvent = await this.calendarEventsRepository.save(event);
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
    async removeEvent(id) {
        const event = await this.calendarEventsRepository.findOneBy({ id });
        if (!event) {
            throw new common_1.NotFoundException(`Calendar Event with ID ${id} not found`);
        }
        if (event.googleEventId) {
            await this.calendar.events.delete({
                calendarId: 'primary',
                eventId: event.googleEventId,
            });
        }
        const result = await this.calendarEventsRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Calendar Event with ID ${id} not found`);
        }
    }
};
exports.GoogleCalendarService = GoogleCalendarService;
exports.GoogleCalendarService = GoogleCalendarService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(calendar_event_entity_1.CalendarEvent)),
    __param(1, (0, typeorm_1.InjectRepository)(google_api_credentials_entity_1.GoogleApiCredentials)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        config_1.ConfigService])
], GoogleCalendarService);
//# sourceMappingURL=google-calendar.service.js.map