import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { seedDb, cleanupDb } from '@progressively/database/seed';
import { prepareApp } from '../helpers/prepareApp';

describe('Not authenticated usersController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await prepareApp();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/users (filled db)', () => {
    beforeEach(async () => {
      await seedDb();
    });

    afterEach(async () => {
      await cleanupDb();
    });

    it('shows already registered users when', () =>
      request(app.getHttpServer()).get('/users').expect(200).expect({
        hasUsers: true,
      }));
  });

  describe('/users (empty db)', () => {
    it('shows empty registered users when', () =>
      request(app.getHttpServer()).get('/users').expect(200).expect({
        hasUsers: false,
      }));
  });
});
