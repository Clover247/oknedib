
import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from '../../2-application/users.service';
import { JwtAuthGuard } from '@/modules/auth/1-presentation/guards/jwt-auth.guard';
import { RolesGuard } from '@/modules/auth/1-presentation/guards/roles.guard';
import { Roles } from '@/modules/auth/1-presentation/decorators/roles.decorator';
import { UserRole } from '../../3-domain/entities/user.entity';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }
}
