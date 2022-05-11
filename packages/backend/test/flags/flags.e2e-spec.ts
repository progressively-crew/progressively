import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { seedDb, cleanupDb } from '../helpers/seed';
import { prepareApp } from '../helpers/prepareApp';
import { verifyAuthGuard } from '../helpers/verify-auth-guard';
import { authenticate } from '../helpers/authenticate';

jest.mock('nanoid', () => ({
  nanoid: () => '12345-marvin',
}));

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
    await cleanupDb();
  });

  describe('/sdk/unknown-key (GET)', () => {
    it('gives an empty array when the key is invalid', async () => {
      const response = await request(app.getHttpServer()).get(
        '/sdk/unknown-key',
      );

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: 'Bad Request',
        statusCode: 400,
      });
    });
  });

  describe('/sdk/:params (GET)', () => {
    it('gives a list of flags when the key is valid for anonymous user (no field id, no cookies)', async () => {
      const fields = btoa(JSON.stringify({ clientKey: 'valid-sdk-key' }));
      const response = await request(app.getHttpServer()).get(`/sdk/${fields}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ newHomepage: false, newFooter: false });
      expect(response.headers['set-cookie']).toMatchInlineSnapshot(`
        Array [
          "progressively-id=12345-marvin; Path=/; Secure; SameSite=Lax",
        ]
      `);
    });

    it('gives a list of flags when the key is valid for an authenticated user (field is passed as query param and match a strategy)', async () => {
      const fields = btoa(
        JSON.stringify({ clientKey: 'valid-sdk-key', id: '1' }),
      );

      const response = await request(app.getHttpServer()).get(`/sdk/${fields}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ newHomepage: false, newFooter: true });
      expect(response.headers['set-cookie']).toMatchInlineSnapshot(`
        Array [
          "progressively-id=1; Path=/; Secure; SameSite=Lax",
        ]
      `);
    });

    it('gives a list of flags when the key is valid for an authenticated user (field is passed as query param and does NOT match a strategy)', async () => {
      const fields = btoa(
        JSON.stringify({ clientKey: 'valid-sdk-key', id: '2' }),
      );

      const response = await request(app.getHttpServer()).get(`/sdk/${fields}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ newHomepage: false, newFooter: false });
      expect(response.headers['set-cookie']).toMatchInlineSnapshot(`
        Array [
          "progressively-id=2; Path=/; Secure; SameSite=Lax",
        ]
      `);
    });

    it('gives a list of flags when the key is valid for an authenticated user (field is passed as cookie and match a strategy)', async () => {
      const fields = btoa(JSON.stringify({ clientKey: 'valid-sdk-key' }));

      const response = await request(app.getHttpServer())
        .get(`/sdk/${fields}`)
        .set('Cookie', ['progressively-id=1; Path=/; Secure; SameSite=Lax']);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ newHomepage: false, newFooter: true });
      expect(response.headers['set-cookie']).toMatchInlineSnapshot(`
        Array [
          "progressively-id=1; Path=/; Secure; SameSite=Lax",
        ]
      `);
    });

    it('gives a list of flags when the key is valid for an authenticated user (field is passed as cookie and does NOT match a strategy)', async () => {
      const fields = btoa(JSON.stringify({ clientKey: 'valid-sdk-key' }));

      const response = await request(app.getHttpServer())
        .get(`/sdk/${fields}`)
        .set('Cookie', ['progressively-id=2; Path=/; Secure; SameSite=Lax']);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ newHomepage: false, newFooter: false });
      expect(response.headers['set-cookie']).toMatchInlineSnapshot(`
        Array [
          "progressively-id=2; Path=/; Secure; SameSite=Lax",
        ]
      `);
    });
  });

  describe('/environments/1/flags/1 (PUT)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/environments/1/flags/1', 'put'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .put('/environments/3/flags/1')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          status: 'ACTIVATED',
        })
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
        .put('/environments/1/flags/1')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives 400 when status is not activated, inactive or not activated', async () => {
      const access_token = await authenticate(
        app,
        'marvin.frachet@something.com',
        'password',
      );

      return request(app.getHttpServer())
        .put('/environments/1/flags/1')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          status: 'invalid status',
        })
        .expect(400)
        .expect({
          statusCode: 400,
          message: 'Invalid status code',
          error: 'Bad Request',
        });
    });

    ['ACTIVATED', 'INACTIVE', 'NOT_ACTIVATED'].forEach((status) => {
      it(`gives 200 when setting the status of a flag to "${status}"`, async () => {
        const access_token = await authenticate(
          app,
          'marvin.frachet@something.com',
          'password',
        );

        const response = await request(app.getHttpServer())
          .put('/environments/1/flags/1')
          .set('Authorization', `Bearer ${access_token}`)
          .send({
            status,
          });

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
          flagId: '1',
          environmentId: '1',
          status,
          environment: {
            uuid: '1',
            name: 'Production',
            projectId: '1',
            clientKey: 'valid-sdk-key',
          },
          flag: {
            uuid: '1',
            name: 'New homepage',
            key: 'newHomepage',
            description: 'Switch the new homepage design',
          },
        });
      });
    });
  });

  describe('environments/1/flags/1/hits (GET)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/environments/1/flags/1/hits', 'get'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .get('/environments/3/flags/1/hits')
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
        .get('/environments/1/flags/1/hits')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives the hits for the status ACTIVATED by default', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .get('/environments/1/flags/1/hits')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(200)
        .expect([
          {
            date: '1992-01-01T02:02:02.002+00:00',
            activated: 10,
            notactivated: 5,
          },
          {
            date: '1992-01-02T02:02:02.002+00:00',
            activated: 40,
            notactivated: 20,
          },
          {
            date: '1992-01-03T02:02:02.002+00:00',
            activated: 20,
            notactivated: 10,
          },
          {
            date: '1992-01-06T02:02:02.002+00:00',
            activated: 10,
            notactivated: 5,
          },
        ]);
    });
  });

  describe('environments/1/flags/1 (DELETE)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/environments/1/flags/1', 'delete'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .delete('/environments/3/flags/1')
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
        .delete('/environments/1/flags/1')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives a 200 when the flag has been deleted', async () => {
      const access_token = await authenticate(app);

      const prevResponse = await request(app.getHttpServer())
        .get('/environments/1/flags')
        .set('Authorization', `Bearer ${access_token}`);

      expect(prevResponse.body).toMatchObject([
        {
          environment: {
            clientKey: 'valid-sdk-key',
            name: 'Production',
            projectId: '1',
            uuid: '1',
          },
          environmentId: '1',
          flag: {
            description: 'Switch the new footer design',
            key: 'newFooter',
            name: 'New footer',
            uuid: '2',
          },
          flagId: '2',
          status: 'ACTIVATED',
        },
        {
          environment: {
            clientKey: 'valid-sdk-key',
            name: 'Production',
            projectId: '1',
            uuid: '1',
          },
          environmentId: '1',
          flag: {
            description: 'Switch the new homepage design',
            key: 'newHomepage',
            name: 'New homepage',
            uuid: '1',
          },
          flagId: '1',
          status: 'NOT_ACTIVATED',
        },
      ]);

      const response = await request(app.getHttpServer())
        .delete('/environments/1/flags/1')
        .set('Authorization', `Bearer ${access_token}`);
      expect(response.status).toBe(200);

      const afterResponse = await request(app.getHttpServer())
        .get('/environments/1/flags')
        .set('Authorization', `Bearer ${access_token}`);

      expect(afterResponse.body.length).toBe(1);
    });
  });

  describe('/environments/:envId/flags/:flagId/strategies (POST)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/environments/1/flags/1/strategies', 'post'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      const validStrategy: any = {
        name: 'Super strategy',
        strategyRuleType: 'default',
        activationType: 'boolean',
      };

      return request(app.getHttpServer())
        .post('/environments/1/flags/3/strategies')
        .set('Authorization', `Bearer ${access_token}`)
        .send(validStrategy)
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
          name: 'Super strategy',
          strategyRuleType: 'field',
          activationType: 'boolean',
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

    it('gives 400 when the project has noname', async () => {
      const access_token = await authenticate(app);

      const invalidStrategy: any = {
        name: undefined,
        strategyRuleType: 'default',
        activationType: 'boolean',
      };

      await request(app.getHttpServer())
        .post('/environments/1/flags/1/strategies')
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
        .post('/environments/1/flags/1/strategies')
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
        .post('/environments/1/flags/1/strategies')
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
          .post('/environments/1/flags/1/strategies')
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

      const validStrategy: any = {
        name: 'Super strategy',
        strategyRuleType: 'default',
        activationType: 'boolean',
      };

      const response = await request(app.getHttpServer())
        .post('/environments/1/flags/1/strategies')
        .set('Authorization', `Bearer ${access_token}`)
        .send(validStrategy)
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
        fieldValue: 'marvin.frachet@something.com\njohn.doe@gmail.com',
      };

      const response = await request(app.getHttpServer())
        .post('/environments/1/flags/1/strategies')
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
        fieldValue: 'marvin.frachet@something.com\njohn.doe@gmail.com',
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
        fieldValue: 'marvin.frachet@something.com\njohn.doe@gmail.com',
        rolloutPercentage: 99,
      };

      const response = await request(app.getHttpServer())
        .post('/environments/1/flags/1/strategies')
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
        fieldValue: 'marvin.frachet@something.com\njohn.doe@gmail.com',
        activationType: 'percentage',
        rolloutPercentage: 99,
        flagEnvironmentFlagId: '1',
        flagEnvironmentEnvironmentId: '1',
      });
    });
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

      const validStrategy: any = {
        name: 'Super strategy',
        strategyRuleType: 'field',
        activationType: 'percentage',
        fieldName: 'email',
        fieldComparator: 'eq',
        fieldValue: 'marvin.frachet@something.com\njohn.doe@gmail.com',
        rolloutPercentage: 99,
      };

      // Create a strategy to check it works
      await request(app.getHttpServer())
        .post('/environments/1/flags/1/strategies')
        .set('Authorization', `Bearer ${access_token}`)
        .send(validStrategy);

      const response = await request(app.getHttpServer())
        .get('/environments/1/flags/1/strategies')
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
});
