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

  describe('/flags/sdk/unknown-key (GET)', () => {
    it('gives an empty array when the key is invalid', async () => {
      const response = await request(app.getHttpServer()).get(
        '/flags/sdk/unknown-key',
      );

      expect(response.status).toBe(200);
      expect(response.body).toEqual({});
    });
  });

  describe('/flags/sdk/valid-sdk-key (GET)', () => {
    it('gives a list of flags when the key is valid', async () => {
      const response = await request(app.getHttpServer()).get(
        '/flags/sdk/valid-sdk-key',
      );

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ newHomepage: false });
    });
  });

  describe('/projects/1/environments/1/flags (GET)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/projects/1/environments/1/flags', 'get'));

    it('gives a 403 when the user is not allowed to access these information', async () => {
      const access_token = await authenticate(
        app,
        'jane.doe@gmail.com',
        'password',
      );

      return request(app.getHttpServer())
        .get('/projects/1/environments/1/flags')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives a 200 and a list of flags when the user is authorized to access the data', async () => {
      const access_token = await authenticate(app);

      const response = await request(app.getHttpServer())
        .get('/projects/1/environments/1/flags')
        .set('Authorization', `Bearer ${access_token}`);

      const flagEnv = response.body[0];

      expect(response.status).toBe(200);
      expect(flagEnv.flagId).toBeDefined();
      expect(flagEnv.environmentId).toBe('1');
      expect(flagEnv.status).toBe('NOT_ACTIVATED');
      expect(flagEnv.flag.uuid).toBeDefined();
      expect(flagEnv.flag.createdAt).toBeDefined();
      expect(flagEnv.flag.name).toBe('New homepage');
      expect(flagEnv.flag.description).toBe('Switch the new homepage design');
    });
  });

  describe('/projects/1/environments/1/flags/1 (PUT)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/projects/1/environments/1/flags/1', 'put'));

    it('gives a 403 when the user requests a forbidden project', async () => {
      const access_token = await authenticate(
        app,
        'jane.doe@gmail.com',
        'password',
      );

      return request(app.getHttpServer())
        .put('/projects/1/environments/1/flags/1')
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
        'marvin.frachet@gmail.com',
        'password',
      );

      return request(app.getHttpServer())
        .put('/projects/1/environments/1/flags/1')
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
          'marvin.frachet@gmail.com',
          'password',
        );

        return request(app.getHttpServer())
          .put('/projects/1/environments/1/flags/1')
          .set('Authorization', `Bearer ${access_token}`)
          .send({
            status,
          })
          .expect(200)
          .expect({ flagId: '1', environmentId: '1', status });
      });
    });
  });

  describe('/projects/1/environments/1/flags (POST)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/projects/1/environments/1/flags', 'post'));

    it('gives a 403 when the user requests a forbidden project', async () => {
      const access_token = await authenticate(
        app,
        'jane.doe@gmail.com',
        'password',
      );

      return request(app.getHttpServer())
        .post('/projects/1/environments/1/flags')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it("gives a 400 when there's no name field", async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .post('/projects/1/environments/1/flags')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          description: 'valid description',
        })
        .expect(400)
        .expect({
          statusCode: 400,
          message: 'Validation failed',
          error: 'Bad Request',
        });
    });

    it("gives a 400 when there's no description field", async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .post('/projects/1/environments/1/flags')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          name: 'valid name',
        })
        .expect(400)
        .expect({
          statusCode: 400,
          message: 'Validation failed',
          error: 'Bad Request',
        });
    });

    it('gives a 201 when the flag is created', async () => {
      const access_token = await authenticate(app);
      const res = await request(app.getHttpServer())
        .post('/projects/1/environments/1/flags')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          name: 'New flag',
          description: 'The new flag aims to xxx',
        });

      expect(res.body.uuid).toBeTruthy();
      expect(res.body.name).toBe('New flag');
      expect(res.body.key).toBe('newFlag');
      expect(res.body.description).toBe('The new flag aims to xxx');
      expect(res.body.createdAt).toBeDefined();
    });

    it('gives a 400 when the flag key already exists in the env', async () => {
      // create a flag
      const access_token = await authenticate(app);
      await request(app.getHttpServer())
        .post('/projects/1/environments/1/flags')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          name: 'New flag',
          description: 'The new flag aims to xxx',
        });

      return request(app.getHttpServer())
        .post('/projects/1/environments/1/flags')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          name: 'New flag',
          description: 'The new flag aims to xxx',
        })
        .expect(400)
        .expect({
          statusCode: 400,
          message: 'Flag already exists',
          error: 'Bad Request',
        });
    });
  });

  describe('/projects/1/environments/1/flags/1/hits (GET)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/projects/1/environments/1/flags/1/hits', 'get'));

    it('gives a 403 when the user requests a forbidden project', async () => {
      const access_token = await authenticate(
        app,
        'jane.doe@gmail.com',
        'password',
      );

      return request(app.getHttpServer())
        .get('/projects/1/environments/1/flags/1/hits')
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

      return request(app.getHttpServer())
        .get('/projects/1/environments/1/flags/1/hits')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(200)
        .expect([
          { date: '1992-01-01T01:00:00.000Z', count: 10 },
          { date: '1992-01-02T01:00:00.000Z', count: 40 },
          { date: '1992-01-03T01:00:00.000Z', count: 20 },
          { date: '1992-01-06T01:00:00.000Z', count: 10 },
        ]);
    });
  });

  describe('/projects/1/environments/1/flags/1 (DELETE)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/projects/1/environments/1/flags/1', 'delete'));

    it('gives a 403 when the user requests a forbidden project', async () => {
      const access_token = await authenticate(
        app,
        'jane.doe@gmail.com',
        'password',
      );

      return request(app.getHttpServer())
        .delete('/projects/1/environments/1/flags/1')
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
        .get('/projects/1/environments/1/flags')
        .set('Authorization', `Bearer ${access_token}`);

      expect(prevResponse.body[0]).toMatchObject({
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
      });

      const response = await request(app.getHttpServer())
        .delete('/projects/1/environments/1/flags/1')
        .set('Authorization', `Bearer ${access_token}`);
      expect(response.status).toBe(200);

      const afterResponse = await request(app.getHttpServer())
        .get('/projects/1/environments/1/flags')
        .set('Authorization', `Bearer ${access_token}`);

      expect(afterResponse.body).toEqual([]);
    });
  });
});
