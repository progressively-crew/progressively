import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { seedDb, cleanupDb } from '@progressively/database/seed';
import { prepareApp } from '../helpers/prepareApp';
import { MockService } from '../../src/queuing/concrete/MockService';

jest.mock('../../src/queuing/queuing.service.factory', () => ({
  MakeQueuingService: () => new MockService(),
}));

jest.mock('../../src/crypto/crypto.service', () => ({
  CryptoService: {
    hash: (x: string) => Promise.resolve(x),
    murmurhash: (x: string) => x,
  },
}));

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

    it('gives a list of flags when the key is valid for anonymous user (no field id, no user agent)', async () => {
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
    });

    it('gives a list of flags when the key is valid for an authenticated user (field is passed as query param)', async () => {
      const fields = btoa(
        JSON.stringify({ clientKey: 'valid-sdk-key', id: '1::ffff:127.0.0.1' }),
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
    });

    it('gives a list of flags when the key is valid for an authenticated user (field is passed as user agent and match a strategy)', async () => {
      const fields = btoa(JSON.stringify({ clientKey: 'valid-sdk-key' }));

      const response = await request(app.getHttpServer())
        .get(`/sdk/${fields}`)
        .set('user-agent', '1')
        .set('origin', 'hello-world');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        newHomepage: false,
        newFooter: true,
        multivariate: false,
      });
    });

    it('gives a list of flags when the key is valid for an authenticated user (field is passed as user agent and does NOT match a strategy)', async () => {
      const fields = btoa(JSON.stringify({ clientKey: 'valid-sdk-key' }));

      const response = await request(app.getHttpServer())
        .get(`/sdk/${fields}`)
        .set('user-agent', '2')
        .set('origin', 'hello-world');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        newHomepage: false,
        newFooter: false,
        multivariate: false,
      });
    });
  });

  describe('/sdk/:params (Post)', () => {
    it('gives a 400 when the parameter is not valid', () => {
      const fields = btoa(JSON.stringify({ clientKey: 'valid-sdk-key' }));

      return request(app.getHttpServer())
        .post(`/sdk/${fields}`)
        .send([{}])
        .set('origin', 'hello-world')
        .expect(400);
    });

    it('gives a 201 when there s no env associated to the clientkey (just queued but not handled)', () => {
      const fields = btoa(JSON.stringify({ clientKey: 'valid-sdk-kefey' }));

      return request(app.getHttpServer())
        .post(`/sdk/${fields}`)
        .send([{ name: 'hello', url: 'http://localhost:300/' }])
        .set('origin', 'hello-world')
        .expect(201);
    });

    it('gives a 201 when the hit is valid', () => {
      const fields = btoa(JSON.stringify({ clientKey: 'valid-sdk-key' }));

      return request(app.getHttpServer())
        .post(`/sdk/${fields}`)
        .send([{ name: 'A metric', url: 'http://localhost:300/' }])
        .set('origin', 'hello-world')
        .expect(201);
    });

    it('gives a 201 when the hit is valid with number data', () => {
      const fields = btoa(JSON.stringify({ clientKey: 'valid-sdk-key' }));

      return request(app.getHttpServer())
        .post(`/sdk/${fields}`)
        .send([{ name: 'A metric', data: 1, url: 'http://localhost:300/' }])
        .set('origin', 'hello-world')
        .expect(201);
    });

    it('gives a 201 when the hit is valid with string data', () => {
      const fields = btoa(JSON.stringify({ clientKey: 'valid-sdk-key' }));

      return request(app.getHttpServer())
        .post(`/sdk/${fields}`)
        .send([{ name: 'A metric', data: '1', url: 'http://localhost:300/' }])
        .set('origin', 'hello-world')
        .expect(201);
    });

    it('gives a 201 when the hit is valid with object data', () => {
      const fields = btoa(JSON.stringify({ clientKey: 'valid-sdk-key' }));

      return request(app.getHttpServer())
        .post(`/sdk/${fields}`)
        .send([
          {
            name: 'A metric',
            data: { hello: 'world' },
            url: 'http://localhost:300/',
          },
        ])
        .set('origin', 'hello-world')
        .expect(201);
    });

    it('gives a 201 when the secretKey dont match (handled in a queue)', async () => {
      const fields = btoa(JSON.stringify({}));
      const response = await request(app.getHttpServer())
        .post(`/sdk/${fields}`)
        .send([{ name: 'hello', url: 'http://localhost:300/' }])
        .set('x-api-key', 'secret-key-23');

      expect(response.status).toBe(201);
    });

    it('gives a 201 when the secretKey and client key are not passed (handled in a queue)', async () => {
      const fields = btoa(JSON.stringify({}));
      const response = await request(app.getHttpServer())
        .post(`/sdk/${fields}`)
        .send([
          {
            name: 'A metric',
            data: { hello: 'world' },
            url: 'http://localhost:300/',
          },
        ]);

      expect(response.status).toBe(201);
    });

    it('gives a 200 when the secretKey matches', async () => {
      const fields = btoa(JSON.stringify({}));
      const response = await request(app.getHttpServer())
        .post(`/sdk/${fields}`)
        .send([{ name: 'hello', url: 'http://localhost:300/' }])
        .set('x-api-key', 'secret-key');

      expect(response.status).toBe(201);
    });

    it('gives a 200 when the secretKey AND client key matches matches', async () => {
      const fields = btoa(JSON.stringify({ clientKey: 'valid-sdk-key-2' }));
      const response = await request(app.getHttpServer())
        .post(`/sdk/${fields}`)
        .send([{ name: 'hello', url: 'http://localhost:300/' }])
        .set('x-api-key', 'secret-key-2');

      expect(response.status).toBe(201);
    });
  });
});
