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
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const project_entity_1 = require("../../3-domain/entities/project.entity");
const user_entity_1 = require("../../../users/3-domain/entities/user.entity");
const shooting_hours_entity_1 = require("../../../project-details/3-domain/entities/shooting-hours.entity");
const typeorm_2 = require("typeorm");
let ProjectsService = class ProjectsService {
    constructor(projectsRepository, usersRepository, shootingHoursRepository) {
        this.projectsRepository = projectsRepository;
        this.usersRepository = usersRepository;
        this.shootingHoursRepository = shootingHoursRepository;
    }
    async create(createProjectDto) {
        const { managerId, specialistIds, contentMakerIds, shootingHours, ...projectData } = createProjectDto;
        const project = this.projectsRepository.create(projectData);
        if (managerId) {
            const manager = await this.usersRepository.findOneBy({ id: managerId });
            if (!manager) {
                throw new common_1.NotFoundException(`Manager with ID ${managerId} not found`);
            }
            project.manager = manager;
        }
        if (specialistIds && specialistIds.length > 0) {
            project.specialists = await this.usersRepository.findBy({ id: (0, typeorm_2.In)(specialistIds) });
        }
        if (contentMakerIds && contentMakerIds.length > 0) {
            project.contentMakers = await this.usersRepository.findBy({ id: (0, typeorm_2.In)(contentMakerIds) });
        }
        const savedProject = await this.projectsRepository.save(project);
        if (shootingHours) {
            const shootingHoursEntity = this.shootingHoursRepository.create({
                plannedHours: shootingHours,
                project: savedProject,
            });
            await this.shootingHoursRepository.save(shootingHoursEntity);
        }
        return savedProject;
    }
    async findAll() {
        return this.projectsRepository.find({
            relations: ['manager', 'specialists', 'contentMakers'],
        });
    }
    async findOne(id) {
        const project = await this.projectsRepository.findOne({
            where: { id },
            relations: ['manager', 'specialists', 'contentMakers'],
        });
        if (!project) {
            throw new common_1.NotFoundException(`Project with ID ${id} not found`);
        }
        return project;
    }
    async update(id, updateProjectDto) {
        const project = await this.projectsRepository.findOne({ where: { id } });
        if (!project) {
            throw new common_1.NotFoundException(`Project with ID ${id} not found`);
        }
        if (updateProjectDto.managerId) {
            const manager = await this.usersRepository.findOneBy({ id: updateProjectDto.managerId });
            if (!manager) {
                throw new common_1.NotFoundException(`Manager with ID ${updateProjectDto.managerId} not found`);
            }
            project.manager = manager;
        }
        if (updateProjectDto.specialistIds) {
            project.specialists = await this.usersRepository.findBy({ id: (0, typeorm_2.In)(updateProjectDto.specialistIds) });
        }
        if (updateProjectDto.contentMakerIds) {
            project.contentMakers = await this.usersRepository.findBy({ id: (0, typeorm_2.In)(updateProjectDto.contentMakerIds) });
        }
        Object.assign(project, updateProjectDto);
        return this.projectsRepository.save(project);
    }
    async remove(id) {
        const result = await this.projectsRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Project with ID ${id} not found`);
        }
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(shooting_hours_entity_1.ShootingHours)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map