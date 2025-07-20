import { PartialType } from '@nestjs/mapped-types';
import { CreateShootingHoursDto } from './create-shooting-hours.dto';

export class UpdateShootingHoursDto extends PartialType(CreateShootingHoursDto) {}
