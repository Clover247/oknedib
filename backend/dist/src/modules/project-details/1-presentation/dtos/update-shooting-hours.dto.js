"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateShootingHoursDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_shooting_hours_dto_1 = require("./create-shooting-hours.dto");
class UpdateShootingHoursDto extends (0, mapped_types_1.PartialType)(create_shooting_hours_dto_1.CreateShootingHoursDto) {
}
exports.UpdateShootingHoursDto = UpdateShootingHoursDto;
//# sourceMappingURL=update-shooting-hours.dto.js.map