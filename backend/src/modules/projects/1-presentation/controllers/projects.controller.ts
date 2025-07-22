import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProjectsService } from '@/modules/projects/2-application/use-cases/projects.service';
import { CreateProjectDto } from '@/modules/projects/1-presentation/dtos/create-project.dto';
import { UpdateProjectDto } from '@/modules/projects/1-presentation/dtos/update-project.dto';
import { JwtAuthGuard } from '@/modules/auth/1-presentation/guards/jwt-auth.guard';
import { GetUser } from '@/modules/auth/1-presentation/decorators/get-user.decorator';
import { User } from '@/modules/users/3-domain/entities/user.entity';

@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.projectsService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
