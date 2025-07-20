import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarEvent } from './3-domain/entities/calendar-event.entity';
import { GoogleCalendarService } from './2-application/use-cases/google-calendar.service';
import { GoogleCalendarController } from './1-presentation/controllers/google-calendar.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([CalendarEvent, GoogleApiCredentials]), ConfigModule],
  providers: [GoogleCalendarService],
  controllers: [GoogleCalendarController],
  exports: [TypeOrmModule],
})
export class GoogleCalendarModule {}
