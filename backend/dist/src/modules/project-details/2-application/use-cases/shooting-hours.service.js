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
exports.ShootingHoursService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const shooting_hours_entity_1 = require("../../3-domain/entities/shooting-hours.entity");
const project_entity_1 = require("../../../projects/3-domain/entities/project.entity");
const typeorm_2 = require("typeorm");
let ShootingHoursService = class ShootingHoursService {
    constructor(shootingHoursRepository, projectsRepository) {
        this.shootingHoursRepository = shootingHoursRepository;
        this.projectsRepository = projectsRepository;
    }
    async create(createShootingHoursDto) {
        const project = await this.projectsRepository.findOneBy({ id: createShootingHoursDto.projectId });
        if (!project) {
            throw new common_1.NotFoundException(`Project with ID ${createShootingHoursDto.projectId} not found`);
        }
        const shootingHours = this.shootingHoursRepository.create({
            ...createShootingHoursDto,
            project,
        });
        return this.shootingHoursRepository.save(shootingHours);
    }
    async findAll(projectId) {
        return this.shootingHoursRepository.find({ where: { projectId }, order: { date: 'ASC' } });
    }
    async findOne(id) {
        const hours = await this.shootingHoursRepository.findOneBy({ id });
        if (!hours) {
            throw new common_1.NotFoundException(`Shooting Hours with ID ${id} not found`);
        }
        return hours;
    }
    async update(id, updateShootingHoursDto) {
        const hours = await this.shootingHoursRepository.preload({
            id: id,
            ...updateShootingHoursDto,
        });
        if (!hours) {
            throw new common_1.NotFoundException(`Shooting Hours with ID ${id} not found`);
        }
        return this.shootingHoursRepository.save(hours);
    }
    async remove(id) {
        const result = await this.shootingHoursRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Shooting Hours with ID ${id} not found`);
        }
    }
};
exports.ShootingHoursService = ShootingHoursService;
exports.ShootingHoursService = ShootingHoursService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(shooting_hours_entity_1.ShootingHours)),
    __param(1, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ShootingHoursService);
//# sourceMappingURL=shooting-hours.service.js.map