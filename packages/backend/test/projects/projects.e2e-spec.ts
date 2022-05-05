import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { seedDb, cleanupDb } from '../helpers/seed';
import { authenticate } from '../helpers/authenticate';
import { verifyAuthGuard } from '../helpers/verify-auth-guard';
import { createProject } from '../helpers/create-project';
import { prepareApp } from '../helpers/prepareApp';

describe('ProjectsController (e2e)', () => {
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

  describe('/projects (POST)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/projects', 'post'));

    it("gives a 400 when there's no name field", async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .post('/projects')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          noNameField: true,
        })
        .expect(400)
        .expect({
          statusCode: 400,
          message: 'Validation failed',
          error: 'Bad Request',
        });
    });

    it('creates a project when authenticated and providing a good name', async () => {
      const [res] = await createProject(app, 'New project of the street');

      expect(res.body.userId).toBeTruthy();
      expect(res.body.projectId).toBeTruthy();
      expect(res.body.role).toBe('admin');
      expect(res.body.project.uuid).toBeTruthy();
      expect(res.body.project.createdAt).toBeTruthy();
      expect(res.body.project.name).toBe('New project of the street');
    });
  });

  describe('/projects (GET)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/projects', 'get'));

    it('lists all of the users projects', async () => {
      const [, access_token] = await createProject(
        app,
        'New project of the street',
      );

      const response = await request(app.getHttpServer())
        .get('/projects')
        .set('Authorization', `Bearer ${access_token}`);

      /**
       * There are two projects in the array and one comes from the seeding
       * making expectation on response.body[0] doesn't look necessary
       */
      const userProject = response.body[1];
      expect(response.status).toBe(200);
      expect(userProject.userId).toBeDefined();
      expect(userProject.projectId).toBeDefined();
      expect(userProject.role).toBe('admin');
      expect(userProject.project.uuid).toBeDefined();
      expect(userProject.project.createdAt).toBeDefined();
      expect(userProject.project.name).toBe('New project of the street');
    });
  });

  describe('/projects/1 (GET)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/projects/1', 'get'));

    it('gives a 403 when the user requests a forbidden project', async () => {
      const access_token = await authenticate(
        app,
        'jane.doe@gmail.com',
        'password',
      );

      return request(app.getHttpServer())
        .get('/projects/1')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives the project information when the user is authenticated and authorized', async () => {
      const access_token = await authenticate(app);

      const response = await request(app.getHttpServer())
        .get('/projects/1')
        .set('Authorization', `Bearer ${access_token}`);

      expect(response.status).toBe(200);
      expect(response.body.uuid).toBeDefined();
      expect(response.body.createdAt).toBeDefined();
      expect(response.body.name).toBe('Project from seeding');
      expect(response.body.userProject).toBeUndefined();
    });

    it('also gives the user information when the "populate" query param is set', async () => {
      const access_token = await authenticate(app);

      const response = await request(app.getHttpServer())
        .get('/projects/1?populate=true')
        .set('Authorization', `Bearer ${access_token}`);

      expect(response.status).toBe(200);
      expect(response.body.uuid).toBeDefined();
      expect(response.body.createdAt).toBeDefined();
      expect(response.body.name).toBe('Project from seeding');
      // user project assertions

      expect(response.body.userProject.length).toBe(2);

      // Marvin
      expect(response.body.userProject[0].user.email).toBe(
        'marvin.frachet@something.com',
      );
      expect(response.body.userProject[0].role).toBe('admin');
      expect(response.body.userProject[0].user.fullname).toBe('Marvin Frachet');
      expect(response.body.userProject[0].user.uuid).toBeDefined();

      // John
      expect(response.body.userProject[1].user.email).toBe(
        'john.doe@gmail.com',
      );
      expect(response.body.userProject[1].role).toBe('user');
      expect(response.body.userProject[1].user.fullname).toBe('John Doe');
      expect(response.body.userProject[1].user.uuid).toBeDefined();
    });
  });

  describe('/projects/1 (DELETE)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/projects/1', 'delete'));

    it('gives a 403 when the user requests a forbidden project', async () => {
      const access_token = await authenticate(
        app,
        'jane.doe@gmail.com',
        'password',
      );

      return request(app.getHttpServer())
        .delete('/projects/1')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives a 403 when the user is not allowed to perform the action', async () => {
      const access_token = await authenticate(
        app,
        'john.doe@gmail.com',
        'password',
      );

      return request(app.getHttpServer())
        .delete('/projects/1')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives a 200 when the user is allowed to perform the action', async () => {
      const access_token = await authenticate(app);

      const response = await request(app.getHttpServer())
        .delete('/projects/1')
        .set('Authorization', `Bearer ${access_token}`);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Project from seeding');
      expect(response.body.uuid).toBe('1');
      expect(response.body.createdAt).toBeTruthy();

      // Make sure the user can't access the project anymore
      const getResponse = await request(app.getHttpServer())
        .get('/projects/1')
        .set('Authorization', `Bearer ${access_token}`);

      expect(getResponse.status).toBe(403);
      expect(getResponse.body).toEqual({
        error: 'Forbidden',
        message: 'Forbidden resource',
        statusCode: 403,
      });
    });
  });

  describe('/projects/1/members/2 (DELETE)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/projects/1/members/2', 'delete'));

    it('gives 403 when the user does not have the role to remove a member', async () => {
      const access_token = await authenticate(
        app,
        'john.doe@gmail.com',
        'password',
      );

      await request(app.getHttpServer())
        .delete('/projects/1/members/2')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives 404 when the user does not exist', async () => {
      const access_token = await authenticate(app);

      await request(app.getHttpServer())
        .delete('/projects/1/members/52')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(404)
        .expect({ statusCode: 404, message: 'Not Found' });
    });

    it('gives 403 when the project does not exist', async () => {
      const access_token = await authenticate(app);

      await request(app.getHttpServer())
        .delete('/projects/12222/members/1')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives 401 when the user to remove is an admin of the project', async () => {
      const access_token = await authenticate(app);

      await request(app.getHttpServer())
        .delete('/projects/1/members/1')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(401)
        .expect({ statusCode: 401, message: 'Unauthorized' });
    });

    it('removes the user from the project', async () => {
      const access_token = await authenticate(app);

      await request(app.getHttpServer())
        .delete('/projects/1/members/2')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(200)
        .expect({ projectId: '1', role: 'user', userId: '2' });
    });
  });

  describe('/projects/1/members (POST)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/projects/1/members', 'post'));

    it('gives 403 when the user does not have the role to remove a member', async () => {
      const access_token = await authenticate(
        app,
        'john.doe@gmail.com',
        'password',
      );

      await request(app.getHttpServer())
        .post('/projects/1/members')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives 201 when the user does not exist in the db (sending an email and all)', async () => {
      const access_token = await authenticate(app);

      const response = await request(app.getHttpServer())
        .post('/projects/1/members')
        .set('Authorization', `Bearer ${access_token}`)
        .send({ email: 'blah.doe@gmail.com' })
        .expect(201);

      expect(response.body).toMatchObject({
        projectId: '1',
        role: 'user',
      });
    });

    it('gives 403 when the project does not exist', async () => {
      const access_token = await authenticate(app);

      await request(app.getHttpServer())
        .post('/projects/1245/members')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives 409 when the user is already a member of the project', async () => {
      const access_token = await authenticate(app);

      await request(app.getHttpServer())
        .post('/projects/1/members')
        .set('Authorization', `Bearer ${access_token}`)
        .send({ email: 'john.doe@gmail.com' })
        .expect(409)
        .expect({
          statusCode: 409,
          message: 'The user is already a member of the project.',
          error: 'Conflict',
        });
    });

    it('adds the user to the project', async () => {
      const access_token = await authenticate(app);

      const response = await request(app.getHttpServer())
        .post('/projects/1/members')
        .set('Authorization', `Bearer ${access_token}`)
        .send({ email: 'jane.doe@gmail.com' })
        .expect(201);

      expect(response.body).toMatchObject({
        projectId: '1',
        role: 'user',
      });
    });
  });

  describe('/projects/1/environments (GET)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/projects/1/environments', 'get'));

    it('gives a 403 when the user requests a forbidden project', async () => {
      const access_token = await authenticate(
        app,
        'jane.doe@gmail.com',
        'password',
      );

      return request(app.getHttpServer())
        .get('/projects/1/environments')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives a list of project environments when the user has access to the project', async () => {
      const access_token = await authenticate(
        app,
        'marvin.frachet@something.com',
        'password',
      );

      return request(app.getHttpServer())
        .get('/projects/1/environments')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(200)
        .expect([
          {
            uuid: '1',
            name: 'Production',
            projectId: '1',
            clientKey: 'valid-sdk-key',
          },
          {
            uuid: '2',
            name: 'Developer',
            projectId: '1',
            clientKey: 'valid-sdk-key-2',
          },
        ]);
    });
  });

  describe('/projects/1/environments (POST)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/projects/1/environments', 'post'));

    it("gives a 400 when there's no name field", async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .post('/projects/1/environments')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          noNameField: true,
        })
        .expect(400)
        .expect({
          statusCode: 400,
          message: 'Validation failed',
          error: 'Bad Request',
        });
    });

    it('creates an environment when authenticated and providing a good name', async () => {
      const access_token = await authenticate(app);
      const res = await request(app.getHttpServer())
        .post('/projects/1/environments')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          name: 'New env',
        });

      expect(res.body.uuid).toBeTruthy();
      expect(res.body.name).toBe('New env');
      expect(res.body.projectId).toBe('1');
      expect(res.body.clientKey).toBeTruthy();
    });
  });
});
