
import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@/modules/users/3-domain/entities/user.entity';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
