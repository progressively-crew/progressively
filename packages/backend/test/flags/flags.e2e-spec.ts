import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import got from 'got';
import { seedDb, cleanupDb } from '../helpers/seed';
import { prepareApp } from '../helpers/prepareApp';
import { verifyAuthGuard } from '../helpers/verify-auth-guard';
import { authenticate } from '../helpers/authenticate';

jest.mock('got', () => ({
  ...jest.requireActual('got'),
  __esModule: true,
  default: { post: jest.fn(() => ({ catch: (cb) => cb() })) },
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
    jest.resetAllMocks();
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

    it(`calls a webhook when the flag is "ACTIVATED`, async () => {
      const access_token = await authenticate(
        app,
        'marvin.frachet@something.com',
        'password',
      );

      await request(app.getHttpServer())
        .put('/environments/1/flags/1')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          status: 'ACTIVATED',
        });

      expect(got.post).toBeCalledWith('http://localhost:4000', {
        headers: { 'x-progressively-secret': 'this is secret' },
      });
    });

    it(`does not call a webhook when the flag is "NOT_ACTIVATED`, async () => {
      const access_token = await authenticate(
        app,
        'marvin.frachet@something.com',
        'password',
      );

      await request(app.getHttpServer())
        .put('/environments/1/flags/1')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          status: 'NOT_ACTIVATED',
        });

      expect(got.post).not.toBeCalled();
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
      verifyAuthGuard(
        app,
        '/environments/1/flags/1/hits?startDate=1992-01-01&endDate=1992-02-28',
        'get',
      ));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .get(
          '/environments/3/flags/1/hits?startDate=1992-01-01&endDate=1992-02-28',
        )
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
        .get(
          '/environments/1/flags/1/hits?startDate=1992-01-01&endDate=1992-02-28',
        )
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives a 400 when the startDate is not passed', async () => {
      const access_token = await authenticate(app);

      const res = await request(app.getHttpServer())
        .get('/environments/1/flags/1/hits?endDate=1992-02-28')
        .set('Authorization', `Bearer ${access_token}`);

      expect(res.status).toBe(400);
    });

    it('gives a 400 when the endDate is not passed', async () => {
      const access_token = await authenticate(app);

      const res = await request(app.getHttpServer())
        .get('/environments/1/flags/1/hits?startDate=1992-01-01')
        .set('Authorization', `Bearer ${access_token}`);

      expect(res.status).toBe(400);
    });

    it('gives the hits for the status ACTIVATED by default', async () => {
      const access_token = await authenticate(app);

      const res = await request(app.getHttpServer())
        .get(
          '/environments/1/flags/1/hits?startDate=1992-01-01&endDate=1992-02-28',
        )
        .set('Authorization', `Bearer ${access_token}`);

      expect(res.status).toBe(200);
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
        .set('Authorization', `Bearer ${access_token}`)
        .expect(200);
      expect(prevResponse.body.length).toBe(3);

      const response = await request(app.getHttpServer())
        .delete('/flags/1')
        .set('Authorization', `Bearer ${access_token}`);
      expect(response.status).toBe(200);

      const afterResponse = await request(app.getHttpServer())
        .get('/environments/1/flags')
        .set('Authorization', `Bearer ${access_token}`);

      expect(afterResponse.body.length).toBe(2);
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

  describe('/environments/1/flags/4/variants (GET)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/environments/1/flags/4/variants', 'get'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .get('/environments/2/flags/4/variants')
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
        .get('/environments/1/flags/4/variants')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives the variants array', async () => {
      const access_token = await authenticate(app);

      const response = await request(app.getHttpServer())
        .get('/environments/1/flags/4/variants')
        .set('Authorization', `Bearer ${access_token}`);

      expect(response.status).toBe(200);

      expect(response.body).toMatchObject([
        {
          flagEnvironmentEnvironmentId: '1',
          flagEnvironmentFlagId: '4',
          isControl: true,
          rolloutPercentage: 12,
          uuid: '1',
          value: 'Control',
        },
        {
          flagEnvironmentEnvironmentId: '1',
          flagEnvironmentFlagId: '4',
          isControl: false,
          rolloutPercentage: 88,
          uuid: '2',
          value: 'Second',
        },
      ]);
    });
  });

  describe('/environments/:envId/flags/:flagId/variants (POST)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/environments/1/flags/1/variants', 'post'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .post('/environments/1/flags/6/variants')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          isControl: false,
          rolloutPercentage: 12,
          value: 'test',
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
        .post('/environments/1/flags/1/variants')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          isControl: false,
          rolloutPercentage: 12,
          value: 'test',
        })
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives 400 when the variants has a wrong rolloutPercentage', async () => {
      const access_token = await authenticate(app);

      const invalidVariant: any = {
        rolloutPercentage: undefined,
        value: 'test',
        isControl: true,
      };

      await request(app.getHttpServer())
        .post('/environments/1/flags/1/variants')
        .set('Authorization', `Bearer ${access_token}`)
        .send(invalidVariant)
        .expect(400)
        .expect({
          statusCode: 400,
          message: 'Validation failed',
          error: 'Bad Request',
        });
    });

    it('gives 400 when the variant has a wrong value', async () => {
      const access_token = await authenticate(app);

      const invalidVariant: any = {
        rolloutPercentage: 12,
        value: undefined,
        isControl: true,
      };

      await request(app.getHttpServer())
        .post('/environments/1/flags/1/variants')
        .set('Authorization', `Bearer ${access_token}`)
        .send(invalidVariant)
        .expect(400)
        .expect({
          statusCode: 400,
          message: 'Validation failed',
          error: 'Bad Request',
        });
    });

    it('creates a variant', async () => {
      const access_token = await authenticate(app);

      const variant: any = {
        rolloutPercentage: 12,
        value: 'test',
      };

      const response = await request(app.getHttpServer())
        .post('/environments/1/flags/1/variants')
        .set('Authorization', `Bearer ${access_token}`)
        .send(variant)
        .expect(201);

      expect(response.body).toMatchObject({
        flagEnvironmentEnvironmentId: '1',
        flagEnvironmentFlagId: '1',
        isControl: true,
        rolloutPercentage: 12,
        value: 'test',
      });
    });
  });

  describe('/environments/1/flags/4/variants/1 (DELETE)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/environments/1/flags/4/variants/1', 'delete'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .delete('/environments/3/flags/4/variants/1')
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
        .delete('/environments/1/flags/4/variants/1')
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
        .get('/environments/1/flags/4/variants')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(200);

      expect(prevResponse.body.length).toBe(2);

      const response = await request(app.getHttpServer())
        .delete('/environments/1/flags/4/variants/1')
        .set('Authorization', `Bearer ${access_token}`);
      expect(response.status).toBe(200);

      const afterResponse = await request(app.getHttpServer())
        .get('/environments/1/flags/4/variants')
        .set('Authorization', `Bearer ${access_token}`);

      expect(afterResponse.body.length).toBe(1);
    });
  });

  describe('/environments/:envId/flags/:flagId/variants (PUT)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/environments/1/flags/1/variants', 'put'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .put('/environments/1/flags/6/variants')
        .set('Authorization', `Bearer ${access_token}`)
        .send([])
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
        .put('/environments/1/flags/1/variants')
        .set('Authorization', `Bearer ${access_token}`)
        .send([])
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives 400 when the variants has a wrong rolloutPercentage', async () => {
      const access_token = await authenticate(app);

      const invalidVariant: any = [
        {
          uuid: '1',
          rolloutPercentage: undefined,
          value: 'test',
          isControl: true,
        },
      ];

      await request(app.getHttpServer())
        .put('/environments/1/flags/1/variants')
        .set('Authorization', `Bearer ${access_token}`)
        .send(invalidVariant)
        .expect(400)
        .expect({
          statusCode: 400,
          message: 'Validation failed',
          error: 'Bad Request',
        });
    });

    it('gives 400 when the variant has a wrong value', async () => {
      const access_token = await authenticate(app);

      const invalidVariant: any = [
        {
          uuid: '1',
          rolloutPercentage: 12,
          value: undefined,
          isControl: true,
        },
      ];

      await request(app.getHttpServer())
        .put('/environments/1/flags/1/variants')
        .set('Authorization', `Bearer ${access_token}`)
        .send(invalidVariant)
        .expect(400)
        .expect({
          statusCode: 400,
          message: 'Validation failed',
          error: 'Bad Request',
        });
    });

    it('gives 400 when the cumulative percentage is over 100', async () => {
      const access_token = await authenticate(app);

      const invalidVariant: any = [
        {
          uuid: '1',
          rolloutPercentage: 80,
          value: 'control',
          isControl: true,
        },
        {
          uuid: '2',
          rolloutPercentage: 21,
          value: 'alternative',
          isControl: false,
        },
      ];

      await request(app.getHttpServer())
        .put('/environments/1/flags/1/variants')
        .set('Authorization', `Bearer ${access_token}`)
        .send(invalidVariant)
        .expect(400)
        .expect({
          statusCode: 400,
          message: `The cumulated percentage of the variants is 101% which is over 100%.`,
          error: 'Bad Request',
        });
    });

    it('gives 400 when the control variant is not passed', async () => {
      const access_token = await authenticate(app);

      const invalidVariant: any = [
        {
          uuid: '1',
          rolloutPercentage: 80,
          value: 'control',
          isControl: false,
        },
        {
          uuid: '2',
          rolloutPercentage: 20,
          value: 'alternative',
          isControl: false,
        },
      ];

      await request(app.getHttpServer())
        .put('/environments/1/flags/1/variants')
        .set('Authorization', `Bearer ${access_token}`)
        .send(invalidVariant)
        .expect(400)
        .expect({
          statusCode: 400,
          message: `There is no control variant found. You have to provide one.`,
          error: 'Bad Request',
        });
    });

    it('edits a variant', async () => {
      const access_token = await authenticate(app);

      const variant: any = [
        {
          uuid: '1',
          rolloutPercentage: 88,
          value: 'test 2',
          isControl: true,
        },
      ];

      const response = await request(app.getHttpServer())
        .put('/environments/1/flags/4/variants')
        .set('Authorization', `Bearer ${access_token}`)
        .send(variant)
        .expect(200);

      expect(response.body).toMatchObject({
        count: 1,
      });
    });
  });

  describe('/environments/:envId/flags/:flagId/metrics (POST)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/environments/1/flags/1/metrics', 'post'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .post('/environments/1/flags/6/metrics')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          name: 'metric name',
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
        .post('/environments/1/flags/1/metrics')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          name: 'metric name',
        })
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives 400 when the variants has an invalid name', async () => {
      const access_token = await authenticate(app);

      await request(app.getHttpServer())
        .post('/environments/1/flags/1/metrics')
        .set('Authorization', `Bearer ${access_token}`)
        .send({})
        .expect(400)
        .expect({
          statusCode: 400,
          message: 'Validation failed',
          error: 'Bad Request',
        });
    });

    it('creates a metric', async () => {
      const access_token = await authenticate(app);

      const metric: any = {
        name: 'test',
      };

      const response = await request(app.getHttpServer())
        .post('/environments/1/flags/1/metrics')
        .set('Authorization', `Bearer ${access_token}`)
        .send(metric)
        .expect(201);

      expect(response.body).toMatchObject({
        flagEnvironmentEnvironmentId: '1',
        flagEnvironmentFlagId: '1',
        name: 'test',
      });
    });
  });

  describe('/environments/1/flags/4/metrics/1 (DELETE)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/environments/1/flags/4/metrics/1', 'delete'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .delete('/environments/3/flags/4/metrics/1')
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
        .delete('/environments/1/flags/4/metrics/1')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives a 200 when the metric has been deleted', async () => {
      const access_token = await authenticate(app);

      const prevResponse = await request(app.getHttpServer())
        .get('/environments/1/flags/4/metrics')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(200);

      expect(prevResponse.body.length).toBe(2);

      const response = await request(app.getHttpServer())
        .delete('/environments/1/flags/4/metrics/1')
        .set('Authorization', `Bearer ${access_token}`);

      expect(response.status).toBe(200);

      const afterResponse = await request(app.getHttpServer())
        .get('/environments/1/flags/4/metrics')
        .set('Authorization', `Bearer ${access_token}`);

      expect(afterResponse.body.length).toBe(1);
    });
  });

  describe('/environments/1/flags/1/metrics (GET)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/environments/1/flags/1/metrics', 'get'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .get('/environments/1/flags/3/metrics')
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
        .get('/environments/1/flags/1/metrics')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives the metrics information when the user is authenticated and authorized', async () => {
      const access_token = await authenticate(app);

      const response = await request(app.getHttpServer())
        .get('/environments/1/flags/4/metrics')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(200);

      expect(response.body).toMatchObject([
        {
          uuid: '1',
          name: 'A metric',
          flagEnvironmentFlagId: '4',
          flagEnvironmentEnvironmentId: '1',
          variantUuid: null,
          variant: null,
        },
        {
          uuid: '100',
          name: 'B metric',
          flagEnvironmentFlagId: '4',
          flagEnvironmentEnvironmentId: '1',
          variantUuid: '1',
          variant: {
            uuid: '1',
            rolloutPercentage: 12,
            isControl: true,
            value: 'Control',
            flagEnvironmentFlagId: '4',
            flagEnvironmentEnvironmentId: '1',
          },
        },
      ]);
    });
  });

  describe('/environments/:envId/flags/:flagId/webhooks (POST)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/environments/1/flags/1/webhooks', 'post'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      const validStrategy: any = {
        name: 'Super strategy',
        strategyRuleType: 'default',
      };

      return request(app.getHttpServer())
        .post('/environments/1/flags/3/webhooks')
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
        .post('/environments/1/flags/1/webhooks')
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

    ['event', 'endpoint'].forEach((field) => {
      it(`gives 400 when the project has a webhook without "${field}"`, async () => {
        const access_token = await authenticate(app);

        const invalidStrategy: any = {
          name: 'Super strategy',
          strategyRuleType: 'field',
          [field]: undefined,
        };

        await request(app.getHttpServer())
          .post('/environments/1/flags/1/webhooks')
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

    it('gives 400 when the endpoint is invalid', async () => {
      const access_token = await authenticate(app);

      const validWebhook: any = {
        endpoint: 'hts:/hello.com',
        event: 'ACTIVATION',
      };

      return request(app.getHttpServer())
        .post('/environments/1/flags/1/webhooks')
        .set('Authorization', `Bearer ${access_token}`)
        .send(validWebhook)
        .expect(400);
    });

    it('creates a webhook', async () => {
      const access_token = await authenticate(app);

      const validWebhook: any = {
        endpoint: 'https://hello.com',
        event: 'ACTIVATION',
      };

      const response = await request(app.getHttpServer())
        .post('/environments/1/flags/1/webhooks')
        .set('Authorization', `Bearer ${access_token}`)
        .send(validWebhook)
        .expect(201);

      const { uuid, ...obj } = response.body;

      expect(uuid).toBeDefined();
      expect(obj).toMatchObject({
        endpoint: 'https://hello.com',
        event: 'ACTIVATION',
      });
    });
  });

  describe('/environments/1/flags/1/webhooks (GET)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/environments/1/flags/1/webhooks', 'get'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .get('/environments/1/flags/3/webhooks')
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
        .get('/environments/1/flags/1/webhooks')
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
        .get('/environments/1/flags/1/webhooks')
        .set('Authorization', `Bearer ${access_token}`);

      const webhook = response.body[0];

      expect(response.status).toBe(200);
      expect(webhook).toEqual({
        endpoint: 'http://localhost:4000',
        event: 'ACTIVATION',
        flagEnvironmentEnvironmentId: '1',
        flagEnvironmentFlagId: '1',
        secret: 'this is secret',
        uuid: '1',
      });
    });
  });
});
