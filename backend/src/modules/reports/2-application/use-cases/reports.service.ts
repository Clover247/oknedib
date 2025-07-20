import { Injectable } from '@nestjs/common';
import { AnalyticsService } from '@/modules/analytics/2-application/use-cases/analytics.service';
import * as ExcelJS from 'exceljs';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class ReportsService {
  constructor(private readonly analyticsService: AnalyticsService) {}

  async generateProjectReport() {
    return this.analyticsService.getProjectAnalytics();
  }

  async generateFinancialReport(startDate?: Date, endDate?: Date) {
    return this.analyticsService.getFinancialAnalytics(startDate, endDate);
  }

  async generatePerformanceReport() {
    return this.analyticsService.getSpecialistAnalytics();
  }

  async exportToExcel(data: any, reportName: string): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(reportName);

    // Додаємо заголовки
    const headers = Object.keys(data[0]);
    worksheet.addRow(headers);

    // Додаємо дані
    data.forEach(item => {
      worksheet.addRow(Object.values(item));
    });

    return workbook.xlsx.writeBuffer() as Promise<Buffer>;
  }

  async exportToPDF(data: any, reportName: string): Promise<Buffer> {
    return new Promise(resolve => {
      const doc = new PDFDocument();
      const buffers: Buffer[] = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      doc.fontSize(25).text(reportName, { align: 'center' });

      // Додаємо дані
      data.forEach(item => {
        doc.fontSize(12).text(JSON.stringify(item, null, 2));
      });

      doc.end();
    });
  }

  async exportToCSV(data: any, reportName: string): Promise<string> {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(item => Object.values(item).join(','));
    return `${headers}\n${rows.join('\n')}`;
  }
}
