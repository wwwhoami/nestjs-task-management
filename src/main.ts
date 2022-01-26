import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transfrom.interceptor';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  const port = 3000;

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  const config = new DocumentBuilder()
    .setTitle('nestjs-task-management')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('tasks')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
}
bootstrap();
