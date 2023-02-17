import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { seedDb, cleanupDb } from '@progressively/database/seed';
import { authenticate } from '../helpers/authenticate';
import { verifyAuthGuard } from '../helpers/verify-auth-guard';
import { prepareApp } from '../helpers/prepareApp';
import {
  StrategyUpdateDTO,
  StrategyValueToServe,
} from '../../src/strategy/types';
import { ComparatorEnum } from '../../src/shared/utils/comparators/types';

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

  describe('/strategies/1 (GET)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/strategies/1', 'get'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .get('/strategies/3')
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
        .get('/strategies/1')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives the strategy when the user is authenticated and authorized', async () => {
      const access_token = await authenticate(app);

      const response = await request(app.getHttpServer())
        .get('/strategies/1')
        .set('Authorization', `Bearer ${access_token}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        uuid: '1',
        fieldName: 'id',
        fieldComparator: 'eq',
        fieldValue: '1',
        flagEnvironmentFlagId: '1',
        flagEnvironmentEnvironmentId: '1',
        valueToServe: 'true',
        valueToServeType: 'Boolean',
      });
    });
  });

  describe('/strategies/1 (DELETE)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/strategies/1', 'delete'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .delete('/strategies/3')
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

      const prev = await request(app.getHttpServer())
        .get('/strategies/1')
        .set('Authorization', `Bearer ${access_token}`);

      expect(prev.body).toMatchInlineSnapshot(`
        {
          "fieldComparator": "eq",
          "fieldName": "id",
          "fieldValue": "1",
          "flagEnvironmentEnvironmentId": "1",
          "flagEnvironmentFlagId": "1",
          "uuid": "1",
          "valueToServe": "true",
          "valueToServeType": "Boolean",
        }
      `);

      await request(app.getHttpServer())
        .delete('/strategies/1')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(200)
        .expect({
          uuid: '1',
          fieldName: 'id',
          fieldComparator: 'eq',
          fieldValue: '1',
          flagEnvironmentFlagId: '1',
          flagEnvironmentEnvironmentId: '1',
        });

      const after = await request(app.getHttpServer())
        .get('/strategies/1')
        .set('Authorization', `Bearer ${access_token}`);

      expect(after.body).toMatchInlineSnapshot(`
        {
          "error": "Forbidden",
          "message": "Forbidden resource",
          "statusCode": 403,
        }
      `);
    });
  });

  describe('/strategies/1 (Put)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/strategies/1', 'put'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      const validStrategy: Partial<StrategyUpdateDTO> = {
        uuid: '3',
        fieldName: 'email',
        fieldValue: '@gmail.com',
        fieldComparator: ComparatorEnum.Equals,
      };

      return request(app.getHttpServer())
        .put('/strategies/3')
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
        .put('/strategies/1')
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

    [
      'fieldName',
      'fieldComparator',
      'fieldValue',
      'valueToServe',
      'valueToServeType',
    ].forEach((field) => {
      it(`gives 400 when "${field}" is invalid`, async () => {
        const access_token = await authenticate(app);

        const invalidStrategy: Partial<StrategyUpdateDTO> = {
          fieldName: 'email',
          fieldValue: '@gmail.com',
          fieldComparator: ComparatorEnum.Equals,
          valueToServe: 'false',
          valueToServeType: StrategyValueToServe.Boolean,
          [field]: undefined,
        };

        await request(app.getHttpServer())
          .put('/strategies/1')
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

    it('updates an eligibitilies', async () => {
      const access_token = await authenticate(app);

      const validStrategy: Partial<StrategyUpdateDTO> = {
        uuid: '1',
        fieldName: 'email',
        fieldValue: '@gmail.com\nhello-world',
        fieldComparator: ComparatorEnum.Equals,
        valueToServeType: StrategyValueToServe.String,
        valueToServe: 'hello y all',
      };

      const response = await request(app.getHttpServer())
        .put('/strategies/1')
        .set('Authorization', `Bearer ${access_token}`)
        .send(validStrategy)
        .expect(200);

      expect(response.body).toMatchObject({
        fieldComparator: 'eq',
        fieldName: 'email',
        fieldValue: '@gmail.com\nhello-world',
        flagEnvironmentFlagId: '1',
        flagEnvironmentEnvironmentId: '1',
      });
    });
  });
});
