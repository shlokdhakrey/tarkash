import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import compression from 'compression';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const configService = app.get(ConfigService);
  const port = configService.get('API_PORT') || 4000;
  const corsOrigin = configService.get('CORS_ORIGIN') || 'http://localhost:3000';

  // Security
  app.use(helmet());
  app.use(compression());

  // CORS
  app.enableCors({
    origin: corsOrigin.split(','),
    credentials: true,
  });

  // Global prefix
  app.setGlobalPrefix('api');

  // Versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  // Global filters
  app.useGlobalFilters(new HttpExceptionFilter());

  // Global interceptors
  app.useGlobalInterceptors(new LoggingInterceptor(), new TransformInterceptor());

  // Swagger API documentation
  const config = new DocumentBuilder()
    .setTitle('InnovateX 2025 API')
    .setDescription('Hackathon Management Platform API Documentation')
    .setVersion('1.0')
    .setContact(
      'InnovateX Team',
      'https://innovatex2025.edu',
      'support@innovatex2025.edu'
    )
    .addTag('Auth', 'Authentication endpoints')
    .addTag('Teams', 'Team management')
    .addTag('Submissions', 'Project submissions')
    .addTag('Judges', 'Judging & scoring')
    .addTag('Admin', 'Admin operations')
    .addTag('Sponsors', 'Sponsor management')
    .addTag('Timeline', 'Event timeline')
    .addTag('FAQ', 'Frequently asked questions')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth'
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'InnovateX 2025 API Docs',
    customfavIcon: 'https://nestjs.com/img/logo-small.svg',
    customCss: '.swagger-ui .topbar { display: none }',
  });

  await app.listen(port);

  console.log(`
    🚀 InnovateX 2025 API Server Started!
    
    ⚡ Environment: ${configService.get('NODE_ENV')}
    🌐 Server: http://localhost:${port}
    📚 API Docs: http://localhost:${port}/api/docs
    🔐 CORS: ${corsOrigin}
    
    📊 Health: http://localhost:${port}/api/health
  `);
}

bootstrap();
