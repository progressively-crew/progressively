import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { seedDb, cleanupDb } from '../helpers/seed';
import { prepareApp } from '../helpers/prepareApp';
import { authenticate } from '../helpers/authenticate';
import { verifyAuthGuard } from '../helpers/verify-auth-guard';

describe('Environments (e2e)', () => {
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

  describe('/environments/1 (DELETE)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/environments/1', 'delete'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .delete('/environments/3')
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
        .delete('/environments/1')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives a 403 when the user is not allowed to perform the action', async () => {
      const access_token = await authenticate(
        app,
        'john.doe@gmail.com',
        'password',
      );

      return request(app.getHttpServer())
        .delete('/environments/1')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives a 200 when the user is allowed to perform the action', async () => {
      const access_token = await authenticate(app);

      const response = await request(app.getHttpServer())
        .delete('/environments/1')
        .set('Authorization', `Bearer ${access_token}`);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Production');
      expect(response.body.uuid).toBe('1');
      expect(response.body.clientKey).toBeTruthy();

      // Make sure the user can't access the project anymore
      const getResponse = await request(app.getHttpServer())
        .get('/projects/1/environments')
        .set('Authorization', `Bearer ${access_token}`);

      expect(getResponse.status).toBe(200);
      // Should not contain "production"
      expect(getResponse.body).toEqual([
        {
          clientKey: 'valid-sdk-key-2',
          name: 'Developer',
          projectId: '1',
          uuid: '2',
        },
      ]);
    });
  });

  describe('/environments/1/flags (GET)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/environments/1/flags', 'get'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .get('/environments/3/flags')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives a 403 when the user is not allowed to access these information', async () => {
      const access_token = await authenticate(
        app,
        'jane.doe@gmail.com',
        'password',
      );

      return request(app.getHttpServer())
        .get('/environments/1/flags')
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
        .get('/environments/1/flags')
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

  describe('/environments/1/flags (POST)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/environments/1/flags', 'post'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .post('/environments/3/flags')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          name: 'New flag',
          description: 'The new flag aims to xxx',
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
        .post('/environments/1/flags')
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
        .post('/environments/1/flags')
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
        .post('/environments/1/flags')
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
        .post('/environments/1/flags')
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
        .post('/environments/1/flags')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          name: 'New flag',
          description: 'The new flag aims to xxx',
        });

      return request(app.getHttpServer())
        .post('/environments/1/flags')
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
});
