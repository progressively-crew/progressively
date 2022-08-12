import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { seedDb, cleanupDb } from '../helpers/seed';
import { authenticate } from '../helpers/authenticate';
import { verifyAuthGuard } from '../helpers/verify-auth-guard';
import { prepareApp } from '../helpers/prepareApp';

describe('Strategy (e2e)', () => {
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

  describe('/strategies/1 (GET)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/strategies/1', 'get'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .get('/strategies/3')
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
        .get('/strategies/1')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives the strategy when the user is authenticated and authorized', async () => {
      const access_token = await authenticate(app);

      const response = await request(app.getHttpServer())
        .get('/strategies/1')
        .set('Authorization', `Bearer ${access_token}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        fieldComparator: null,
        fieldName: null,
        fieldValue: null,
        flagEnvironmentEnvironmentId: '1',
        flagEnvironmentFlagId: '1',
        name: 'Super strategy',
        rolloutPercentage: 100,
        strategyRuleType: 'default',
        uuid: '1',
      });
    });
  });

  describe('/strategies/1 (DELETE)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/strategies/1', 'delete'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .delete('/strategies/3')
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
        .delete('/strategies/1')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives a 200 when a user of the project deletes a strategy', async () => {
      const access_token = await authenticate(app);

      const prev = await request(app.getHttpServer())
        .get('/strategies/1')
        .set('Authorization', `Bearer ${access_token}`);

      expect(prev.body).toMatchInlineSnapshot(`
        Object {
          "fieldComparator": null,
          "fieldName": null,
          "fieldValue": null,
          "flagEnvironmentEnvironmentId": "1",
          "flagEnvironmentFlagId": "1",
          "name": "Super strategy",
          "rolloutPercentage": 100,
          "strategyRuleType": "default",
          "uuid": "1",
        }
      `);

      await request(app.getHttpServer())
        .delete('/strategies/1')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(200)
        .expect({
          uuid: '1',
          name: 'Super strategy',
          strategyRuleType: 'default',
          fieldName: null,
          fieldComparator: null,
          fieldValue: null,
          rolloutPercentage: 100,
          flagEnvironmentFlagId: '1',
          flagEnvironmentEnvironmentId: '1',
        });

      const after = await request(app.getHttpServer())
        .get('/strategies/1')
        .set('Authorization', `Bearer ${access_token}`);

      expect(after.body).toMatchInlineSnapshot(`
        Object {
          "error": "Forbidden",
          "message": "Forbidden resource",
          "statusCode": 403,
        }
      `);
    });
  });

  describe('/strategies/1 (EDIT)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/strategies/1', 'put'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .put('/strategies/3')
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
        .put('/strategies/1')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives 400 when the project has noname', async () => {
      const access_token = await authenticate(app);

      const invalidStrategy: any = {
        name: undefined,
        strategyRuleType: 'default',
        rolloutPercentage: 100,
      };

      await request(app.getHttpServer())
        .put('/strategies/1')
        .set('Authorization', `Bearer ${access_token}`)
        .send(invalidStrategy)
        .expect(400)
        .expect({
          statusCode: 400,
          message: 'Validation failed',
          error: 'Bad Request',
        });
    });

    it('gives 400 when the project receives a wrong strategy type', async () => {
      const access_token = await authenticate(app);

      const invalidStrategy: any = {
        name: 'Super strategy',
        strategyRuleType: 'invalid strategy',
        rolloutPercentage: 100,
      };

      await request(app.getHttpServer())
        .put('/strategies/1')
        .set('Authorization', `Bearer ${access_token}`)
        .send(invalidStrategy)
        .expect(400)
        .expect({
          statusCode: 400,
          message: 'Validation failed',
          error: 'Bad Request',
        });
    });

    ['fieldName', 'fieldComparator', 'fieldValue'].forEach((field) => {
      it(`gives 400 when the project has a strategy of type "field" but no "${field}"`, async () => {
        const access_token = await authenticate(app);

        const invalidStrategy: any = {
          name: 'Super strategy',
          strategyRuleType: 'field',
          rolloutPercentage: 100,
          [field]: undefined,
        };

        await request(app.getHttpServer())
          .put('/strategies/1')
          .set('Authorization', `Bearer ${access_token}`)
          .send(invalidStrategy)
          .expect(400)
          .expect({
            statusCode: 400,
            message: 'Validation failed',
            error: 'Bad Request',
          });
      });
    });

    it('updates the strategy strategy', async () => {
      const access_token = await authenticate(app);

      const validStrategy: any = {
        name: 'Super strategy 2',
        strategyRuleType: 'default',
        rolloutPercentage: 67,
      };

      const response = await request(app.getHttpServer())
        .post('/environments/1/flags/1/strategies')
        .set('Authorization', `Bearer ${access_token}`)
        .send(validStrategy)
        .expect(201);

      const { uuid, ...obj } = response.body;

      expect(uuid).toBeDefined();
      expect(obj).toEqual({
        name: 'Super strategy 2',
        strategyRuleType: 'default',
        fieldName: null,
        fieldComparator: null,
        fieldValue: null,
        rolloutPercentage: 67,
        flagEnvironmentFlagId: '1',
        flagEnvironmentEnvironmentId: '1',
      });
    });
  });
});
