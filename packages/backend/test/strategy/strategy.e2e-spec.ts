import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { seedDb, cleanupDb } from '@progressively/database/seed';
import { authenticate } from '../helpers/authenticate';
import { verifyAuthGuard } from '../helpers/verify-auth-guard';
import { prepareApp } from '../helpers/prepareApp';
import { StrategyUpdateDto, ValueToServe } from '../../src/strategy/types';

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

  describe('/environments/1/flags/1/strategies (GET)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/environments/1/flags/1/strategies', 'get'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .get('/environments/1/flags/3/strategies')
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
        .get('/environments/1/flags/1/strategies')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives the strategies information when the user is authenticated and authorized', async () => {
      const access_token = await authenticate(app);

      const response = await request(app.getHttpServer())
        .get('/environments/1/flags/1/strategies')
        .set('Authorization', `Bearer ${access_token}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        {
          flagEnvironmentEnvironmentId: '1',
          flagEnvironmentFlagId: '1',
          rolloutPercentage: 100,
          rules: [],
          uuid: '1',
          valueToServe: null,
          valueToServeType: 'Boolean',
          variants: [],
        },
      ]);
    });
  });

  describe('/strategies/1 (DELETE)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/strategies/1', 'delete'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .delete('/strategies/10')
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

      const result = await request(app.getHttpServer())
        .delete('/strategies/1')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(200);

      expect(result.body).toEqual({
        uuid: '1',
        flagEnvironmentFlagId: '1',
        flagEnvironmentEnvironmentId: '1',
        rolloutPercentage: 100,
        valueToServe: null,
        valueToServeType: 'Boolean',
      });
    });
  });

  describe('/environments/:envId/flags/:flagId/strategies (POST)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/environments/1/flags/1/strategies', 'post'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      const validRule: any = {};

      return request(app.getHttpServer())
        .post('/environments/4/flags/1/strategies')
        .set('Authorization', `Bearer ${access_token}`)
        .send(validRule)
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
        .post('/environments/1/flags/1/strategies')
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

    it('creates a default strategy', async () => {
      const access_token = await authenticate(app);

      const response = await request(app.getHttpServer())
        .post('/environments/1/flags/1/strategies')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(201);

      expect(response.body.uuid).toBeDefined();
      expect(response.body).toMatchObject({
        flagEnvironmentEnvironmentId: '1',
        flagEnvironmentFlagId: '1',
        rolloutPercentage: 100,
      });
    });
  });

  describe('/strategies/1/rules (POST)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/strategies/1/rules', 'post'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .post('/strategies/10/rules')
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
        .post('/strategies/1/rules')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('creates a default rule', async () => {
      const access_token = await authenticate(app);

      const response = await request(app.getHttpServer())
        .post('/strategies/1/rules')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(201);

      expect(response.body.uuid).toBeDefined();
      expect(response.body).toMatchObject({
        fieldComparator: 'eq',
        fieldName: '',
        fieldValue: '',
        segmentUuid: null,
        strategyUuid: '1',
      });
    });
  });

  describe('/strategies/1 (Put)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/strategies/1', 'put'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      const validRule: StrategyUpdateDto = {
        valueToServeType: ValueToServe.Boolean,
      };

      return request(app.getHttpServer())
        .put('/strategies/4')
        .set('Authorization', `Bearer ${access_token}`)
        .send(validRule)
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

      const validRule: StrategyUpdateDto = {
        valueToServeType: ValueToServe.Boolean,
      };

      return request(app.getHttpServer())
        .put('/strategies/1')
        .set('Authorization', `Bearer ${access_token}`)
        .send(validRule)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    ['valueToServeType'].forEach((field) => {
      it(`gives 400 when "${field}" is invalid`, async () => {
        const access_token = await authenticate(app);

        const invalidStrategy: any = {
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

    ['variantUuid', 'rolloutPercentage'].forEach((field) => {
      it(`gives 400 when valueToServeType is Variant but mandatory "${field}" is invalid`, async () => {
        const access_token = await authenticate(app);

        const invalidStrategy: any = {
          valueToServe: undefined,
          rolloutPercentage: 0,
          valueToServeType: 'Variant',
          variants: [
            {
              variantUuid: '1',
              rolloutPercentage: 100,
              [field]: undefined,
            },
          ],
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

    it('updates a strategy', async () => {
      const access_token = await authenticate(app);

      const validRule: StrategyUpdateDto = {
        valueToServeType: ValueToServe.Boolean,
      };

      const response = await request(app.getHttpServer())
        .put('/strategies/1')
        .set('Authorization', `Bearer ${access_token}`)
        .send(validRule)
        .expect(200);

      expect(response.body).toEqual({
        rolloutPercentage: 100,
        uuid: '1',
        valueToServe: null,
        valueToServeType: 'Boolean',
        flagEnvironmentEnvironmentId: '1',
        flagEnvironmentFlagId: '1',
        variants: [],
      });
    });

    it('updates a strategy with variants', async () => {
      const access_token = await authenticate(app);

      const validRule: StrategyUpdateDto = {
        valueToServeType: ValueToServe.Variant,
        variants: [
          {
            variantUuid: '1',
            rolloutPercentage: 78,
          },
        ],
      };

      const response = await request(app.getHttpServer())
        .put('/strategies/1')
        .set('Authorization', `Bearer ${access_token}`)
        .send(validRule)
        .expect(200);

      expect(response.body).toEqual({
        rolloutPercentage: 100,
        uuid: '1',
        valueToServe: null,
        valueToServeType: 'Variant',
        flagEnvironmentEnvironmentId: '1',
        flagEnvironmentFlagId: '1',
        variants: [
          {
            rolloutPercentage: 78,
            strategyUuid: '1',
            variantUuid: '1',
          },
        ],
      });
    });
  });
});
