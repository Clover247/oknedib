import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res, UseGuards } from '@nestjs/common';
import { GoogleCalendarService } from '@/modules/google-calendar/2-application/use-cases/google-calendar.service';
import { CreateCalendarEventDto } from '@/modules/google-calendar/1-presentation/dtos/create-calendar-event.dto';
import { UpdateCalendarEventDto } from '@/modules/google-calendar/1-presentation/dtos/update-calendar-event.dto';
import { Response } from 'express';
import { JwtAuthGuard } from '@/modules/auth/1-presentation/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('google-calendar')
export class GoogleCalendarController {
  constructor(private readonly googleCalendarService: GoogleCalendarService) {}

  @Get('auth-url')
  getAuthUrl(@Res() res: Response) {
    const authUrl = this.googleCalendarService.getAuthUrl();
    res.redirect(authUrl);
  }

  @Get('oauth2callback')
  async oauth2Callback(@Query('code') code: string, @Query('state') state: string) {
    const userId = JSON.parse(Buffer.from(state, 'base64').toString('ascii')).userId;
    const tokens = await this.googleCalendarService.getTokens(code, userId);
    return { message: 'Authentication successful', tokens };
  }

  @Post('events')
  createEvent(@Body() createCalendarEventDto: CreateCalendarEventDto) {
    return this.googleCalendarService.createEvent(createCalendarEventDto);
  }

  @Get('events')
  findAllEvents() {
    return this.googleCalendarService.findAllEvents();
  }

  @Get('events/:id')
  findOneEvent(@Param('id') id: string) {
    return this.googleCalendarService.findOneEvent(id);
  }

  @Patch('events/:id')
  updateEvent(@Param('id') id: string, @Body() updateCalendarEventDto: UpdateCalendarEventDto) {
    return this.googleCalendarService.updateEvent(id, updateCalendarEventDto);
  }

  @Delete('events/:id')
  removeEvent(@Param('id') id: string) {
    return this.googleCalendarService.removeEvent(id);
  }
}
