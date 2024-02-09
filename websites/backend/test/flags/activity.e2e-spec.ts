import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { seedDb, cleanupDb } from '@progressively/database/seed';
import { prepareApp } from '../helpers/prepareApp';
import { verifyAuthGuard } from '../helpers/verify-auth-guard';
import { authenticate } from '../helpers/authenticate';

describe('ActivityController (e2e)', () => {
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
    jest.resetAllMocks();
    await cleanupDb();
  });

  describe('/flags/1/activity (GET)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/flags/1/activity', 'get'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .get('/flags/3/activity')
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
        .get('/flags/1/activity')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives the list of activities', async () => {
      const access_token = await authenticate(app);

      const res = await request(app.getHttpServer())
        .get('/flags/1/activity')
        .set('Authorization', `Bearer ${access_token}`);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject([
        {
          concernedEntity: 'flag',
          data: 39,
          flagUuid: '1',
          type: 'change-flag-percentage',
          userUuid: '1',
          utc: '2023-01-21T00:00:00.000Z',
          user: {
            fullname: 'Marvin Frachet',
          },
        },
        {
          concernedEntity: 'flag',
          data: {
            uuid: '0da72f86-1675-4567-9be7-d58a07728728',
            endpoint: 'https://hello-world.api',
            secret: 'FjB_C7iQDiI9adbAxKNOF',
            event: 'ACTIVATION',
          },
          flagUuid: '1',
          type: 'create-webhook',
          userUuid: '1',
          utc: '2023-01-21T00:00:00.000Z',
          user: {
            fullname: 'Marvin Frachet',
          },
        },
        {
          concernedEntity: 'flag',
          data: {
            uuid: '722200c6-6b1c-4926-9d56-e39b9d97ce83',
            rolloutPercentage: 0,
            isControl: false,
            value: 'Hello world',
          },
          flagUuid: '1',
          type: 'create-variant',
          userUuid: '1',
          utc: '2023-01-21T00:00:00.000Z',
          user: {
            fullname: 'Marvin Frachet',
          },
        },
      ]);
    });
  });
});
