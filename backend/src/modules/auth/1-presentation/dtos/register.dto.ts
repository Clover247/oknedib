import { IsEmail, IsString, MinLength, IsEnum } from 'class-validator';
import { UserRole } from '@/modules/users/3-domain/entities/user.entity';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEnum(UserRole)
  role: UserRole;
}
