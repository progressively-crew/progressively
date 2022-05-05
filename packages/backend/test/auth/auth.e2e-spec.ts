import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { seedDb, cleanupDb } from '../helpers/seed';
import { prepareApp } from '../helpers/prepareApp';

describe('AuthController (e2e)', () => {
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

  describe('/auth/login (POST)', () => {
    it("gives a 401 when there's no email field", () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          password: '1234567fzafa',
        })
        .expect(401)
        .expect({
          statusCode: 401,
          message: 'Unauthorized',
        });
    });

    it("gives a 401 when there's no password field", () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          username: 'james.bond@gmail.com',
        })
        .expect(401)
        .expect({
          statusCode: 401,
          message: 'Unauthorized',
        });
    });

    it('gives back the user when authentication is working', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          username: 'marvin.frachet@something.com',
          password: 'password',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.access_token).toBeTruthy();
        });
    });

    it('gives a 401 when the username and password dont match', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          username: 'marvin.frachet@something.com',
          password: 'passwordo',
        })
        .expect(401)
        .expect({
          statusCode: 401,
          message: 'Unauthorized',
        });
    });

    it('gives a 401 when the user has not activated its account', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          username: 'gina.doe@gmail.com',
          password: 'password',
        })
        .expect(401)
        .expect({
          statusCode: 401,
          message: 'Unauthorized',
        });
    });
  });

  describe('/auth/register (POST)', () => {
    describe('with ALLOW_REGISTRATION=undefined', () => {
      beforeAll(() => {
        process.env.ALLOW_REGISTRATION = undefined;
      });

      it('gives a 404 when there are existing users', () => {
        return request(app.getHttpServer())
          .post('/auth/register')
          .send({
            email: 'james.bond@gmail.com',
            password: '123456789',
            fullname: 'James Bond',
          })
          .expect(404)
          .expect({ statusCode: 404, message: 'Not Found' });
      });

      it('gives a 201 when there are no existing users', async () => {
        await cleanupDb();

        return request(app.getHttpServer())
          .post('/auth/register')
          .send({
            email: 'james.bond@gmail.com',
            password: '123456789',
            fullname: 'James Bond',
          })
          .expect(201)
          .expect((res) => {
            expect(res.body.uuid).toBeTruthy();
            expect(res.body.email).toBe('james.bond@gmail.com');
            expect(res.body.fullname).toBe('James Bond');
            expect(res.body.password).toBeFalsy();
          });
      });
    });

    describe('with ALLOW_REGISTRATION=true', () => {
      beforeAll(() => {
        process.env.ALLOW_REGISTRATION = 'true';
      });

      it("gives a 400 when there's no email field", () => {
        return request(app.getHttpServer())
          .post('/auth/register')
          .send({
            password: '1234567fzafa',
            fullname: 'Valid username',
          })
          .expect(400)
          .expect({
            statusCode: 400,
            message: 'Validation failed',
            error: 'Bad Request',
          });
      });

      it("gives a 400 when there's no password field", () => {
        return request(app.getHttpServer())
          .post('/auth/register')
          .send({
            email: 'james.bond@gmail.com',
            fullname: 'Valid username',
          })
          .expect(400)
          .expect({
            statusCode: 400,
            message: 'Validation failed',
            error: 'Bad Request',
          });
      });

      it("gives a 400 when there's no fullname field", () => {
        return request(app.getHttpServer())
          .post('/auth/register')
          .send({
            email: 'james.bond@gmail.com',
            password: 'dzoafhzaohfozajfozjfozajf',
          })
          .expect(400)
          .expect({
            statusCode: 400,
            message: 'Validation failed',
            error: 'Bad Request',
          });
      });

      it('gives a 400 when the email field is invalid', () => {
        return request(app.getHttpServer())
          .post('/auth/register')
          .send({
            email: 'invalid email',
            password: 'valid-password-for-the-job',
            fullname: 'Valid username',
          })
          .expect(400)
          .expect({
            statusCode: 400,
            message: 'Validation failed',
            error: 'Bad Request',
          });
      });

      it('gives a 400 when the password field is less than 7 chars', () => {
        return request(app.getHttpServer())
          .post('/auth/register')
          .send({
            email: 'james.bond@gmail.com',
            password: '1234567',
            fullname: 'Valid username',
          })
          .expect(400)
          .expect({
            statusCode: 400,
            message: 'Validation failed',
            error: 'Bad Request',
          });
      });

      it('throws when the user email is already used', () => {
        return request(app.getHttpServer())
          .post('/auth/register')
          .send({
            email: 'marvin.frachet@something.com',
            password: '123456789',
            fullname: 'James Bond',
          })
          .expect(400)
          .expect({
            statusCode: 400,
            message: 'This email is already used.',
            error: 'Bad Request',
          });
      });

      it('creates a user when passing the good arguments', () => {
        return request(app.getHttpServer())
          .post('/auth/register')
          .send({
            email: 'james.bond@gmail.com',
            password: '123456789',
            fullname: 'James Bond',
          })
          .expect(201)
          .expect((res) => {
            expect(res.body.uuid).toBeTruthy();
            expect(res.body.email).toBe('james.bond@gmail.com');
            expect(res.body.fullname).toBe('James Bond');
            expect(res.body.password).toBeFalsy();
          });
      });
    });
  });
});
