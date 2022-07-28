import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { WsAdapter } from '@nestjs/platform-ws';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true,
    origin: true,
  });

  // Logging
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  // Middlewares
  app.use(helmet());
  app.use(cookieParser());
  app.useWebSocketAdapter(new WsAdapter(app));

  const config = new DocumentBuilder()
    .setTitle('Progressively API')
    .setDescription(
      'The Progressively API description. In order to generate a Bearer token, you can get the headers of an authenticated user OR run "npm run gen:bearer" at the root of the backend project.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(4000);
}
bootstrap();
