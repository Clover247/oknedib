import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentPlan, ContentPlanStatus } from '@/modules/content-plans/3-domain/entities/content-plan.entity';
import { ContentPlanItem, ContentItemStatus } from '@/modules/content-plans/3-domain/entities/content-plan-item.entity';
import { ContentPlanFile } from '@/modules/content-plans/3-domain/entities/content-plan-file.entity';
import { Project } from '@/modules/projects/3-domain/entities/project.entity';
import { User } from '@/modules/users/3-domain/entities/user.entity';
import { Repository, In } from 'typeorm';
import { CreateContentPlanDto, CreateContentItemDto } from '@/modules/content-plans/1-presentation/dtos/create-content-plan.dto';
import { UpdateContentPlanDto, UpdateContentItemDto } from '@/modules/content-plans/1-presentation/dtos/update-content-plan.dto';
import { CloudinaryService } from '@/shared/services/cloudinary.service';

@Injectable()
export class ContentPlansService {
  constructor(
    @InjectRepository(ContentPlan)
    private contentPlansRepository: Repository<ContentPlan>,
    @InjectRepository(ContentPlanItem)
    private contentPlanItemsRepository: Repository<ContentPlanItem>,
    @InjectRepository(ContentPlanFile)
    private contentPlanFilesRepository: Repository<ContentPlanFile>,
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(createContentPlanDto: CreateContentPlanDto): Promise<ContentPlan> {
    const project = await this.projectsRepository.findOneBy({ id: createContentPlanDto.projectId });
    if (!project) {
      throw new NotFoundException(`Project with ID ${createContentPlanDto.projectId} not found`);
    }

    const contentPlan = this.contentPlansRepository.create({
      ...createContentPlanDto,
      project,
    });

    const savedContentPlan = await this.contentPlansRepository.save(contentPlan);

    if (createContentPlanDto.items && createContentPlanDto.items.length > 0) {
      const assignees = await this.usersRepository.findBy({ id: In(createContentPlanDto.items.map(item => item.assigneeId)) });
      if (assignees.length !== createContentPlanDto.items.length) {
        throw new BadRequestException('One or more assignees not found');
      }

      const contentItems = createContentPlanDto.items.map(itemDto => {
        const assignee = assignees.find(a => a.id === itemDto.assigneeId);
        return this.contentPlanItemsRepository.create({
          ...itemDto,
          contentPlan: savedContentPlan,
          assignee,
        });
      });
      await this.contentPlanItemsRepository.save(contentItems);
    }

    return this.calculateProgress(savedContentPlan.id);
  }

  async findAll(): Promise<ContentPlan[]> {
    return this.contentPlansRepository.find({ relations: ['project', 'items', 'items.assignee'] });
  }

  async findOne(id: string): Promise<ContentPlan> {
    const contentPlan = await this.contentPlansRepository.findOne({
      where: { id },
      relations: ['project', 'items', 'items.assignee'],
    });
    if (!contentPlan) {
      throw new NotFoundException(`Content Plan with ID ${id} not found`);
    }
    return contentPlan;
  }

  async update(id: string, updateContentPlanDto: UpdateContentPlanDto): Promise<ContentPlan> {
    const contentPlan = await this.contentPlansRepository.findOne({ where: { id } });
    if (!contentPlan) {
      throw new NotFoundException(`Content Plan with ID ${id} not found`);
    }

    // Update main content plan properties
    Object.assign(contentPlan, updateContentPlanDto);

    // Handle content items updates
    if (updateContentPlanDto.items) {
      const existingItems = await this.contentPlanItemsRepository.find({ where: { contentPlan: { id } } });
      const itemsToUpdate = [];
      const itemsToCreate = [];
      const itemsToDelete = existingItems.filter(item => !(updateContentPlanDto.items as UpdateContentItemDto[]).some(updateItem => updateItem.id === item.id));

      for (const itemDto of (updateContentPlanDto.items as UpdateContentItemDto[])) {
        if (itemDto.id) {
          // Update existing item
          const existingItem = existingItems.find(item => item.id === itemDto.id);
          if (existingItem) {
            if (itemDto.assigneeId) {
              const assignee = await this.usersRepository.findOneBy({ id: itemDto.assigneeId });
              if (!assignee) throw new NotFoundException(`Assignee with ID ${itemDto.assigneeId} not found`);
              existingItem.assignee = assignee;
            }
            Object.assign(existingItem, itemDto);
            itemsToUpdate.push(existingItem);
          }
        } else {
          // Create new item
          const assignee = await this.usersRepository.findOneBy({ id: itemDto.assigneeId });
          if (!assignee) throw new NotFoundException(`Assignee with ID ${itemDto.assigneeId} not found`);
          itemsToCreate.push(this.contentPlanItemsRepository.create({ ...itemDto, contentPlan, assignee }));
        }
      }

      await this.contentPlanItemsRepository.save(itemsToUpdate);
      await this.contentPlanItemsRepository.save(itemsToCreate);
      await this.contentPlanItemsRepository.remove(itemsToDelete);
    }

    const savedContentPlan = await this.contentPlansRepository.save(contentPlan);
    return this.calculateProgress(savedContentPlan.id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.contentPlansRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Content Plan with ID ${id} not found`);
    }
  }

  async addFileToContentItem(itemId: string, file: Express.Multer.File): Promise<ContentPlanFile> {
    const contentItem = await this.contentPlanItemsRepository.findOneBy({ id: itemId });
    if (!contentItem) {
      throw new NotFoundException(`Content Plan Item with ID ${itemId} not found`);
    }

    const uploadResult = await this.cloudinaryService.uploadStream(file);

    const newFile = this.contentPlanFilesRepository.create({
      originalName: file.originalname,
      mimeType: file.mimetype,
      path: uploadResult.secure_url, // Зберігаємо URL з Cloudinary
      contentPlanItem: contentItem,
    });

    return this.contentPlanFilesRepository.save(newFile);
  }

  private async calculateProgress(contentPlanId: string): Promise<ContentPlan> {
    const contentPlan = await this.contentPlansRepository.findOne({
      where: { id: contentPlanId },
      relations: ['items'],
    });

    if (!contentPlan) {
      throw new NotFoundException(`Content Plan with ID ${contentPlanId} not found`);
    }

    const totalItems = contentPlan.items.length;
    const completedItems = contentPlan.items.filter(item => item.status === ContentItemStatus.COMPLETED).length;

    contentPlan.completedPosts = contentPlan.items.filter(item => item.type === 'POST' && item.status === ContentItemStatus.COMPLETED).length;
    contentPlan.totalPosts = contentPlan.items.filter(item => item.type === 'POST').length;
    contentPlan.completedStories = contentPlan.items.filter(item => item.type === 'STORY' && item.status === ContentItemStatus.COMPLETED).length;
    contentPlan.totalStories = contentPlan.items.filter(item => item.type === 'STORY').length;

    contentPlan.progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

    return this.contentPlansRepository.save(contentPlan);
  }
}
