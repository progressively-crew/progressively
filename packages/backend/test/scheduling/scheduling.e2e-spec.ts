import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { seedDb, cleanupDb } from '@progressively/database/seed';
import { authenticate } from '../helpers/authenticate';
import { verifyAuthGuard } from '../helpers/verify-auth-guard';
import { prepareApp } from '../helpers/prepareApp';

describe('Scheduling (e2e)', () => {
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

  describe('/scheduling/1 (DELETE)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/scheduling/1', 'delete'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .delete('/scheduling/3')
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
        .delete('/scheduling/1')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives a 200 when a user of the project deletes a schedule', async () => {
      const access_token = await authenticate(app);

      const result = await request(app.getHttpServer())
        .delete('/scheduling/1')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(200);

      expect(result.body).toMatchObject({
        uuid: '1',
        type: 'UpdatePercentage',
        data: { rolloutPercentage: 100 },
        status: 'ACTIVATED',
        schedulingStatus: 'NOT_RUN',
        flagEnvironmentFlagId: '1',
        flagEnvironmentEnvironmentId: '1',
      });
    });
  });

  describe('/environments/:envId/flags/:flagId/scheduling (POST)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/environments/1/flags/1/scheduling', 'post'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .post('/environments/1/flags/3/scheduling')
        .set('Authorization', `Bearer ${access_token}`)
        .send({})
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
        .post('/environments/1/flags/1/scheduling')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          fieldName: 'email',
          fieldComparator: 'eq',
          fieldValue: 'marvin.frachet@something.com\njohn.doe@gmail.com',
        })
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives 400 when the scheduling has a wrong utc', async () => {
      const access_token = await authenticate(app);

      const invalidScheduling: any = {
        utc: 'invalid date',
        status: 'Activated',
        rolloutPercentage: 12,
      };

      await request(app.getHttpServer())
        .post('/environments/1/flags/1/scheduling')
        .set('Authorization', `Bearer ${access_token}`)
        .send(invalidScheduling)
        .expect(400)
        .expect({
          statusCode: 400,
          message: 'Validation failed',
          error: 'Bad Request',
        });
    });

    it('gives 400 when the scheduling has a wrong status', async () => {
      const access_token = await authenticate(app);

      const invalidScheduling: any = {
        utc: new Date('1992-06-21'),
        status: 'INVALID_STATUS',
        rolloutPercentage: 12,
      };

      await request(app.getHttpServer())
        .post('/environments/1/flags/1/scheduling')
        .set('Authorization', `Bearer ${access_token}`)
        .send(invalidScheduling)
        .expect(400)
        .expect({
          statusCode: 400,
          message: 'Validation failed',
          error: 'Bad Request',
        });
    });

    it('gives 400 when the scheduling has a wrong type', async () => {
      const access_token = await authenticate(app);

      const invalidScheduling: any = {
        utc: new Date('1992-06-21'),
        status: 'ACTIVATED',
        type: 'Invalid type',
        data: {
          rolloutPercentage: 100,
        },
      };

      await request(app.getHttpServer())
        .post('/environments/1/flags/1/scheduling')
        .set('Authorization', `Bearer ${access_token}`)
        .send(invalidScheduling)
        .expect(400)
        .expect({
          statusCode: 400,
          message: 'Validation failed',
          error: 'Bad Request',
        });
    });

    it('gives 400 when the scheduling has a wrong data object', async () => {
      const access_token = await authenticate(app);

      const invalidScheduling: any = {
        utc: new Date('1992-06-21'),
        status: 'ACTIVATED',
        type: 'UpdatePercentage',
        data: {
          invalidData: 100,
        },
      };

      await request(app.getHttpServer())
        .post('/environments/1/flags/1/scheduling')
        .set('Authorization', `Bearer ${access_token}`)
        .send(invalidScheduling)
        .expect(400)
        .expect({
          statusCode: 400,
          message: 'Validation failed',
          error: 'Bad Request',
        });
    });

    it('creates a scheduling for a single variant flag', async () => {
      const access_token = await authenticate(app);

      const validScheduling: any = {
        utc: new Date('1992-06-21'),
        status: 'ACTIVATED',
        type: 'UpdatePercentage',
        data: {
          rolloutPercentage: 100,
        },
      };

      const response = await request(app.getHttpServer())
        .post('/environments/1/flags/1/scheduling')
        .set('Authorization', `Bearer ${access_token}`)
        .send(validScheduling)
        .expect(201);

      expect(response.body).toMatchObject({
        status: 'ACTIVATED',
        utc: '1992-06-21T00:00:00.000Z',
      });
    });

    it('gives 400 when the scheduling has a wrong data object for ', async () => {
      const access_token = await authenticate(app);

      const invalidScheduling: any = {
        utc: new Date('1992-06-21'),
        status: 'ACTIVATED',
        type: 'UpdateVariantPercentage',
        data: {
          invalidData: 100,
        },
      };

      await request(app.getHttpServer())
        .post('/environments/1/flags/1/scheduling')
        .set('Authorization', `Bearer ${access_token}`)
        .send(invalidScheduling)
        .expect(400)
        .expect({
          statusCode: 400,
          message: 'Validation failed',
          error: 'Bad Request',
        });
    });
  });

  describe('/environments/1/flags/1/scheduling (GET)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/environments/1/flags/1/scheduling', 'get'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .get('/environments/1/flags/3/scheduling')
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
        .get('/environments/1/flags/1/scheduling')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives the scheduling information when the user is authenticated and authorized', async () => {
      const access_token = await authenticate(app);

      const response = await request(app.getHttpServer())
        .get('/environments/1/flags/1/scheduling')
        .set('Authorization', `Bearer ${access_token}`);

      const schedule = response.body[0];

      expect(response.status).toBe(200);
      expect(schedule.flagEnvironmentFlagId).toBe('1');
      expect(schedule.flagEnvironmentEnvironmentId).toBe('1');
      expect(schedule.utc).toBeDefined();
      expect(schedule.uuid).toBeDefined();
    });
  });
});
