import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const configService = app.get(ConfigService);
  console.log(`Attempting to connect to database: ${configService.get('DB_DATABASE')}`);
  await app.listen(3000);
}
bootstrap();
