
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryProvider } from './providers/cloudinary.provider';
import { CloudinaryService } from './services/cloudinary.service';
import { EmailService } from './services/email.service';

@Module({
  imports: [ConfigModule], // ConfigModule потрібен для сервісів
  providers: [CloudinaryProvider, CloudinaryService, EmailService],
  exports: [CloudinaryProvider, CloudinaryService, EmailService],
})
export class SharedModule {}
