"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentPlansService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const content_plan_entity_1 = require("../../3-domain/entities/content-plan.entity");
const content_plan_item_entity_1 = require("../../3-domain/entities/content-plan-item.entity");
const content_plan_file_entity_1 = require("../../3-domain/entities/content-plan-file.entity");
const project_entity_1 = require("../../../projects/3-domain/entities/project.entity");
const user_entity_1 = require("../../../users/3-domain/entities/user.entity");
const typeorm_2 = require("typeorm");
const cloudinary_service_1 = require("../../../../shared/services/cloudinary.service");
let ContentPlansService = class ContentPlansService {
    constructor(contentPlansRepository, contentPlanItemsRepository, contentPlanFilesRepository, projectsRepository, usersRepository, cloudinaryService) {
        this.contentPlansRepository = contentPlansRepository;
        this.contentPlanItemsRepository = contentPlanItemsRepository;
        this.contentPlanFilesRepository = contentPlanFilesRepository;
        this.projectsRepository = projectsRepository;
        this.usersRepository = usersRepository;
        this.cloudinaryService = cloudinaryService;
    }
    async create(createContentPlanDto) {
        const project = await this.projectsRepository.findOneBy({ id: createContentPlanDto.projectId });
        if (!project) {
            throw new common_1.NotFoundException(`Project with ID ${createContentPlanDto.projectId} not found`);
        }
        const contentPlan = this.contentPlansRepository.create({
            ...createContentPlanDto,
            project,
        });
        const savedContentPlan = await this.contentPlansRepository.save(contentPlan);
        if (createContentPlanDto.items && createContentPlanDto.items.length > 0) {
            const assignees = await this.usersRepository.findBy({ id: (0, typeorm_2.In)(createContentPlanDto.items.map(item => item.assigneeId)) });
            if (assignees.length !== createContentPlanDto.items.length) {
                throw new common_1.BadRequestException('One or more assignees not found');
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
    async findAll() {
        return this.contentPlansRepository.find({ relations: ['project', 'items', 'items.assignee'] });
    }
    async findOne(id) {
        const contentPlan = await this.contentPlansRepository.findOne({
            where: { id },
            relations: ['project', 'items', 'items.assignee'],
        });
        if (!contentPlan) {
            throw new common_1.NotFoundException(`Content Plan with ID ${id} not found`);
        }
        return contentPlan;
    }
    async update(id, updateContentPlanDto) {
        const contentPlan = await this.contentPlansRepository.findOne({ where: { id } });
        if (!contentPlan) {
            throw new common_1.NotFoundException(`Content Plan with ID ${id} not found`);
        }
        Object.assign(contentPlan, updateContentPlanDto);
        if (updateContentPlanDto.items) {
            const existingItems = await this.contentPlanItemsRepository.find({ where: { contentPlan: { id } } });
            const itemsToUpdate = [];
            const itemsToCreate = [];
            const itemsToDelete = existingItems.filter(item => !updateContentPlanDto.items.some(updateItem => updateItem.id === item.id));
            for (const itemDto of updateContentPlanDto.items) {
                if (itemDto.id) {
                    const existingItem = existingItems.find(item => item.id === itemDto.id);
                    if (existingItem) {
                        if (itemDto.assigneeId) {
                            const assignee = await this.usersRepository.findOneBy({ id: itemDto.assigneeId });
                            if (!assignee)
                                throw new common_1.NotFoundException(`Assignee with ID ${itemDto.assigneeId} not found`);
                            existingItem.assignee = assignee;
                        }
                        Object.assign(existingItem, itemDto);
                        itemsToUpdate.push(existingItem);
                    }
                }
                else {
                    const assignee = await this.usersRepository.findOneBy({ id: itemDto.assigneeId });
                    if (!assignee)
                        throw new common_1.NotFoundException(`Assignee with ID ${itemDto.assigneeId} not found`);
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
    async remove(id) {
        const result = await this.contentPlansRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Content Plan with ID ${id} not found`);
        }
    }
    async addFileToContentItem(itemId, file) {
        const contentItem = await this.contentPlanItemsRepository.findOneBy({ id: itemId });
        if (!contentItem) {
            throw new common_1.NotFoundException(`Content Plan Item with ID ${itemId} not found`);
        }
        const uploadResult = await this.cloudinaryService.uploadStream(file);
        const newFile = this.contentPlanFilesRepository.create({
            originalName: file.originalname,
            mimeType: file.mimetype,
            path: uploadResult.secure_url,
            contentPlanItem: contentItem,
        });
        return this.contentPlanFilesRepository.save(newFile);
    }
    async calculateProgress(contentPlanId) {
        const contentPlan = await this.contentPlansRepository.findOne({
            where: { id: contentPlanId },
            relations: ['items'],
        });
        if (!contentPlan) {
            throw new common_1.NotFoundException(`Content Plan with ID ${contentPlanId} not found`);
        }
        const totalItems = contentPlan.items.length;
        const completedItems = contentPlan.items.filter(item => item.status === content_plan_item_entity_1.ContentItemStatus.COMPLETED).length;
        contentPlan.completedPosts = contentPlan.items.filter(item => item.type === 'POST' && item.status === content_plan_item_entity_1.ContentItemStatus.COMPLETED).length;
        contentPlan.totalPosts = contentPlan.items.filter(item => item.type === 'POST').length;
        contentPlan.completedStories = contentPlan.items.filter(item => item.type === 'STORY' && item.status === content_plan_item_entity_1.ContentItemStatus.COMPLETED).length;
        contentPlan.totalStories = contentPlan.items.filter(item => item.type === 'STORY').length;
        contentPlan.progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
        return this.contentPlansRepository.save(contentPlan);
    }
};
exports.ContentPlansService = ContentPlansService;
exports.ContentPlansService = ContentPlansService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(content_plan_entity_1.ContentPlan)),
    __param(1, (0, typeorm_1.InjectRepository)(content_plan_item_entity_1.ContentPlanItem)),
    __param(2, (0, typeorm_1.InjectRepository)(content_plan_file_entity_1.ContentPlanFile)),
    __param(3, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __param(4, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        cloudinary_service_1.CloudinaryService])
], ContentPlansService);
//# sourceMappingURL=content-plans.service.js.map