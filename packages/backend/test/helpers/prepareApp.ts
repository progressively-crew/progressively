import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import fastifyCookie from '@fastify/cookie';
import { WsAdapter } from '@nestjs/platform-ws';
import { MailService } from '../../src/mail/mail.service';
import { AppModule } from '../../src/app.module';
import { TestLogger } from './TestLogger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

export const prepareApp = async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .setLogger(new TestLogger())
    .overrideProvider(MailService)
    .useValue({
      sendRegistrationMail: async (
        fullname: string,
        to: string,
        activationToken: string,
      ) => {
        await request(app.getHttpServer()).get(
          `/users/activate/${activationToken}`,
        );
      },
      sendResetPasswordMail: () => Promise.resolve(),
    })
    .compile();

  const app = moduleFixture.createNestApplication<NestFastifyApplication>(
    new FastifyAdapter(),
  );

  app.useWebSocketAdapter(new WsAdapter(app));
  await app.register(fastifyCookie, {
    secret: 'my-secret', // for cookies signature
  });

  await app.init();
  await app.getHttpAdapter().getInstance().ready();

  return app;
};
