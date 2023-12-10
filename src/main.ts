import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get('node.port');

  const config = new DocumentBuilder()
    .setTitle('NNN restaurant backend entry point')
    .setDescription('REST API documentation')
    .setVersion('1.0.0')
    .addTag('NNN restaurant')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(port, () =>
    console.log(`Server is running on port ${port}`),
  );
}

bootstrap();
