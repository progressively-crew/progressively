import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { seedDb, cleanupDb } from '../helpers/seed';
import { prepareApp } from '../helpers/prepareApp';

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
});
