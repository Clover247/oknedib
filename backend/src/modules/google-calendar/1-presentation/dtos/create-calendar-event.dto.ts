import { IsString, IsNotEmpty, IsEnum, IsDateString, IsOptional, IsArray } from 'class-validator';
import { CalendarEventType, CalendarEventStatus } from '@/modules/google-calendar/3-domain/entities/calendar-event.entity';

export class CreateCalendarEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  startTime: Date;

  @IsDateString()
  endTime: Date;

  @IsString()
  @IsOptional()
  location?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  attendees?: string[];

  @IsEnum(CalendarEventType)
  type: CalendarEventType;

  @IsEnum(CalendarEventStatus)
  @IsOptional()
  status?: CalendarEventStatus;

  @IsUUID()
  @IsOptional()
  projectId?: string;
}
