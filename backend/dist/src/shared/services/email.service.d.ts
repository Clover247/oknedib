import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private configService;
    private readonly resend;
    constructor(configService: ConfigService);
    sendPaymentReminder(to: string, subject: string, content: string): Promise<void>;
}
