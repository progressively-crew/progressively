import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { seedDb, cleanupDb } from '../helpers/seed';
import { authenticate } from '../helpers/authenticate';
import { verifyAuthGuard } from '../helpers/verify-auth-guard';
import { prepareApp } from '../helpers/prepareApp';

describe('Webhooks (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await prepareApp();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await seedDb();
  });

  afterEach(async () => {
    await cleanupDb();
  });

  describe('/webhooks/1 (DELETE)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/webhooks/1', 'delete'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .delete('/webhooks/3')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives a 403 when the user requests a forbidden project', async () => {
      const access_token = await authenticate(
        app,
        'jane.doe@gmail.com',
        'password',
      );

      return request(app.getHttpServer())
        .delete('/webhooks/1')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives a 200 when a user of the project deletes a webhooks', async () => {
      const access_token = await authenticate(app);

      const result = await request(app.getHttpServer())
        .delete('/webhooks/1')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(200);

      expect(result.body).toMatchObject({
        uuid: '1',
        endpoint: 'http://localhost:4000',
        secret: 'this is secret',
        event: 'ACTIVATION',
        flagEnvironmentFlagId: '1',
        flagEnvironmentEnvironmentId: '1',
      });
    });
  });
});
