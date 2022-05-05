import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { seedDb, cleanupDb } from '../helpers/seed';
import { authenticate } from '../helpers/authenticate';
import { verifyAuthGuard } from '../helpers/verify-auth-guard';
import { prepareApp } from '../helpers/prepareApp';
import { createPasswordToken } from '../helpers/createPasswordToken';

describe('UsersController (e2e)', () => {
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

  describe('/users/me (Get)', () => {
    it('gives the current user when the token is valid', async () => {
      const access_token = await authenticate(app);

      const { body: user } = await request(app.getHttpServer())
        .get('/users/me')
        .set('Authorization', `Bearer ${access_token}`);

      expect(user.email).toEqual('marvin.frachet@something.com');
      expect(user.fullname).toEqual('Marvin Frachet');
      expect(user.uuid).toBeTruthy();
      expect(user.password).toBeFalsy();
    });

    it('gives a 401 when the token is invalid', () =>
      verifyAuthGuard(app, '/users/me', 'get'));
  });

  describe('/users/forgot-password (Post)', () => {
    it('gives 400 when the email is not set', () =>
      request(app.getHttpServer())
        .post('/users/forgot-password')
        .expect(400)
        .expect({
          statusCode: 400,
          message: 'Email is missing',
          error: 'Bad Request',
        }));

    it('gives a valid response when the user exists', () =>
      request(app.getHttpServer())
        .post('/users/forgot-password')
        .send({
          email: 'marvin.frachet@something.com',
        })
        .expect(201)
        .expect({
          success: true,
        }));

    it('gives a valid response when the user does not exist', () =>
      request(app.getHttpServer())
        .post('/users/forgot-password')
        .send({
          email: 'not-existing@gmail.com',
        })
        .expect(201)
        .expect({
          success: true,
        }));
  });

  describe('/users/me (Put)', () => {
    it('gives a 401 when the token is invalid', () =>
      verifyAuthGuard(app, '/users/change-password', 'post'));

    it('gives 400 when the fullname is not set', async () => {
      const access_token = await authenticate(
        app,
        'without.fullname@gmail.com',
        'password',
      );

      return request(app.getHttpServer())
        .put('/users/me')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(400)
        .expect({
          statusCode: 400,
          message: 'Validation failed',
          error: 'Bad Request',
        });
    });

    it('gives 400 when the fullname is less than 1 char', async () => {
      const access_token = await authenticate(
        app,
        'without.fullname@gmail.com',
        'password',
      );

      return request(app.getHttpServer())
        .put('/users/me')
        .set('Authorization', `Bearer ${access_token}`)
        .send({ fullname: '' })
        .expect(400)
        .expect({
          statusCode: 400,
          message: 'Validation failed',
          error: 'Bad Request',
        });
    });

    it('gives a valid response when the user has changed their fullname', async () => {
      const access_token = await authenticate(
        app,
        'without.fullname@gmail.com',
        'password',
      );

      return request(app.getHttpServer())
        .put('/users/me')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          fullname: 'Lola',
        })
        .expect(200)
        .expect({
          email: 'without.fullname@gmail.com',
          fullname: 'Lola',
          uuid: '5',
        });
    });
  });

  describe('/users/reset-password (Post)', () => {
    it('gives 400 when the token is undefined', () =>
      request(app.getHttpServer())
        .post('/users/reset-password')
        .send({
          token: undefined,
          password: 'new password',
        })
        .expect(400)
        .expect({
          statusCode: 400,
          message: 'Validation failed',
          error: 'Bad Request',
        }));

    it('gives 400 when the password is undefined', () =>
      request(app.getHttpServer())
        .post('/users/reset-password')
        .send({
          token: 'valid-token',
          password: undefined,
        })
        .expect(400)
        .expect({
          statusCode: 400,
          message: 'Validation failed',
          error: 'Bad Request',
        }));

    it('gives a 400 when the token is invalid', async () => {
      const dateEnd = new Date();
      await createPasswordToken('1', dateEnd);

      return request(app.getHttpServer())
        .post('/users/reset-password')
        .send({
          token: 'fake-invalid-token',
          password: 'super-new-password1234!',
        })
        .expect(400)
        .expect({
          statusCode: 400,
          message: 'Invalid token',
          error: 'Bad Request',
        });
    });

    it('gives a 400 when the token has expired', async () => {
      const dateEnd = new Date();
      dateEnd.setMinutes(dateEnd.getMinutes() - 10);
      const rawToken = await createPasswordToken('1', dateEnd);

      return request(app.getHttpServer())
        .post('/users/reset-password')
        .send({
          token: rawToken,
          password: 'super-new-password1234!',
        })
        .expect(400)
        .expect({
          statusCode: 400,
          message: 'Invalid token',
          error: 'Bad Request',
        });
    });

    it('gives 201 when the password is updated', async () => {
      const dateEnd = new Date();
      dateEnd.setMinutes(dateEnd.getMinutes() + 15);
      const rawToken = await createPasswordToken('1', dateEnd);

      return request(app.getHttpServer())
        .post('/users/reset-password')
        .send({
          token: rawToken,
          password: 'super-new-password1234!',
        })
        .expect(201)
        .expect({
          success: true,
        });
    });
  });

  describe('/users/change-password (Post)', () => {
    it('gives a 401 when the token is invalid', () =>
      verifyAuthGuard(app, '/users/change-password', 'post'));

    it('gives 400 when the password is not long enough', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .post('/users/change-password')
        .send({ password: 'short', confirmationPassword: 'short' })
        .set('Authorization', `Bearer ${access_token}`)
        .expect(400)
        .expect({
          statusCode: 400,
          message: 'Validation failed',
          error: 'Bad Request',
        });
    });

    it('gives 400 when the confirmation password is not long enough', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .post('/users/change-password')
        .send({
          password: 'password long enough',
          confirmationPassword: 'short',
        })
        .set('Authorization', `Bearer ${access_token}`)
        .expect(400)
        .expect({
          statusCode: 400,
          message: 'Validation failed',
          error: 'Bad Request',
        });
    });

    it('gives 400 when the two password are not the same', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .post('/users/change-password')
        .send({
          password: 'password',
          confirmationPassword: 'password2',
        })
        .set('Authorization', `Bearer ${access_token}`)
        .expect(400)
        .expect({ statusCode: 400, message: 'Bad Request' });
    });

    it('gives 201 when the two password are the same', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .post('/users/change-password')
        .send({
          password: 'password',
          confirmationPassword: 'password',
        })
        .set('Authorization', `Bearer ${access_token}`)
        .expect(201)
        .expect({ success: true });
    });
  });
});
