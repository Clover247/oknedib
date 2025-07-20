"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleCalendarModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const calendar_event_entity_1 = require("./3-domain/entities/calendar-event.entity");
const google_api_credentials_entity_1 = require("./3-domain/entities/google-api-credentials.entity");
const google_calendar_service_1 = require("./2-application/use-cases/google-calendar.service");
const google_calendar_controller_1 = require("./1-presentation/controllers/google-calendar.controller");
const config_1 = require("@nestjs/config");
const user_entity_1 = require("../users/3-domain/entities/user.entity");
const project_entity_1 = require("../projects/3-domain/entities/project.entity");
let GoogleCalendarModule = class GoogleCalendarModule {
};
exports.GoogleCalendarModule = GoogleCalendarModule;
exports.GoogleCalendarModule = GoogleCalendarModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([calendar_event_entity_1.CalendarEvent, google_api_credentials_entity_1.GoogleApiCredentials, user_entity_1.User, project_entity_1.Project]), config_1.ConfigModule],
        providers: [google_calendar_service_1.GoogleCalendarService],
        controllers: [google_calendar_controller_1.GoogleCalendarController],
        exports: [typeorm_1.TypeOrmModule],
    })
], GoogleCalendarModule);
//# sourceMappingURL=google-calendar.module.js.map