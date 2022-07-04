import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { seedDb, cleanupDb } from '../helpers/seed';
import { prepareApp } from '../helpers/prepareApp';
import { verifyAuthGuard } from '../helpers/verify-auth-guard';
import { authenticate } from '../helpers/authenticate';

describe('AbController (e2e)', () => {
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

  describe('experiments/1 (GET)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/experiments/1', 'get'));

    it('gives a 403 when trying to access an invalid experiment', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .get('/experiments/2')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives the experiment when everything is fine', async () => {
      const access_token = await authenticate(app);

      const response = await request(app.getHttpServer())
        .get('/experiments/1')
        .set('Authorization', `Bearer ${access_token}`);

      expect(response.status).toBe(200);
      expect(response.body.uuid).toBe('1');
      expect(response.body.name).toBe('New homepage experiment');
      expect(response.body.key).toBe('newHomepageExperiment');

      expect(response.body.createdAt).toBeDefined();
      expect(response.body.variants).toMatchObject([
        {
          uuid: '1',
          key: 'control',
          name: 'Control variant for home',
          description: 'Controls the homepage variant',
          experimentUuid: '1',
        },
        {
          uuid: '2',
          key: 'alternative',
          name: 'Alternative homepage',
          description: 'Alternative homepage',
          experimentUuid: '1',
        },
      ]);
    });
  });
});
