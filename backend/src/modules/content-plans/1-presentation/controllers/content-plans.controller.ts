import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ContentPlansService } from '@/modules/content-plans/2-application/use-cases/content-plans.service';
import { CreateContentPlanDto } from '@/modules/content-plans/1-presentation/dtos/create-content-plan.dto';
import { UpdateContentPlanDto } from '@/modules/content-plans/1-presentation/dtos/update-content-plan.dto';
import { JwtAuthGuard } from '@/modules/auth/1-presentation/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('content-plans')
export class ContentPlansController {
  constructor(private readonly contentPlansService: ContentPlansService) {}

  @Post()
  create(@Body() createContentPlanDto: CreateContentPlanDto) {
    return this.contentPlansService.create(createContentPlanDto);
  }

  @Get()
  findAll() {
    return this.contentPlansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentPlansService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContentPlanDto: UpdateContentPlanDto) {
    return this.contentPlansService.update(id, updateContentPlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentPlansService.remove(id);
  }

  @Post(':itemId/files')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @Param('itemId') itemId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.contentPlansService.addFileToContentItem(itemId, file);
  }
}
