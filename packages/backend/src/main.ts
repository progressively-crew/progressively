import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { WsAdapter } from '@nestjs/platform-ws';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ maxParamLength: 3000 }),
  );

  app.enableCors({
    credentials: true,
    origin: true,
  });

  // Logging
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  // Middlewares
  app.use(helmet());
  app.useWebSocketAdapter(new WsAdapter(app));
  await app.register(fastifyCookie, {
    secret: process.env.COOKIE_TOKEN,
  });

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
