import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { authenticate } from '../helpers/authenticate';
import { prepareApp } from '../helpers/prepareApp';
import { seedDb, cleanupDb } from '@progressively/database/seed';
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

    it('gives a 200 and removes only the flags of this env', async () => {
      const access_token = await authenticate(app);

      // Pre-create a flag to verify it still exists in other envs
      await request(app.getHttpServer())
        .post('/environments/1/flags')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          name: 'valid name',
          description: 'Valid description',
        });

      // Check that the removal has been done successfully
      await request(app.getHttpServer())
        .delete('/environments/1')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(200);

      // Make sure the user can't access the deleted env anymore
      await request(app.getHttpServer())
        .get('/projects/1/environments')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(200)
        .expect((res) =>
          expect(res.body).toMatchObject([
            {
              clientKey: 'valid-sdk-key-2',
              name: 'Developer',
              projectId: '1',
              uuid: '2',
            },
          ]),
        );

      // Make sure the pre-created flag still exists in the sibling env
      // in the project
      const response = await request(app.getHttpServer())
        .get('/environments/2/flags')
        .set('Authorization', `Bearer ${access_token}`);

      expect(response.statusCode).toBe(200);
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

      const flagEnv = response.body[1];

      expect(response.status).toBe(200);
      expect(flagEnv.flagId).toBeDefined();
      expect(flagEnv.environmentId).toBe('1');
      expect(flagEnv.status).toBe('ACTIVATED');
      expect(flagEnv.flag.uuid).toBeDefined();
      expect(flagEnv.flag.createdAt).toBeDefined();
      expect(flagEnv.flag.name).toBe('New footer');
      expect(flagEnv.flag.description).toBe('Switch the new footer design');
    });
  });

  describe('/environments/1/rotate (POST)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/environments/1/rotate', 'post'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .post('/environments/3/rotate')
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
        .post('/environments/1/rotate')
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
        .post('/environments/1/rotate')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives a 200 when possible', async () => {
      const access_token = await authenticate(app);

      // Check that the removal has been done successfully
      return request(app.getHttpServer())
        .post('/environments/1/rotate')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(201);
    });
  });
});
