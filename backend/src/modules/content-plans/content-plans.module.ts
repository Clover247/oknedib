import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentPlan } from './3-domain/entities/content-plan.entity';
import { ContentPlanItem } from './3-domain/entities/content-plan-item.entity';
import { ContentPlanFile } from './3-domain/entities/content-plan-file.entity';
import { ContentPlansService } from './2-application/use-cases/content-plans.service';
import { ContentPlansController } from './1-presentation/controllers/content-plans.controller';
import { ProjectsModule } from '@/modules/projects/projects.module';
import { UsersModule } from '@/modules/users/users.module';
import { Project } from '@/modules/projects/3-domain/entities/project.entity';
import { User } from '@/modules/users/3-domain/entities/user.entity';
import { SharedModule } from '@/shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContentPlan, ContentPlanItem, ContentPlanFile, Project, User]),
    ProjectsModule,
    UsersModule,
    SharedModule,
  ],
  providers: [ContentPlansService],
  controllers: [ContentPlansController],
  exports: [TypeOrmModule],
})
export class ContentPlansModule {}
