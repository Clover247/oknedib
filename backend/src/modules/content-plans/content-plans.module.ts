import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentPlan } from './3-domain/entities/content-plan.entity';
import { ContentPlanItem } from './3-domain/entities/content-plan-item.entity';
import { ContentPlansService } from './2-application/use-cases/content-plans.service';
import { ContentPlansController } from './1-presentation/controllers/content-plans.controller';
import { ProjectsModule } from '@/modules/projects/projects.module';
import { UsersModule } from '@/modules/users/users.module';
import { Project } from '@/modules/projects/3-domain/entities/project.entity';
import { User } from '@/modules/users/3-domain/entities/user.entity';

import { CloudinaryProvider } from '@/shared/providers/cloudinary.provider';
import { CloudinaryService } from '@/shared/services/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContentPlan, ContentPlanItem, ContentPlanFile, Project, User]), ProjectsModule, UsersModule],
  providers: [ContentPlansService, CloudinaryProvider, CloudinaryService],
  controllers: [ContentPlansController],
  exports: [TypeOrmModule],
})
export class ContentPlansModule {}
