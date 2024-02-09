import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { seedDb, cleanupDb } from '@progressively/database/seed';
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

  describe('/flags/1/strategies (GET)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/flags/1/strategies', 'get'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .get('/flags/3/strategies')
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
        .get('/flags/1/strategies')
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
        .get('/flags/1/strategies')
        .set('Authorization', `Bearer ${access_token}`);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject([
        {
          flagUuid: '1',
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

      expect(result.body).toMatchObject({
        uuid: '1',
        flagUuid: '1',
        rolloutPercentage: 100,
        valueToServe: null,
        valueToServeType: 'Boolean',
      });
    });
  });

  describe('/flags/:flagId/strategies (POST)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/flags/1/strategies', 'post'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      const validRule: any = {};

      return request(app.getHttpServer())
        .post('/flags/3/strategies')
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
        .post('/flags/1/strategies')
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
        .post('/flags/1/strategies')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(201);

      expect(response.body.uuid).toBeDefined();
      expect(response.body).toMatchObject({
        flagUuid: '1',
        rolloutPercentage: 100,
      });
    });
  });
});
