import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { seedDb, cleanupDb } from '@progressively/database/seed';
import { authenticate } from '../helpers/authenticate';
import { verifyAuthGuard } from '../helpers/verify-auth-guard';
import { prepareApp } from '../helpers/prepareApp';

describe('Segment (e2e)', () => {
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

  describe('/segments/1 (GET)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/segments/1', 'get'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .get('/segments/3')
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
        .get('/segments/1')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives the segment when the user is authenticated and authorized', async () => {
      const access_token = await authenticate(app);

      const response = await request(app.getHttpServer())
        .get('/segments/1')
        .set('Authorization', `Bearer ${access_token}`);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        flagEnvironmentEnvironmentId: '1',
        flagEnvironmentFlagId: '1',
        name: 'By email address',
        rule: [
          {
            fieldComparator: 'eq',
            fieldName: 'email',
            fieldValue: 'gmail.com',
            segmentUuid: '1',
          },
        ],
        uuid: '1',
      });
    });
  });

  describe('/segments/1 (Put)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/segments/1', 'put'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);
      const updateDto = {
        name: 'new name',
      };

      return request(app.getHttpServer())
        .put('/segments/3')
        .set('Authorization', `Bearer ${access_token}`)
        .send(updateDto)
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

      const updateDto = {
        name: 'new name',
      };

      return request(app.getHttpServer())
        .put('/segments/1')
        .set('Authorization', `Bearer ${access_token}`)
        .send(updateDto)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it(`gives 400 when "name" is invalid`, async () => {
      const access_token = await authenticate(app);

      await request(app.getHttpServer())
        .put('/segments/1')
        .set('Authorization', `Bearer ${access_token}`)
        .send({})
        .expect(400)
        .expect({
          statusCode: 400,
          message: 'Validation failed',
          error: 'Bad Request',
        });
    });

    it('updates an segment', async () => {
      const access_token = await authenticate(app);

      const updateDto = {
        name: 'new name',
      };

      const response = await request(app.getHttpServer())
        .put('/segments/1')
        .set('Authorization', `Bearer ${access_token}`)
        .send(updateDto)
        .expect(200);

      expect(response.body).toEqual({
        flagEnvironmentEnvironmentId: '1',
        flagEnvironmentFlagId: '1',
        name: 'new name',
        uuid: '1',
      });
    });
  });
});
