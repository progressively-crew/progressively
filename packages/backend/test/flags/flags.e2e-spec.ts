import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { seedDb, cleanupDb } from '../helpers/seed';
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
    await cleanupDb();
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

  describe('/environments/1/flags/1/percentage (PUT)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/environments/1/flags/1/percentage', 'put'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .put('/environments/3/flags/1/percentage')
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
        .put('/environments/1/flags/1/percentage')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    ['abc', -100, 1000].forEach((invalidPercentage) => {
      it(`gives 400 when the percentage is ${invalidPercentage}`, async () => {
        const access_token = await authenticate(
          app,
          'marvin.frachet@something.com',
          'password',
        );

        return request(app.getHttpServer())
          .put('/environments/1/flags/1/percentage')
          .set('Authorization', `Bearer ${access_token}`)
          .send({
            rolloutPercentage: invalidPercentage,
          })
          .expect(400)
          .expect({
            statusCode: 400,
            message: 'Validation failed',
            error: 'Bad Request',
          });
      });
    });

    it(`gives 200 when setting the percentage of a flag to "50%"`, async () => {
      const access_token = await authenticate(
        app,
        'marvin.frachet@something.com',
        'password',
      );

      const response = await request(app.getHttpServer())
        .put('/environments/1/flags/1/percentage')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          rolloutPercentage: 50,
        });

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        flagId: '1',
        environmentId: '1',
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
        rolloutPercentage: 50,
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
          { date: '1992-01-01T02:02:02.002Z', activated: 10, notactivated: 5 },
          { date: '1992-01-02T02:02:02.002Z', activated: 40, notactivated: 20 },
          { date: '1992-01-03T02:02:02.002Z', activated: 20, notactivated: 10 },
          { date: '1992-01-06T02:02:02.002Z', activated: 10, notactivated: 5 },
        ]);
    });
  });

  describe('/flags/1 (DELETE)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/flags/1', 'delete'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .delete('/flags/53')
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
        .delete('/flags/1')
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
        .delete('/flags/1')
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
        flagEnvironmentFlagId: '1',
        flagEnvironmentEnvironmentId: '1',
      });
    });

    it('creates a field strategy', async () => {
      const access_token = await authenticate(app);

      const validStrategy: any = {
        name: 'Super strategy',
        strategyRuleType: 'field',
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
        flagEnvironmentFlagId: '1',
        flagEnvironmentEnvironmentId: '1',
      });
    });

    it('creates a field strategy with an activation percentage', async () => {
      const access_token = await authenticate(app);

      const validStrategy: any = {
        name: 'Super strategy',
        strategyRuleType: 'field',
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
        fieldName: 'email',
        fieldComparator: 'eq',
        fieldValue: 'marvin.frachet@something.com\njohn.doe@gmail.com',
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
      expect(newStrat.fieldComparator).toEqual(null);
      expect(newStrat.fieldName).toEqual(null);
      expect(newStrat.fieldValue).toEqual(null);
      expect(newStrat.flagEnvironmentEnvironmentId).toEqual('1');
      expect(newStrat.flagEnvironmentFlagId).toEqual('1');
      expect(newStrat.name).toEqual('Super strategy');
      expect(newStrat.strategyRuleType).toEqual('default');
      expect(newStrat.uuid).toBeDefined();
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

    it('gives the strategies information when the user is authenticated and authorized', async () => {
      const access_token = await authenticate(app);

      const validStrategy: any = {
        name: 'Super strategy',
        strategyRuleType: 'field',
        fieldName: 'email',
        fieldComparator: 'eq',
        fieldValue: 'marvin.frachet@something.com\njohn.doe@gmail.com',
      };

      // Create a strategy to check it works
      await request(app.getHttpServer())
        .post('/environments/1/flags/1/scheduling')
        .set('Authorization', `Bearer ${access_token}`)
        .send(validStrategy);

      const response = await request(app.getHttpServer())
        .get('/environments/1/flags/1/scheduling')
        .set('Authorization', `Bearer ${access_token}`);

      const schedule = response.body[0];

      expect(response.status).toBe(200);
      expect(schedule.rolloutPercentage).toBe(100);
      expect(schedule.flagEnvironmentFlagId).toBe('1');
      expect(schedule.flagEnvironmentEnvironmentId).toBe('1');
      expect(schedule.utc).toBeDefined();
      expect(schedule.uuid).toBeDefined();
    });
  });

  describe('/environments/:envId/flags/:flagId/scheduling (POST)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/environments/1/flags/1/scheduling', 'post'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      const validStrategy: any = {
        name: 'Super strategy',
        strategyRuleType: 'default',
      };

      return request(app.getHttpServer())
        .post('/environments/1/flags/3/scheduling')
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
        .post('/environments/1/flags/1/scheduling')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          name: 'Super strategy',
          strategyRuleType: 'field',
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

    it('gives 400 when the scheduling has a wrong rolloutPercentage', async () => {
      const access_token = await authenticate(app);

      const invalidScheduling: any = {
        utc: new Date('1992-06-21'),
        status: 'ACTIVATED',
        rolloutPercentage: 1000,
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

    it('creates a scheduling', async () => {
      const access_token = await authenticate(app);

      const validScheduling: any = {
        utc: new Date('1992-06-21'),
        status: 'ACTIVATED',
        rolloutPercentage: 89,
      };

      const response = await request(app.getHttpServer())
        .post('/environments/1/flags/1/scheduling')
        .set('Authorization', `Bearer ${access_token}`)
        .send(validScheduling)
        .expect(201);

      expect(response.body).toMatchObject({
        rolloutPercentage: 89,
        status: 'ACTIVATED',
        utc: '1992-06-21T00:00:00.000Z',
      });
    });
  });
});
