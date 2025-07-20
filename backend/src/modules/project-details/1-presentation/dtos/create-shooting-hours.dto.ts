import { IsString, IsNotEmpty, IsNumber, IsUUID, IsDateString } from 'class-validator';

export class CreateShootingHoursDto {
  @IsUUID()
  projectId: string;

  @IsDateString()
  date: Date;

  @IsNumber()
  plannedHours: number;

  @IsNumber()
  actualHours: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}
