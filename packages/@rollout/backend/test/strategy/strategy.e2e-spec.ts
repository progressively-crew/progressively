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

  describe('/projects/:id/environments/:envId/flags/:flagId/strategies', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(
        app,
        '/projects/1/environments/1/flags/1/strategies',
        'post',
      ));

    it('gives a 403 when the user requests a forbidden project', async () => {
      const access_token = await authenticate(
        app,
        'jane.doe@gmail.com',
        'password',
      );

      return request(app.getHttpServer())
        .post('/projects/1/environments/1/flags/1/strategies')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          name: 'Super strategy',
          strategyRuleType: 'field',
          activationType: 'boolean',
          fieldName: 'email',
          fieldComparator: 'eq',
          fieldValue: 'marvin.frachet@gmail.com\njohn.doe@gmail.com',
        })
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
        activationType: 'boolean',
      };

      await request(app.getHttpServer())
        .post('/projects/1/environments/1/flags/1/strategies')
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
        activationType: 'boolean',
      };

      await request(app.getHttpServer())
        .post('/projects/1/environments/1/flags/1/strategies')
        .set('Authorization', `Bearer ${access_token}`)
        .send(invalidStrategy)
        .expect(400)
        .expect({
          statusCode: 400,
          message: 'Validation failed',
          error: 'Bad Request',
        });
    });

    it('gives 400 when the project receives a wrong activation type', async () => {
      const access_token = await authenticate(app);

      const invalidStrategy: any = {
        name: 'Super strategy',
        strategyRuleType: 'default',
        activationType: 'not-valid',
      };

      await request(app.getHttpServer())
        .post('/projects/1/environments/1/flags/1/strategies')
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
          activationType: 'boolean',
          [field]: undefined,
        };

        await request(app.getHttpServer())
          .post('/projects/1/environments/1/flags/1/strategies')
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

    it('creates a default strategy', async () => {
      const access_token = await authenticate(app);

      const invalidStrategy: any = {
        name: 'Super strategy',
        strategyRuleType: 'default',
        activationType: 'boolean',
      };

      const response = await request(app.getHttpServer())
        .post('/projects/1/environments/1/flags/1/strategies')
        .set('Authorization', `Bearer ${access_token}`)
        .send(invalidStrategy)
        .expect(201);

      const { uuid, ...obj } = response.body;

      expect(uuid).toBeDefined();
      expect(obj).toEqual({
        name: 'Super strategy',
        strategyRuleType: 'default',
        fieldName: null,
        fieldComparator: null,
        fieldValue: null,
        activationType: 'boolean',
        rolloutPercentage: null,
        flagEnvironmentFlagId: '1',
        flagEnvironmentEnvironmentId: '1',
      });
    });

    it('creates a field strategy', async () => {
      const access_token = await authenticate(app);

      const validStrategy: any = {
        name: 'Super strategy',
        strategyRuleType: 'field',
        activationType: 'boolean',
        fieldName: 'email',
        fieldComparator: 'eq',
        fieldValue: 'marvin.frachet@gmail.com\njohn.doe@gmail.com',
      };

      const response = await request(app.getHttpServer())
        .post('/projects/1/environments/1/flags/1/strategies')
        .set('Authorization', `Bearer ${access_token}`)
        .send(validStrategy)
        .expect(201);

      const { uuid, ...obj } = response.body;

      expect(uuid).toBeDefined();
      expect(obj).toEqual({
        name: 'Super strategy',
        strategyRuleType: 'field',
        fieldName: 'email',
        fieldComparator: 'eq',
        fieldValue: 'marvin.frachet@gmail.com\njohn.doe@gmail.com',
        activationType: 'boolean',
        rolloutPercentage: null,
        flagEnvironmentFlagId: '1',
        flagEnvironmentEnvironmentId: '1',
      });
    });

    it('creates a field strategy with an activation percentage', async () => {
      const access_token = await authenticate(app);

      const validStrategy: any = {
        name: 'Super strategy',
        strategyRuleType: 'field',
        activationType: 'percentage',
        fieldName: 'email',
        fieldComparator: 'eq',
        fieldValue: 'marvin.frachet@gmail.com\njohn.doe@gmail.com',
        rolloutPercentage: 99,
      };

      const response = await request(app.getHttpServer())
        .post('/projects/1/environments/1/flags/1/strategies')
        .set('Authorization', `Bearer ${access_token}`)
        .send(validStrategy)
        .expect(201);

      const { uuid, ...obj } = response.body;

      expect(uuid).toBeDefined();
      expect(obj).toEqual({
        name: 'Super strategy',
        strategyRuleType: 'field',
        fieldName: 'email',
        fieldComparator: 'eq',
        fieldValue: 'marvin.frachet@gmail.com\njohn.doe@gmail.com',
        activationType: 'percentage',
        rolloutPercentage: 99,
        flagEnvironmentFlagId: '1',
        flagEnvironmentEnvironmentId: '1',
      });
    });
  });

  describe('/projects/:1/environments/1/flags/1/strategies (GET)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(
        app,
        '/projects/1/environments/1/flags/1/strategies',
        'get',
      ));

    it('gives a 403 when the user requests a forbidden project', async () => {
      const access_token = await authenticate(
        app,
        'jane.doe@gmail.com',
        'password',
      );

      return request(app.getHttpServer())
        .get('/projects/1/environments/1/flags/1/strategies')
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

      const validStrategy: any = {
        name: 'Super strategy',
        strategyRuleType: 'field',
        activationType: 'percentage',
        fieldName: 'email',
        fieldComparator: 'eq',
        fieldValue: 'marvin.frachet@gmail.com\njohn.doe@gmail.com',
        rolloutPercentage: 99,
      };

      // Create a strategy to check it works
      await request(app.getHttpServer())
        .post('/projects/1/environments/1/flags/1/strategies')
        .set('Authorization', `Bearer ${access_token}`)
        .send(validStrategy);

      const response = await request(app.getHttpServer())
        .get('/projects/1/environments/1/flags/1/strategies')
        .set('Authorization', `Bearer ${access_token}`);

      const newStrat = response.body[0];

      expect(response.status).toBe(200);
      expect(newStrat.activationType).toEqual('boolean');
      expect(newStrat.fieldComparator).toEqual(null);
      expect(newStrat.fieldName).toEqual(null);
      expect(newStrat.fieldValue).toEqual(null);
      expect(newStrat.flagEnvironmentEnvironmentId).toEqual('1');
      expect(newStrat.flagEnvironmentFlagId).toEqual('1');
      expect(newStrat.name).toEqual('Super strategy');
      expect(newStrat.rolloutPercentage).toEqual(null);
      expect(newStrat.strategyRuleType).toEqual('default');
      expect(newStrat.uuid).toBeDefined();
    });
  });

  describe('/projects/1/environments/1/flags/1/strategies/1 (GET)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(
        app,
        '/projects/1/environments/1/flags/1/strategies/1',
        'get',
      ));

    it('gives a 403 when the user requests a forbidden project', async () => {
      const access_token = await authenticate(
        app,
        'jane.doe@gmail.com',
        'password',
      );

      return request(app.getHttpServer())
        .get('/projects/1/environments/1/flags/1/strategies/1')
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
        .get('/projects/1/environments/1/flags/1/strategies/1')
        .set('Authorization', `Bearer ${access_token}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        activationType: 'boolean',
        fieldComparator: null,
        fieldName: null,
        fieldValue: null,
        flagEnvironmentEnvironmentId: '1',
        flagEnvironmentFlagId: '1',
        name: 'Super strategy',
        rolloutPercentage: null,
        strategyRuleType: 'default',
        uuid: '1',
      });
    });
  });

  describe.only('/projects/1/environments/1/flags/1/strategies/1 (DELETE)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(
        app,
        '/projects/1/environments/1/flags/1/strategies/1',
        'delete',
      ));

    it('gives a 403 when the user requests a forbidden project', async () => {
      const access_token = await authenticate(
        app,
        'jane.doe@gmail.com',
        'password',
      );

      return request(app.getHttpServer())
        .delete('/projects/1/environments/1/flags/1/strategies/1')
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
        .get('/projects/1/environments/1/flags/1/strategies/1')
        .set('Authorization', `Bearer ${access_token}`);

      expect(prev.body).toMatchInlineSnapshot(`
        Object {
          "activationType": "boolean",
          "fieldComparator": null,
          "fieldName": null,
          "fieldValue": null,
          "flagEnvironmentEnvironmentId": "1",
          "flagEnvironmentFlagId": "1",
          "name": "Super strategy",
          "rolloutPercentage": null,
          "strategyRuleType": "default",
          "uuid": "1",
        }
      `);

      await request(app.getHttpServer())
        .delete('/projects/1/environments/1/flags/1/strategies/1')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(200)
        .expect({
          uuid: '1',
          name: 'Super strategy',
          strategyRuleType: 'default',
          fieldName: null,
          fieldComparator: null,
          fieldValue: null,
          activationType: 'boolean',
          rolloutPercentage: null,
          flagEnvironmentFlagId: '1',
          flagEnvironmentEnvironmentId: '1',
        });

      const after = await request(app.getHttpServer())
        .get('/projects/1/environments/1/flags/1/strategies/1')
        .set('Authorization', `Bearer ${access_token}`);

      expect(after.body).toMatchInlineSnapshot(`Object {}`);
    });
  });
});
