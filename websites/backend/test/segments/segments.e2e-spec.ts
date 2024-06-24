import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { seedDb, cleanupDb } from '@progressively/database/seed';
import { authenticate } from '../helpers/authenticate';
import { verifyAuthGuard } from '../helpers/verify-auth-guard';
import { prepareApp } from '../helpers/prepareApp';

describe('Segments (e2e)', () => {
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

  describe('/projects/1/segments (GET)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/projects/1/segments', 'get'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .get('/projects/3/segments')
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
        .get('/projects/1/segments')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives the segments information when the user is authenticated and authorized', async () => {
      const access_token = await authenticate(app);

      const response = await request(app.getHttpServer())
        .get('/projects/1/segments')
        .set('Authorization', `Bearer ${access_token}`);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject([
        {
          uuid: '1',
          name: 'Gmail and french',
          projectUuid: '1',
          segmentRules: [
            {
              fieldComparator: 'contains',
              fieldName: 'email',
              fieldValue: '@gmail.com',
              segmentUuid: '1',
            },
            {
              fieldComparator: 'eq',
              fieldName: 'country',
              fieldValue: 'france',
              segmentUuid: '1',
            },
          ],
          userUuid: '1',
        },
      ]);
    });
  });

  describe('/segments/1 (DELETE)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/segments/1', 'delete'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .delete('/segments/10')
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
        .delete('/segments/1')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives a 200 when a user of the project deletes a segment', async () => {
      const access_token = await authenticate(app);

      const result = await request(app.getHttpServer())
        .delete('/segments/1')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(200);

      expect(result.body).toMatchObject({
        name: 'Gmail and french',
        projectUuid: '1',
        userUuid: '1',
        uuid: '1',
      });
    });
  });

  describe('/projects/:id/segments (PUT)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/projects/1/segments', 'put'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      const validRule: any = {};

      return request(app.getHttpServer())
        .put('/projects/3/segments')
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
        .put('/projects/1/segments')
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

    it('creates a default segment', async () => {
      const access_token = await authenticate(app);

      const response = await request(app.getHttpServer())
        .put('/projects/1/segments')
        .set('Authorization', `Bearer ${access_token}`)
        .send([
          {
            name: 'Hello world',
            segmentRules: [
              {
                fieldName: 'email',
                fieldComparator: 'eq',
                fieldValue: 'marvin.frachet@something.com\njohn.doe@gmail.com',
              },
            ],
          },
        ])
        .expect(200);

      expect(response.body[0].uuid).toBeDefined();
      expect(response.body[0]).toMatchObject({
        name: 'Hello world',
        projectUuid: '1',
        userUuid: '1',
      });
    });

    it('updates an existing segment', async () => {
      const access_token = await authenticate(app);

      const response = await request(app.getHttpServer())
        .put('/projects/1/segments')
        .set('Authorization', `Bearer ${access_token}`)
        .send([
          {
            name: 'Hello world',
            uuid: '1',
            segmentRules: [
              {
                fieldName: 'email',
                fieldComparator: 'eq',
                fieldValue: 'marvin.frachet@something.com\njohn.doe@gmail.com',
              },
            ],
          },
        ])
        .expect(200);

      expect(response.body[0].uuid).toBeDefined();
      expect(response.body[0]).toMatchObject({
        name: 'Hello world',
        projectUuid: '1',
        userUuid: '1',
      });
    });
  });
});
