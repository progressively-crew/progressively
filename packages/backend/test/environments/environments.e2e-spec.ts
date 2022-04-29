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

  describe('/projects/1/environments (GET)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/projects/1/environments', 'get'));

    it('gives a 403 when the user requests a forbidden project', async () => {
      const access_token = await authenticate(
        app,
        'jane.doe@gmail.com',
        'password',
      );

      return request(app.getHttpServer())
        .get('/projects/1/environments')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives a list of project environments when the user has access to the project', async () => {
      const access_token = await authenticate(
        app,
        'marvin.frachet@gmail.com',
        'password',
      );

      return request(app.getHttpServer())
        .get('/projects/1/environments')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(200)
        .expect([
          {
            uuid: '1',
            name: 'Production',
            projectId: '1',
            clientKey: 'valid-sdk-key',
          },
          {
            uuid: '2',
            name: 'Developer',
            projectId: '1',
            clientKey: 'valid-sdk-key-2',
          },
        ]);
    });
  });

  describe('/projects/1/environments (POST)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/projects/1/environments', 'post'));

    it("gives a 400 when there's no name field", async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .post('/projects/1/environments')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          noNameField: true,
        })
        .expect(400)
        .expect({
          statusCode: 400,
          message: 'Validation failed',
          error: 'Bad Request',
        });
    });

    it('creates an environment when authenticated and providing a good name', async () => {
      const access_token = await authenticate(app);
      const res = await request(app.getHttpServer())
        .post('/projects/1/environments')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          name: 'New env',
        });

      expect(res.body.uuid).toBeTruthy();
      expect(res.body.name).toBe('New env');
      expect(res.body.projectId).toBe('1');
      expect(res.body.clientKey).toBeTruthy();
    });
  });

  describe('/projects/1/environments/1 (DELETE)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/projects/1/environments/1', 'delete'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .delete('/projects/1/environments/3')
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
        .delete('/projects/1/environments/1')
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
        .delete('/projects/1/environments/1')
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
        .delete('/projects/1/environments/1')
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
});
