import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';
import { CustomLoggerService } from './logger/logger.service';

const env = config();
const PORT = Number(env.parsed.PORT) || 4000;
const LOG_LEVEL: number = Number(env.parsed.LOG_LEVEL) || 1;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const customLoggerService = new CustomLoggerService(LOG_LEVEL);

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('1.0.0')
    .addTag('music')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useLogger(customLoggerService);
  await app.listen(PORT);
}

bootstrap();
