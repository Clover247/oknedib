"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBudgetHistoryDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_budget_history_dto_1 = require("./create-budget-history.dto");
class UpdateBudgetHistoryDto extends (0, mapped_types_1.PartialType)(create_budget_history_dto_1.CreateBudgetHistoryDto) {
}
exports.UpdateBudgetHistoryDto = UpdateBudgetHistoryDto;
//# sourceMappingURL=update-budget-history.dto.js.map