import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './3-domain/entities/project.entity';
import { ProjectsService } from './2-application/use-cases/projects.service';
import { ProjectsController } from './1-presentation/controllers/projects.controller';
import { UsersModule } from '@/modules/users/users.module';
import { User } from '@/modules/users/3-domain/entities/user.entity';

import { ShootingHours } from '@/modules/project-details/3-domain/entities/shooting-hours.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, User, ShootingHours]), UsersModule],
  providers: [ProjectsService],
  controllers: [ProjectsController],
  exports: [TypeOrmModule],
})
export class ProjectsModule {}
