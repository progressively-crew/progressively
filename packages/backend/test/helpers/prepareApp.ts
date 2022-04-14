import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { WsAdapter } from '@nestjs/platform-ws';
import { MailService } from '../../src/mail/mail.service';
import { AppModule } from '../../src/app.module';

export const prepareApp = async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
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
  app.useWebSocketAdapter(new WsAdapter(app));
  await app.init();

  return app;
};
