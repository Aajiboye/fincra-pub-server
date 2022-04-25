import 'dotenv/config';
import { extractValidationException } from '@fincra/common/functions/validate';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: extractValidationException,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('fincra Trip Services')
    .setDescription('fincra Trip Services Open API specification')
    .setVersion('0.1')
    .addTag('fincra')
    .addTag('Trip Services')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('open-api', app, document);

  await app.listen(process.env.HTTP_PORT);
}

bootstrap();
