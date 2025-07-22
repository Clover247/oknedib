"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./3-domain/entities/user.entity");
const users_controller_1 = require("./1-presentation/controllers/users.controller");
const users_service_1 = require("./2-application/users.service");
const profile_controller_1 = require("./1-presentation/controllers/profile.controller");
const profile_service_1 = require("./2-application/profile.service");
const shared_module_1 = require("../../shared/shared.module");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]), shared_module_1.SharedModule],
        controllers: [users_controller_1.UsersController, profile_controller_1.ProfileController],
        providers: [users_service_1.UsersService, profile_service_1.ProfileService],
        exports: [typeorm_1.TypeOrmModule, users_service_1.UsersService],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map