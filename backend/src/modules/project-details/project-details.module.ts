import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BudgetHistory } from './3-domain/entities/budget-history.entity';
import { ShootingHours } from './3-domain/entities/shooting-hours.entity';
import { Comment } from './3-domain/entities/comment.entity';
import { BudgetHistoryService } from './2-application/use-cases/budget-history.service';
import { ShootingHoursService } from './2-application/use-cases/shooting-hours.service';
import { CommentsService } from './2-application/use-cases/comments.service';
import { ProjectDetailsController } from './1-presentation/controllers/project-details.controller';
import { ProjectsModule } from '@/modules/projects/projects.module';
import { UsersModule } from '@/modules/users/users.module';
import { Project } from '@/modules/projects/3-domain/entities/project.entity';
import { User } from '@/modules/users/3-domain/entities/user.entity';
import { Task } from '@/modules/tasks/3-domain/entities/task.entity';
import { TasksModule } from '@/modules/tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BudgetHistory, ShootingHours, Comment, Project, User]),
    ProjectsModule,
    UsersModule,
    TasksModule
  ],
  providers: [BudgetHistoryService, ShootingHoursService, CommentsService],
  controllers: [ProjectDetailsController],
  exports: [TypeOrmModule],
})
export class ProjectDetailsModule {}
