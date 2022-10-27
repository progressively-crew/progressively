import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import * as cookieParser from 'cookie-parser';
import { WsAdapter } from '@nestjs/platform-ws';
import { MailService } from '../../src/mail/mail.service';
import { AppModule } from '../../src/app.module';
import { TestLogger } from './TestLogger';

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

  const app = moduleFixture.createNestApplication();
  app.use(cookieParser());
  app.useWebSocketAdapter(new WsAdapter(app));
  await app.init();

  return app;
};
