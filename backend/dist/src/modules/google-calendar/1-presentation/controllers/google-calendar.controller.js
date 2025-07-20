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
exports.GoogleCalendarController = void 0;
const common_1 = require("@nestjs/common");
const google_calendar_service_1 = require("../../2-application/use-cases/google-calendar.service");
const create_calendar_event_dto_1 = require("../dtos/create-calendar-event.dto");
const update_calendar_event_dto_1 = require("../dtos/update-calendar-event.dto");
const jwt_auth_guard_1 = require("../../../auth/1-presentation/guards/jwt-auth.guard");
let GoogleCalendarController = class GoogleCalendarController {
    constructor(googleCalendarService) {
        this.googleCalendarService = googleCalendarService;
    }
    getAuthUrl(res) {
        const authUrl = this.googleCalendarService.getAuthUrl();
        res.redirect(authUrl);
    }
    async oauth2Callback(code, state) {
        const userId = JSON.parse(Buffer.from(state, 'base64').toString('ascii')).userId;
        const tokens = await this.googleCalendarService.getTokens(code, userId);
        return { message: 'Authentication successful', tokens };
    }
    createEvent(createCalendarEventDto) {
        return this.googleCalendarService.createEvent(createCalendarEventDto);
    }
    findAllEvents() {
        return this.googleCalendarService.findAllEvents();
    }
    findOneEvent(id) {
        return this.googleCalendarService.findOneEvent(id);
    }
    updateEvent(id, updateCalendarEventDto) {
        return this.googleCalendarService.updateEvent(id, updateCalendarEventDto);
    }
    removeEvent(id) {
        return this.googleCalendarService.removeEvent(id);
    }
};
exports.GoogleCalendarController = GoogleCalendarController;
__decorate([
    (0, common_1.Get)('auth-url'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GoogleCalendarController.prototype, "getAuthUrl", null);
__decorate([
    (0, common_1.Get)('oauth2callback'),
    __param(0, (0, common_1.Query)('code')),
    __param(1, (0, common_1.Query)('state')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GoogleCalendarController.prototype, "oauth2Callback", null);
__decorate([
    (0, common_1.Post)('events'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_calendar_event_dto_1.CreateCalendarEventDto]),
    __metadata("design:returntype", void 0)
], GoogleCalendarController.prototype, "createEvent", null);
__decorate([
    (0, common_1.Get)('events'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GoogleCalendarController.prototype, "findAllEvents", null);
__decorate([
    (0, common_1.Get)('events/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GoogleCalendarController.prototype, "findOneEvent", null);
__decorate([
    (0, common_1.Patch)('events/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_calendar_event_dto_1.UpdateCalendarEventDto]),
    __metadata("design:returntype", void 0)
], GoogleCalendarController.prototype, "updateEvent", null);
__decorate([
    (0, common_1.Delete)('events/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GoogleCalendarController.prototype, "removeEvent", null);
exports.GoogleCalendarController = GoogleCalendarController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('google-calendar'),
    __metadata("design:paramtypes", [google_calendar_service_1.GoogleCalendarService])
], GoogleCalendarController);
//# sourceMappingURL=google-calendar.controller.js.map