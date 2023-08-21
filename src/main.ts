import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';
import { Request, Response } from 'express';
import { CustomLoggerService } from './logger/logger.service';

const env = config();
const PORT = Number(env.parsed.PORT) || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('1.0.0')
    .addTag('music')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use((request: Request, response: Response, next) => {
    const customLoggerService = new CustomLoggerService();
    app.useLogger(customLoggerService);

    response.on('finish', () => {
      customLoggerService.log(
        '',
        request,
        response,
        request.query,
        request.body,
      );
    });

    next();
  });

  await app.listen(PORT);
}

bootstrap();
