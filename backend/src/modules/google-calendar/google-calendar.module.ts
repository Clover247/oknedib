import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarEvent } from './3-domain/entities/calendar-event.entity';
import { GoogleApiCredentials } from './3-domain/entities/google-api-credentials.entity';
import { GoogleCalendarService } from './2-application/use-cases/google-calendar.service';
import { GoogleCalendarController } from './1-presentation/controllers/google-calendar.controller';
import { ConfigModule } from '@nestjs/config';
import { User } from '@/modules/users/3-domain/entities/user.entity';
import { Project } from '@/modules/projects/3-domain/entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CalendarEvent, GoogleApiCredentials, User, Project]), ConfigModule],
  providers: [GoogleCalendarService],
  controllers: [GoogleCalendarController],
  exports: [TypeOrmModule],
})
export class GoogleCalendarModule {}
