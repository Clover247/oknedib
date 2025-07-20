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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const comment_entity_1 = require("../../3-domain/entities/comment.entity");
const project_entity_1 = require("../../../projects/3-domain/entities/project.entity");
const user_entity_1 = require("../../../users/3-domain/entities/user.entity");
const task_entity_1 = require("../../../tasks/3-domain/entities/task.entity");
const typeorm_2 = require("typeorm");
let CommentsService = class CommentsService {
    constructor(commentsRepository, projectsRepository, usersRepository, tasksRepository) {
        this.commentsRepository = commentsRepository;
        this.projectsRepository = projectsRepository;
        this.usersRepository = usersRepository;
        this.tasksRepository = tasksRepository;
    }
    async create(createCommentDto) {
        const project = await this.projectsRepository.findOneBy({ id: createCommentDto.projectId });
        if (!project) {
            throw new common_1.NotFoundException(`Project with ID ${createCommentDto.projectId} not found`);
        }
        const author = await this.usersRepository.findOneBy({ id: createCommentDto.authorId });
        if (!author) {
            throw new common_1.NotFoundException(`Author with ID ${createCommentDto.authorId} not found`);
        }
        const comment = this.commentsRepository.create({
            ...createCommentDto,
            project,
            author,
        });
        return this.commentsRepository.save(comment);
    }
    async findAll(projectId) {
        return this.commentsRepository.find({ where: { projectId }, relations: ['author'], order: { createdAt: 'ASC' } });
    }
    async findOne(id) {
        const comment = await this.commentsRepository.findOne({ where: { id }, relations: ['author'] });
        if (!comment) {
            throw new common_1.NotFoundException(`Comment with ID ${id} not found`);
        }
        return comment;
    }
    async update(id, updateCommentDto) {
        const comment = await this.commentsRepository.preload({
            id: id,
            ...updateCommentDto,
        });
        if (!comment) {
            throw new common_1.NotFoundException(`Comment with ID ${id} not found`);
        }
        return this.commentsRepository.save(comment);
    }
    async remove(id) {
        const result = await this.commentsRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Comment with ID ${id} not found`);
        }
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __param(1, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CommentsService);
//# sourceMappingURL=comments.service.js.map