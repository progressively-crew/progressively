import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { seedDb, cleanupDb } from '../helpers/seed';
import { prepareApp } from '../helpers/prepareApp';
import { verifyAuthGuard } from '../helpers/verify-auth-guard';
import { authenticate } from '../helpers/authenticate';

describe('AbController (e2e)', () => {
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

  describe('experiments/1 (GET)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/experiments/1', 'get'));

    it('gives a 403 when trying to access an invalid experiment', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .get('/experiments/2')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives the experiment when everything is fine', async () => {
      const access_token = await authenticate(app);

      const response = await request(app.getHttpServer())
        .get('/experiments/1')
        .set('Authorization', `Bearer ${access_token}`);

      expect(response.status).toBe(200);
      expect(response.body.uuid).toBe('1');
      expect(response.body.name).toBe('New homepage experiment');
      expect(response.body.key).toBe('newHomepageExperiment');

      expect(response.body.createdAt).toBeDefined();
      expect(response.body.variants).toMatchObject([
        {
          uuid: '1',
          key: 'control',
          name: 'Control variant for home',
          description: 'Controls the homepage variant',
          experimentUuid: '1',
        },
        {
          uuid: '2',
          key: 'alternative',
          name: 'Alternative homepage',
          description: 'Alternative homepage',
          experimentUuid: '1',
        },
      ]);
    });
  });

  describe.only('/experiments/1/variants (POST)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/experiments/1/variants', 'post'));

    it('gives a 403 when trying to access an invalid environment', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .post('/experiments/3/variants')
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

    it('gives a 403 when the user requests a forbidden environment', async () => {
      const access_token = await authenticate(
        app,
        'jane.doe@gmail.com',
        'password',
      );

      return request(app.getHttpServer())
        .post('/experiments/1/variants')
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
        .post('/experiments/1/variants')
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
        .post('/experiments/1/variants')
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

    it('gives a 201 when the experiment is created', async () => {
      const access_token = await authenticate(app);
      const res = await request(app.getHttpServer())
        .post('/experiments/1/variants')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          name: 'New experiment',
          description: 'The new experiment aims to xxx',
        });

      expect(res.body.uuid).toBeTruthy();
      expect(res.body.name).toBe('New experiment');
      expect(res.body.key).toBe('newExperiment');
      expect(res.body.description).toBe('The new experiment aims to xxx');
      expect(res.body.createdAt).toBeDefined();
    });

    it('gives a 400 when the flag key already exists in the env', async () => {
      // create a flag
      const access_token = await authenticate(app);
      await request(app.getHttpServer())
        .post('/experiments/1/variants')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          name: 'New experiment',
          description: 'The new experiment aims to xxx',
        });

      return request(app.getHttpServer())
        .post('/experiments/1/variants')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          name: 'New experiment',
          description: 'The new experiment aims to xxx',
        })
        .expect(400)
        .expect({
          statusCode: 400,
          message: 'Experiment already exists',
          error: 'Bad Request',
        });
    });
  });
});
