import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
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
  await app.init();

  return app;
};
