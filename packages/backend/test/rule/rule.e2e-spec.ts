import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { seedDb, cleanupDb } from '@progressively/database/seed';
import { authenticate } from '../helpers/authenticate';
import { verifyAuthGuard } from '../helpers/verify-auth-guard';
import { prepareApp } from '../helpers/prepareApp';
import { ComparatorEnum } from '../../src/rule/comparators/types';
import { RuleType, RuleUpdateDto } from '../../src/rule/types';

describe('Rule (e2e)', () => {
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

  describe('/rules/1 (DELETE)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/rules/1', 'delete'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .delete('/rules/3')
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
        .delete('/rules/1')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives a 200 when a user of the project deletes a rule', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .delete('/rules/1')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(200)
        .expect({
          uuid: '1',
          fieldName: 'email',
          fieldComparator: 'eq',
          fieldValue: 'gmail.com',
          segmentUuid: '1',
          strategyUuid: null,
          Segment: {
            uuid: '1',
            name: 'By email address',
            flagEnvironmentFlagId: '1',
            flagEnvironmentEnvironmentId: '1',
          },
          Strategy: null,
        });
    });
  });

  describe('/rules/1 (Put)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/rules/1', 'put'));

    it('gives a 403 when trying to access a valid project but an invalid env', async () => {
      const access_token = await authenticate(app);

      const rule: RuleType = {
        fieldName: 'email',
        fieldValue: '@gmail.com',
        fieldComparator: ComparatorEnum.Equals,
      };

      return request(app.getHttpServer())
        .put('/rules/3')
        .set('Authorization', `Bearer ${access_token}`)
        .send(rule)
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
        .put('/rules/1')
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

        const invalidRule: any = {
          fieldName: 'email',
          fieldValue: '@gmail.com',
          fieldComparator: ComparatorEnum.Equals,
          [field]: undefined,
        };

        await request(app.getHttpServer())
          .put('/rules/1')
          .set('Authorization', `Bearer ${access_token}`)
          .send(invalidRule)
          .expect(400)
          .expect({
            statusCode: 400,
            message: 'Validation failed',
            error: 'Bad Request',
          });
      });
    });

    it(`gives 400 when the rule dto is valid, passed but segmentUuid too`, async () => {
      const access_token = await authenticate(app);

      const invalidRule: any = {
        fieldName: 'email',
        fieldValue: '@gmail.com',
        fieldComparator: ComparatorEnum.Equals,
        segmentUuid: '1',
      };

      await request(app.getHttpServer())
        .put('/rules/1')
        .set('Authorization', `Bearer ${access_token}`)
        .send(invalidRule)
        .expect(400)
        .expect({
          statusCode: 400,
          message: 'Validation failed',
          error: 'Bad Request',
        });
    });

    it('updates a rule', async () => {
      const access_token = await authenticate(app);

      const validRule: RuleType = {
        fieldName: 'id',
        fieldValue: '1234',
        fieldComparator: ComparatorEnum.Contains,
      };

      const response = await request(app.getHttpServer())
        .put('/rules/1')
        .set('Authorization', `Bearer ${access_token}`)
        .send(validRule)
        .expect(200);

      expect(response.body).toEqual({
        Segment: {
          flagEnvironmentEnvironmentId: '1',
          flagEnvironmentFlagId: '1',
          name: 'By email address',
          uuid: '1',
        },
        fieldComparator: 'contains',
        fieldName: 'id',
        fieldValue: '1234',
        segmentUuid: '1',
        uuid: '1',
        strategyUuid: null,
        Strategy: null,
      });
    });

    it('updates a rule with a segmentUuid', async () => {
      const access_token = await authenticate(app);

      const validRule: RuleUpdateDto = {
        fieldName: undefined,
        fieldValue: undefined,
        fieldComparator: undefined,
        segmentUuid: '2',
      };

      const response = await request(app.getHttpServer())
        .put('/rules/1')
        .set('Authorization', `Bearer ${access_token}`)
        .send(validRule)
        .expect(200);

      expect(response.body).toEqual({
        Segment: {
          flagEnvironmentEnvironmentId: '1',
          flagEnvironmentFlagId: '1',
          name: 'By id',
          uuid: '2',
        },
        fieldComparator: null,
        fieldName: null,
        fieldValue: null,
        segmentUuid: '2',
        uuid: '1',
        strategyUuid: null,
        Strategy: null,
      });
    });
  });
});
