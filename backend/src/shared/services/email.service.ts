
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private readonly resend: Resend;

  constructor(private configService: ConfigService) {
    this.resend = new Resend(this.configService.get('RESEND_API_KEY'));
  }

  async sendPaymentReminder(to: string, subject: string, content: string) {
    const from = this.configService.get('EMAIL_FROM');
    try {
      await this.resend.emails.send({
        from,
        to,
        subject,
        html: `<p>${content}</p>`,
      });
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
