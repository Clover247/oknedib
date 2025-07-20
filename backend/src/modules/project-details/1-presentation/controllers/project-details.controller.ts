import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BudgetHistoryService } from '@/modules/project-details/2-application/use-cases/budget-history.service';
import { ShootingHoursService } from '@/modules/project-details/2-application/use-cases/shooting-hours.service';
import { CommentsService } from '@/modules/project-details/2-application/use-cases/comments.service';
import { CreateBudgetHistoryDto } from '@/modules/project-details/1-presentation/dtos/create-budget-history.dto';
import { UpdateBudgetHistoryDto } from '@/modules/project-details/1-presentation/dtos/update-budget-history.dto';
import { CreateShootingHoursDto } from '@/modules/project-details/1-presentation/dtos/create-shooting-hours.dto';
import { UpdateShootingHoursDto } from '@/modules/project-details/1-presentation/dtos/update-shooting-hours.dto';
import { CreateCommentDto } from '@/modules/project-details/1-presentation/dtos/create-comment.dto';
import { UpdateCommentDto } from '@/modules/project-details/1-presentation/dtos/update-comment.dto';
import { JwtAuthGuard } from '@/modules/auth/1-presentation/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('projects/:projectId')
export class ProjectDetailsController {
  constructor(
    private readonly budgetHistoryService: BudgetHistoryService,
    private readonly shootingHoursService: ShootingHoursService,
    private readonly commentsService: CommentsService,
  ) {}

  // Budget History Endpoints
  @Post('budget-history')
  createBudgetHistory(@Param('projectId') projectId: string, @Body() createBudgetHistoryDto: CreateBudgetHistoryDto) {
    return this.budgetHistoryService.create({ ...createBudgetHistoryDto, projectId });
  }

  @Get('budget-history')
  findAllBudgetHistory(@Param('projectId') projectId: string) {
    return this.budgetHistoryService.findAll(projectId);
  }

  @Get('budget-history/:id')
  findOneBudgetHistory(@Param('id') id: string) {
    return this.budgetHistoryService.findOne(id);
  }

  @Patch('budget-history/:id')
  updateBudgetHistory(@Param('id') id: string, @Body() updateBudgetHistoryDto: UpdateBudgetHistoryDto) {
    return this.budgetHistoryService.update(id, updateBudgetHistoryDto);
  }

  @Delete('budget-history/:id')
  removeBudgetHistory(@Param('id') id: string) {
    return this.budgetHistoryService.remove(id);
  }

  // Shooting Hours Endpoints
  @Post('shooting-hours')
  createShootingHours(@Param('projectId') projectId: string, @Body() createShootingHoursDto: CreateShootingHoursDto) {
    return this.shootingHoursService.create({ ...createShootingHoursDto, projectId });
  }

  @Get('shooting-hours')
  findAllShootingHours(@Param('projectId') projectId: string) {
    return this.shootingHoursService.findAll(projectId);
  }

  @Get('shooting-hours/:id')
  findOneShootingHours(@Param('id') id: string) {
    return this.shootingHoursService.findOne(id);
  }

  @Patch('shooting-hours/:id')
  updateShootingHours(@Param('id') id: string, @Body() updateShootingHoursDto: UpdateShootingHoursDto) {
    return this.shootingHoursService.update(id, updateShootingHoursDto);
  }

  @Delete('shooting-hours/:id')
  removeShootingHours(@Param('id') id: string) {
    return this.shootingHoursService.remove(id);
  }

  // Comments Endpoints
  @Post('comments')
  createComment(@Param('projectId') projectId: string, @Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create({ ...createCommentDto, projectId });
  }

  @Get('comments')
  findAllComments(@Param('projectId') projectId: string) {
    return this.commentsService.findAll(projectId);
  }

  @Get('comments/:id')
  findOneComment(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @Patch('comments/:id')
  updateComment(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete('comments/:id')
  removeComment(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
