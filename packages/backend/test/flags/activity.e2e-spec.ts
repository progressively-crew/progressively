import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { seedDb, cleanupDb } from '@progressively/database/seed';
import { prepareApp } from '../helpers/prepareApp';
import { verifyAuthGuard } from '../helpers/verify-auth-guard';
import { authenticate } from '../helpers/authenticate';

describe('FlagsController (e2e)', () => {
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

  describe('environments/1/flags/1/activity (GET)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/environments/1/flags/1/activity', 'get'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .get('/environments/3/flags/1/activity')
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
        .get('/environments/1/flags/1/activity')
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
        .get('/environments/1/flags/1/activity')
        .set('Authorization', `Bearer ${access_token}`);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject([
        {
          concernedEntity: 'flag',
          flagEnvironmentEnvironmentId: '1',
          flagEnvironmentFlagId: '1',
          type: 'create-additional-audience',
          userUuid: '1',
          utc: '2023-01-21T00:00:00.000Z',
          user: {
            fullname: 'Marvin Frachet',
          },
        },
        {
          concernedEntity: 'flag',
          flagEnvironmentEnvironmentId: '1',
          flagEnvironmentFlagId: '1',
          type: 'create-eligibility-restriction',
          userUuid: '1',
          utc: '2023-01-21T00:00:00.000Z',
          user: {
            fullname: 'Marvin Frachet',
          },
        },
        {
          concernedEntity: 'flag',
          data: 39,
          flagEnvironmentEnvironmentId: '1',
          flagEnvironmentFlagId: '1',
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
            flagEnvironmentFlagId: '4',
            flagEnvironmentEnvironmentId: '1',
          },
          flagEnvironmentEnvironmentId: '1',
          flagEnvironmentFlagId: '1',
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
            uuid: '543ef936-4399-4b98-89f2-c4b5f7cd86fc',
            name: 'New super metric',
            flagEnvironmentFlagId: '4',
            flagEnvironmentEnvironmentId: '1',
            variantUuid: null,
          },
          flagEnvironmentEnvironmentId: '1',
          flagEnvironmentFlagId: '1',
          type: 'create-metric',
          userUuid: '1',
          utc: '2023-01-21T00:00:00.000Z',
          user: {
            fullname: 'Marvin Frachet',
          },
        },
        {
          concernedEntity: 'flag',
          data: {
            uuid: 'c680494a-7545-4567-bd79-df016de141b0',
            type: 'UpdateVariantPercentage',
            data: [
              { variantId: '1', variantNewPercentage: 5 },
              { variantId: '2', variantNewPercentage: 60 },
              {
                variantId: '722200c6-6b1c-4926-9d56-e39b9d97ce83',
                variantNewPercentage: 35,
              },
            ],
            utc: '2023-01-29T23:00:00.000Z',
            status: 'ACTIVATED',
            schedulingStatus: 'NOT_RUN',
            flagEnvironmentFlagId: '4',
            flagEnvironmentEnvironmentId: '1',
          },
          flagEnvironmentEnvironmentId: '1',
          flagEnvironmentFlagId: '1',
          type: 'create-scheduling',
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
            flagEnvironmentFlagId: '4',
            flagEnvironmentEnvironmentId: '1',
          },
          flagEnvironmentEnvironmentId: '1',
          flagEnvironmentFlagId: '1',
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
