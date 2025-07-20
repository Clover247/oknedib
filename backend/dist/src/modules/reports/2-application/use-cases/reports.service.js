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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const analytics_service_1 = require("../../../analytics/2-application/use-cases/analytics.service");
let ReportsService = class ReportsService {
    constructor(analyticsService) {
        this.analyticsService = analyticsService;
    }
    async generateProjectReport() {
        return this.analyticsService.getProjectAnalytics();
    }
    async generateFinancialReport(startDate, endDate) {
        return this.analyticsService.getFinancialAnalytics(startDate, endDate);
    }
    async generatePerformanceReport() {
        return this.analyticsService.getSpecialistAnalytics();
    }
    async exportToExcel(data, reportName) {
        return `Exporting ${reportName} to Excel`;
    }
    async exportToPDF(data, reportName) {
        return `Exporting ${reportName} to PDF`;
    }
    async exportToCSV(data, reportName) {
        return `Exporting ${reportName} to CSV`;
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [analytics_service_1.AnalyticsService])
], ReportsService);
//# sourceMappingURL=reports.service.js.map