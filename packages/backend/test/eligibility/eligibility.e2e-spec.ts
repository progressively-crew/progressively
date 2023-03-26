import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { seedDb, cleanupDb } from '@progressively/database/seed';
import { authenticate } from '../helpers/authenticate';
import { verifyAuthGuard } from '../helpers/verify-auth-guard';
import { prepareApp } from '../helpers/prepareApp';
import { EligibilityUpdateDTO } from '../../src/eligibility/types';
import { ComparatorEnum } from '../../src//rule/comparators/types';

describe('Eligibility (e2e)', () => {
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

  describe('/eligibilities/1 (DELETE)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/eligibilities/1', 'delete'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .delete('/eligibilities/3')
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
        .delete('/eligibilities/1')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives a 200 when a user of the project deletes a eligibility', async () => {
      const access_token = await authenticate(app);

      await request(app.getHttpServer())
        .delete('/eligibilities/1')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(200)
        .expect({
          uuid: '1',
          fieldName: 'email',
          fieldComparator: 'eq',
          fieldValue: '@gmail.com',
          flagEnvironmentFlagId: '2',
          flagEnvironmentEnvironmentId: '1',
        });

      const after = await request(app.getHttpServer())
        .get('/eligibilities/1')
        .set('Authorization', `Bearer ${access_token}`);

      expect(after.body).toMatchInlineSnapshot(`
        {
          "error": "Not Found",
          "message": "Cannot GET /eligibilities/1",
          "statusCode": 404,
        }
      `);
    });
  });

  describe('/eligibilities/1 (Put)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/eligibilities/1', 'put'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      const validEligibility: EligibilityUpdateDTO = {
        uuid: '3',
        fieldName: 'email',
        fieldValue: '@gmail.com',
        fieldComparator: ComparatorEnum.Equals,
      };

      return request(app.getHttpServer())
        .put('/eligibilities/3')
        .set('Authorization', `Bearer ${access_token}`)
        .send(validEligibility)
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
        .put('/eligibilities/1')
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

    ['fieldName', 'fieldComparator', 'fieldValue'].forEach((field) => {
      it(`gives 400 when "${field}" is invalid`, async () => {
        const access_token = await authenticate(app);

        const invalidEligibility: any = {
          fieldName: 'email',
          fieldValue: '@gmail.com',
          fieldComparator: ComparatorEnum.Equals,
          [field]: undefined,
        };

        await request(app.getHttpServer())
          .put('/eligibilities/1')
          .set('Authorization', `Bearer ${access_token}`)
          .send(invalidEligibility)
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

      const validEligibility: EligibilityUpdateDTO = {
        uuid: '2',
        fieldName: 'email',
        fieldValue: '@gmail.com',
        fieldComparator: ComparatorEnum.Equals,
      };

      const response = await request(app.getHttpServer())
        .put('/eligibilities/1')
        .set('Authorization', `Bearer ${access_token}`)
        .send(validEligibility)
        .expect(200);

      expect(response.body).toMatchObject({
        fieldComparator: 'eq',
        fieldName: 'email',
        fieldValue: '@gmail.com',
        flagEnvironmentFlagId: '2',
        flagEnvironmentEnvironmentId: '1',
      });
    });
  });
});
