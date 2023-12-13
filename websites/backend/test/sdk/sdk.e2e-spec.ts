import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { seedDb, cleanupDb } from '@progressively/database/seed';
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

  beforeAll(async () => {
    await seedDb();
  });

  afterAll(async () => {
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
    it('gives a 401 when the domain requesting does not match the clientKey', async () => {
      const fields = btoa(JSON.stringify({ clientKey: 'valid-sdk-key-2' }));
      const response = await request(app.getHttpServer()).get(`/sdk/${fields}`);

      expect(response.status).toBe(401);
    });

    it('gives a 401 when the secretKey dont match', async () => {
      const fields = btoa(JSON.stringify({}));
      const response = await request(app.getHttpServer())
        .get(`/sdk/${fields}`)
        .set('x-api-key', 'secret-key-23');

      expect(response.status).toBe(401);
    });

    it('gives a 401 when the secretKey and client key are not passed', async () => {
      const fields = btoa(JSON.stringify({}));
      const response = await request(app.getHttpServer()).get(`/sdk/${fields}`);

      expect(response.status).toBe(401);
    });

    it('gives a 200 when the secretKey matches', async () => {
      const fields = btoa(JSON.stringify({}));
      const response = await request(app.getHttpServer())
        .get(`/sdk/${fields}`)
        .set('x-api-key', 'secret-key');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        multivariate: false,
        newFooter: false,
        newHomepage: false,
      });
    });

    it('gives a 200 when the secretKey AND client key matches matches', async () => {
      const fields = btoa(JSON.stringify({ clientKey: 'valid-sdk-key-2' }));
      const response = await request(app.getHttpServer())
        .get(`/sdk/${fields}`)
        .set('x-api-key', 'secret-key-2')
        .set('origin', 'hello-world');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({});
    });

    it('gives a list of flags when the key is valid for anonymous user (no field id, no cookies)', async () => {
      const fields = btoa(JSON.stringify({ clientKey: 'valid-sdk-key' }));
      const response = await request(app.getHttpServer())
        .get(`/sdk/${fields}`)
        .set('origin', 'hello-world');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        newHomepage: false,
        newFooter: false,
        multivariate: false,
      });
      expect(response.headers['set-cookie']).toMatchInlineSnapshot(`
        [
          "progressively-id=12345-marvin; Max-Age=31536000; Path=/; Expires=Thu, 12 Dec 2024 16:03:40 GMT; HttpOnly; Secure; SameSite=None",
        ]
      `);
    });

    it('gives a list of flags when the key is valid for an authenticated user (field is passed as query param)', async () => {
      const fields = btoa(
        JSON.stringify({ clientKey: 'valid-sdk-key', id: '1' }),
      );

      const response = await request(app.getHttpServer())
        .get(`/sdk/${fields}`)
        .set('origin', 'hello-world');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        newHomepage: false,
        newFooter: true,
        multivariate: false,
      });
      expect(response.headers['set-cookie']).toMatchInlineSnapshot(`
        [
          "progressively-id=1; Max-Age=31536000; Path=/; Expires=Thu, 12 Dec 2024 16:03:40 GMT; HttpOnly; Secure; SameSite=None",
        ]
      `);
    });

    it('gives a list of flags when the key is valid for an authenticated user (field is passed as query param and does NOT match a strategy)', async () => {
      const fields = btoa(
        JSON.stringify({
          clientKey: 'valid-sdk-key',
          id: '2',
        }),
      );

      const response = await request(app.getHttpServer())
        .get(`/sdk/${fields}`)
        .set('origin', 'hello-world');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        newHomepage: false,
        newFooter: false,
        multivariate: false,
      });
      expect(response.headers['set-cookie']).toMatchInlineSnapshot(`
        [
          "progressively-id=2; Max-Age=31536000; Path=/; Expires=Thu, 12 Dec 2024 16:03:40 GMT; HttpOnly; Secure; SameSite=None",
        ]
      `);
    });

    it('gives a list of flags when the key is valid for an authenticated user (field is passed as cookie and match a strategy)', async () => {
      const fields = btoa(JSON.stringify({ clientKey: 'valid-sdk-key' }));

      const response = await request(app.getHttpServer())
        .get(`/sdk/${fields}`)
        .set('Cookie', ['progressively-id=1; Path=/; Secure; SameSite=Lax'])
        .set('origin', 'hello-world');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        newHomepage: false,
        newFooter: true,
        multivariate: false,
      });
      expect(response.headers['set-cookie']).toMatchInlineSnapshot(`
        [
          "progressively-id=1; Max-Age=31536000; Path=/; Expires=Thu, 12 Dec 2024 16:03:40 GMT; HttpOnly; Secure; SameSite=None",
        ]
      `);
    });

    it('gives a list of flags when the key is valid for an authenticated user (field is passed as cookie and does NOT match a strategy)', async () => {
      const fields = btoa(JSON.stringify({ clientKey: 'valid-sdk-key' }));

      const response = await request(app.getHttpServer())
        .get(`/sdk/${fields}`)
        .set('Cookie', ['progressively-id=2; Path=/; Secure; SameSite=Lax'])
        .set('origin', 'hello-world');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        newHomepage: false,
        newFooter: false,
        multivariate: false,
      });
      expect(response.headers['set-cookie']).toMatchInlineSnapshot(`
        [
          "progressively-id=2; Max-Age=31536000; Path=/; Expires=Thu, 12 Dec 2024 16:03:40 GMT; HttpOnly; Secure; SameSite=None",
        ]
      `);
    });

    it('gives a list of flags when the key is valid for an authenticated user with scheduling', async () => {
      const fields = btoa(JSON.stringify({ clientKey: 'valid-sdk-key' }));

      const response = await request(app.getHttpServer())
        .get(`/sdk/${fields}`)
        .set('Cookie', ['progressively-id=2; Path=/; Secure; SameSite=Lax'])
        .set('origin', 'hello-world');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        newHomepage: false,
        newFooter: false,
        multivariate: false,
      });

      // The schedule should happen 10 seconds after the seeding process
      // Waiting 12 seconds should ensure the flag is switching
      await new Promise((resolve) => setTimeout(resolve, 12000));

      const response2 = await request(app.getHttpServer())
        .get(`/sdk/${fields}`)
        .set('Cookie', ['progressively-id=2; Path=/; Secure; SameSite=Lax']);

      expect(response2.status).toBe(200);
      expect(response2.body).toEqual({
        newHomepage: true,
        newFooter: false,
        multivariate: false,
      });
    }, 20000);
  });

  describe('/sdk/:params (Post)', () => {
    it('gives a 400 when the parameter is not valid', () => {
      const fields = btoa(JSON.stringify({ clientKey: 'valid-sdk-key' }));

      return request(app.getHttpServer())
        .post(`/sdk/${fields}`)
        .send({})
        .set('origin', 'hello-world')
        .expect(400);
    });

    it('gives a 401 when there s no env associated to the clientkey', () => {
      const fields = btoa(JSON.stringify({ clientKey: 'valid-sdk-kefey' }));

      return request(app.getHttpServer())
        .post(`/sdk/${fields}`)
        .send({ name: 'hello' })
        .set('origin', 'hello-world')
        .expect(401);
    });

    it('gives a 201 when the hit is valid', () => {
      const fields = btoa(JSON.stringify({ clientKey: 'valid-sdk-key' }));

      return request(app.getHttpServer())
        .post(`/sdk/${fields}`)
        .send({ name: 'A metric' })
        .set('origin', 'hello-world')
        .expect(201);
    });

    it('gives a 201 when the hit is valid with number data', () => {
      const fields = btoa(JSON.stringify({ clientKey: 'valid-sdk-key' }));

      return request(app.getHttpServer())
        .post(`/sdk/${fields}`)
        .send({ name: 'A metric', data: 1 })
        .set('origin', 'hello-world')
        .expect(201);
    });

    it('gives a 201 when the hit is valid with string data', () => {
      const fields = btoa(JSON.stringify({ clientKey: 'valid-sdk-key' }));

      return request(app.getHttpServer())
        .post(`/sdk/${fields}`)
        .send({ name: 'A metric', data: '1' })
        .set('origin', 'hello-world')
        .expect(201);
    });

    it('gives a 201 when the hit is valid with object data', () => {
      const fields = btoa(JSON.stringify({ clientKey: 'valid-sdk-key' }));

      return request(app.getHttpServer())
        .post(`/sdk/${fields}`)
        .send({ name: 'A metric', data: { hello: 'world' } })
        .set('origin', 'hello-world')
        .expect(201);
    });

    it('gives a 401 when the secretKey dont match', async () => {
      const fields = btoa(JSON.stringify({}));
      const response = await request(app.getHttpServer())
        .post(`/sdk/${fields}`)
        .send({ name: 'hello' })
        .set('x-api-key', 'secret-key-23');

      expect(response.status).toBe(401);
    });

    it('gives a 401 when the secretKey and client key are not passed', async () => {
      const fields = btoa(JSON.stringify({}));
      const response = await request(app.getHttpServer())
        .post(`/sdk/${fields}`)
        .send({ name: 'A metric', data: { hello: 'world' } });

      expect(response.status).toBe(401);
    });

    it('gives a 200 when the secretKey matches', async () => {
      const fields = btoa(JSON.stringify({}));
      const response = await request(app.getHttpServer())
        .post(`/sdk/${fields}`)
        .send({ name: 'hello' })
        .set('x-api-key', 'secret-key');

      expect(response.status).toBe(201);
    });

    it('gives a 200 when the secretKey AND client key matches matches', async () => {
      const fields = btoa(JSON.stringify({ clientKey: 'valid-sdk-key-2' }));
      const response = await request(app.getHttpServer())
        .post(`/sdk/${fields}`)
        .send({ name: 'hello' })
        .set('x-api-key', 'secret-key-2');

      expect(response.status).toBe(201);
    });
  });
});
