import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { seedDb, cleanupDb } from '../helpers/seed';
import { prepareApp } from '../helpers/prepareApp';

jest.mock('nanoid', () => ({
  nanoid: () => '12345-marvin',
}));

describe('SdkController (e2e)', () => {
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

  describe('/sdk/unknown-key (GET)', () => {
    it('gives an empty array when the key is invalid', async () => {
      const response = await request(app.getHttpServer()).get(
        '/sdk/unknown-key',
      );

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: 'Bad Request',
        statusCode: 400,
      });
    });
  });

  describe('/sdk/:params (GET)', () => {
    it('gives a list of flags when the key is valid for anonymous user (no field id, no cookies)', async () => {
      const fields = btoa(JSON.stringify({ clientKey: 'valid-sdk-key' }));
      const response = await request(app.getHttpServer()).get(`/sdk/${fields}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        newHomepage: false,
        newFooter: false,
        newHomepageExperiment: 'alternative',
      });
      expect(response.headers['set-cookie']).toMatchInlineSnapshot(`
        Array [
          "progressively-id=12345-marvin; Path=/; Secure; SameSite=Lax",
        ]
      `);
    });

    it('gives a list of flags when the key is valid for an authenticated user (field is passed as query param and match a strategy)', async () => {
      const fields = btoa(
        JSON.stringify({ clientKey: 'valid-sdk-key', id: '1' }),
      );

      const response = await request(app.getHttpServer()).get(`/sdk/${fields}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        newHomepage: false,
        newFooter: true,
        newHomepageExperiment: 'control',
      });
      expect(response.headers['set-cookie']).toMatchInlineSnapshot(`
        Array [
          "progressively-id=1; Path=/; Secure; SameSite=Lax",
        ]
      `);
    });

    it('gives a list of flags when the key is valid for an authenticated user (field is passed as query param and does NOT match a strategy)', async () => {
      const fields = btoa(
        JSON.stringify({
          clientKey: 'valid-sdk-key',
          id: '2',
          newHomepageExperiment: 'control',
        }),
      );

      const response = await request(app.getHttpServer()).get(`/sdk/${fields}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        newHomepage: false,
        newFooter: false,
        newHomepageExperiment: 'control',
      });
      expect(response.headers['set-cookie']).toMatchInlineSnapshot(`
        Array [
          "progressively-id=2; Path=/; Secure; SameSite=Lax",
        ]
      `);
    });

    it('gives a list of flags when the key is valid for an authenticated user (field is passed as cookie and match a strategy)', async () => {
      const fields = btoa(JSON.stringify({ clientKey: 'valid-sdk-key' }));

      const response = await request(app.getHttpServer())
        .get(`/sdk/${fields}`)
        .set('Cookie', ['progressively-id=1; Path=/; Secure; SameSite=Lax']);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        newHomepage: false,
        newFooter: true,
        newHomepageExperiment: 'control',
      });
      expect(response.headers['set-cookie']).toMatchInlineSnapshot(`
        Array [
          "progressively-id=1; Path=/; Secure; SameSite=Lax",
        ]
      `);
    });

    it('gives a list of flags when the key is valid for an authenticated user (field is passed as cookie and does NOT match a strategy)', async () => {
      const fields = btoa(JSON.stringify({ clientKey: 'valid-sdk-key' }));

      const response = await request(app.getHttpServer())
        .get(`/sdk/${fields}`)
        .set('Cookie', ['progressively-id=2; Path=/; Secure; SameSite=Lax']);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        newHomepage: false,
        newFooter: false,
        newHomepageExperiment: 'control',
      });
      expect(response.headers['set-cookie']).toMatchInlineSnapshot(`
        Array [
          "progressively-id=2; Path=/; Secure; SameSite=Lax",
        ]
      `);
    });

    it('gives the alternative variant for A/B experiment when id is 2 (field is passed as query)', async () => {
      const fields = btoa(
        JSON.stringify({
          clientKey: 'valid-sdk-key',
          id: '2',
        }),
      );

      const response = await request(app.getHttpServer()).get(`/sdk/${fields}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        newHomepage: false,
        newFooter: false,
        newHomepageExperiment: 'control',
      });

      expect(response.headers['set-cookie']).toMatchInlineSnapshot(`
        Array [
          "progressively-id=2; Path=/; Secure; SameSite=Lax",
        ]
      `);
    });
  });
});
