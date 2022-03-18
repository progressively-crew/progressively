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
        'marvin.frachet@gmail.com',
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
        'marvin.frachet@gmail.com',
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

  describe('/projects/1/environments/1/flags (GET)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/projects/1/environments/1/flags', 'get'));

    it('gives a 403 when the user is not allowed to access these information', async () => {
      const access_token = await authenticate(
        app,
        'jane.doe@gmail.com',
        'password',
      );

      return request(app.getHttpServer())
        .get('/projects/1/environments/1/flags')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives a 200 and a list of flags when the user is authorized to access the data', async () => {
      const access_token = await authenticate(app);

      const response = await request(app.getHttpServer())
        .get('/projects/1/environments/1/flags')
        .set('Authorization', `Bearer ${access_token}`);

      const flagEnv = response.body[0];

      expect(response.status).toBe(200);
      expect(flagEnv.flagId).toBeDefined();
      expect(flagEnv.environmentId).toBe('1');
      expect(flagEnv.status).toBe('NOT_ACTIVATED');
      expect(flagEnv.flag.uuid).toBeDefined();
      expect(flagEnv.flag.createdAt).toBeDefined();
      expect(flagEnv.flag.name).toBe('New homepage');
      expect(flagEnv.flag.description).toBe('Switch the new homepage design');
    });
  });

  describe('/projects/1/environments/1/flags/1 (PUT)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/projects/1/environments/1/flags/1', 'put'));

    it('gives a 403 when the user requests a forbidden project', async () => {
      const access_token = await authenticate(
        app,
        'jane.doe@gmail.com',
        'password',
      );

      return request(app.getHttpServer())
        .put('/projects/1/environments/1/flags/1')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives 400 when status is not activated, inactive or not activated', async () => {
      const access_token = await authenticate(
        app,
        'marvin.frachet@gmail.com',
        'password',
      );

      return request(app.getHttpServer())
        .put('/projects/1/environments/1/flags/1')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          status: 'invalid status',
        })
        .expect(400)
        .expect({
          statusCode: 400,
          message: 'Invalid status code',
          error: 'Bad Request',
        });
    });

    ['ACTIVATED', 'INACTIVE', 'NOT_ACTIVATED'].forEach((status) => {
      it(`gives 200 when setting the status of a flag to "${status}"`, async () => {
        const access_token = await authenticate(
          app,
          'marvin.frachet@gmail.com',
          'password',
        );

        return request(app.getHttpServer())
          .put('/projects/1/environments/1/flags/1')
          .set('Authorization', `Bearer ${access_token}`)
          .send({
            status,
          })
          .expect(200)
          .expect({ flagId: '1', environmentId: '1', status });
      });
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

  describe('/projects/1/members/2 (POST)', () => {
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

  describe('/projects/:id/environments/:envId/flags/:flagId/strategies', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(
        app,
        '/projects/1/environments/1/flags/1/strategies',
        'post',
      ));

    it('gives a 403 when the user requests a forbidden project', async () => {
      const access_token = await authenticate(
        app,
        'jane.doe@gmail.com',
        'password',
      );

      return request(app.getHttpServer())
        .post('/projects/1/environments/1/flags/1/strategies')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          name: 'Super strategy',
          strategyRuleType: 'field',
          activationType: 'boolean',
          fieldName: 'email',
          fieldComparator: 'eq',
          fieldValue: 'marvin.frachet@gmail.com\njohn.doe@gmail.com',
        })
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives 400 when the project has noname', async () => {
      const access_token = await authenticate(app);

      const invalidStrategy: any = {
        name: undefined,
        strategyRuleType: 'default',
        activationType: 'boolean',
      };

      await request(app.getHttpServer())
        .post('/projects/1/environments/1/flags/1/strategies')
        .set('Authorization', `Bearer ${access_token}`)
        .send(invalidStrategy)
        .expect(400)
        .expect({
          statusCode: 400,
          message: 'Validation failed',
          error: 'Bad Request',
        });
    });

    it('gives 400 when the project receives a wrong strategy type', async () => {
      const access_token = await authenticate(app);

      const invalidStrategy: any = {
        name: 'Super strategy',
        strategyRuleType: 'invalid strategy',
        activationType: 'boolean',
      };

      await request(app.getHttpServer())
        .post('/projects/1/environments/1/flags/1/strategies')
        .set('Authorization', `Bearer ${access_token}`)
        .send(invalidStrategy)
        .expect(400)
        .expect({
          statusCode: 400,
          message: 'Validation failed',
          error: 'Bad Request',
        });
    });

    it('gives 400 when the project receives a wrong activation type', async () => {
      const access_token = await authenticate(app);

      const invalidStrategy: any = {
        name: 'Super strategy',
        strategyRuleType: 'default',
        activationType: 'not-valid',
      };

      await request(app.getHttpServer())
        .post('/projects/1/environments/1/flags/1/strategies')
        .set('Authorization', `Bearer ${access_token}`)
        .send(invalidStrategy)
        .expect(400)
        .expect({
          statusCode: 400,
          message: 'Validation failed',
          error: 'Bad Request',
        });
    });

    ['fieldName', 'fieldComparator', 'fieldValue'].forEach((field) => {
      it(`gives 400 when the project has a strategy of type "field" but no "${field}"`, async () => {
        const access_token = await authenticate(app);

        const invalidStrategy: any = {
          name: 'Super strategy',
          strategyRuleType: 'field',
          activationType: 'boolean',
          [field]: undefined,
        };

        await request(app.getHttpServer())
          .post('/projects/1/environments/1/flags/1/strategies')
          .set('Authorization', `Bearer ${access_token}`)
          .send(invalidStrategy)
          .expect(400)
          .expect({
            statusCode: 400,
            message: 'Validation failed',
            error: 'Bad Request',
          });
      });
    });

    it('creates a default strategy', async () => {
      const access_token = await authenticate(app);

      const invalidStrategy: any = {
        name: 'Super strategy',
        strategyRuleType: 'default',
        activationType: 'boolean',
      };

      const response = await request(app.getHttpServer())
        .post('/projects/1/environments/1/flags/1/strategies')
        .set('Authorization', `Bearer ${access_token}`)
        .send(invalidStrategy)
        .expect(201);

      const { uuid, ...obj } = response.body;

      expect(uuid).toBeDefined();
      expect(obj).toEqual({
        name: 'Super strategy',
        strategyRuleType: 'default',
        fieldName: null,
        fieldComparator: null,
        fieldValue: null,
        activationType: 'boolean',
        rolloutPercentage: null,
        flagEnvironmentFlagId: '1',
        flagEnvironmentEnvironmentId: '1',
      });
    });

    it('creates a field strategy', async () => {
      const access_token = await authenticate(app);

      const validStrategy: any = {
        name: 'Super strategy',
        strategyRuleType: 'field',
        activationType: 'boolean',
        fieldName: 'email',
        fieldComparator: 'eq',
        fieldValue: 'marvin.frachet@gmail.com\njohn.doe@gmail.com',
      };

      const response = await request(app.getHttpServer())
        .post('/projects/1/environments/1/flags/1/strategies')
        .set('Authorization', `Bearer ${access_token}`)
        .send(validStrategy)
        .expect(201);

      const { uuid, ...obj } = response.body;

      expect(uuid).toBeDefined();
      expect(obj).toEqual({
        name: 'Super strategy',
        strategyRuleType: 'field',
        fieldName: 'email',
        fieldComparator: 'eq',
        fieldValue: 'marvin.frachet@gmail.com\njohn.doe@gmail.com',
        activationType: 'boolean',
        rolloutPercentage: null,
        flagEnvironmentFlagId: '1',
        flagEnvironmentEnvironmentId: '1',
      });
    });

    it('creates a field strategy with an activation percentage', async () => {
      const access_token = await authenticate(app);

      const validStrategy: any = {
        name: 'Super strategy',
        strategyRuleType: 'field',
        activationType: 'percentage',
        fieldName: 'email',
        fieldComparator: 'eq',
        fieldValue: 'marvin.frachet@gmail.com\njohn.doe@gmail.com',
        rolloutPercentage: 99,
      };

      const response = await request(app.getHttpServer())
        .post('/projects/1/environments/1/flags/1/strategies')
        .set('Authorization', `Bearer ${access_token}`)
        .send(validStrategy)
        .expect(201);

      const { uuid, ...obj } = response.body;

      expect(uuid).toBeDefined();
      expect(obj).toEqual({
        name: 'Super strategy',
        strategyRuleType: 'field',
        fieldName: 'email',
        fieldComparator: 'eq',
        fieldValue: 'marvin.frachet@gmail.com\njohn.doe@gmail.com',
        activationType: 'percentage',
        rolloutPercentage: 99,
        flagEnvironmentFlagId: '1',
        flagEnvironmentEnvironmentId: '1',
      });
    });
  });

  describe('/projects/1/environments/1/flags (POST)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/projects/1/environments/1/flags', 'post'));

    it('gives a 403 when the user requests a forbidden project', async () => {
      const access_token = await authenticate(
        app,
        'jane.doe@gmail.com',
        'password',
      );

      return request(app.getHttpServer())
        .post('/projects/1/environments/1/flags')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it("gives a 400 when there's no name field", async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .post('/projects/1/environments/1/flags')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          description: 'valid description',
        })
        .expect(400)
        .expect({
          statusCode: 400,
          message: 'Validation failed',
          error: 'Bad Request',
        });
    });

    it("gives a 400 when there's no description field", async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .post('/projects/1/environments/1/flags')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          name: 'valid name',
        })
        .expect(400)
        .expect({
          statusCode: 400,
          message: 'Validation failed',
          error: 'Bad Request',
        });
    });

    it('gives a 201 when the flag is created', async () => {
      const access_token = await authenticate(app);
      const res = await request(app.getHttpServer())
        .post('/projects/1/environments/1/flags')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          name: 'New flag',
          description: 'The new flag aims to xxx',
        });

      expect(res.body.uuid).toBeTruthy();
      expect(res.body.name).toBe('New flag');
      expect(res.body.key).toBe('newFlag');
      expect(res.body.description).toBe('The new flag aims to xxx');
      expect(res.body.createdAt).toBeDefined();
    });

    it('gives a 400 when the flag key already exists in the env', async () => {
      // create a flag
      const access_token = await authenticate(app);
      await request(app.getHttpServer())
        .post('/projects/1/environments/1/flags')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          name: 'New flag',
          description: 'The new flag aims to xxx',
        });

      return request(app.getHttpServer())
        .post('/projects/1/environments/1/flags')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
          name: 'New flag',
          description: 'The new flag aims to xxx',
        })
        .expect(400)
        .expect({
          statusCode: 400,
          message: 'Flag already exists',
          error: 'Bad Request',
        });
    });
  });

  describe('/projects/1/environments/1 (DELETE)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/projects/1/environments/1', 'delete'));

    it('gives a 403 when the user requests a forbidden project', async () => {
      const access_token = await authenticate(
        app,
        'jane.doe@gmail.com',
        'password',
      );

      return request(app.getHttpServer())
        .delete('/projects/1/environments/1')
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
        .delete('/projects/1/environments/1')
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
        .delete('/projects/1/environments/1')
        .set('Authorization', `Bearer ${access_token}`);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Production');
      expect(response.body.uuid).toBe('1');
      expect(response.body.clientKey).toBeTruthy();

      // Make sure the user can't access the project anymore
      const getResponse = await request(app.getHttpServer())
        .get('/projects/1/environments')
        .set('Authorization', `Bearer ${access_token}`);

      expect(getResponse.status).toBe(200);
      // Should not contain "production"
      expect(getResponse.body).toEqual([
        {
          clientKey: 'valid-sdk-key-2',
          name: 'Developer',
          projectId: '1',
          uuid: '2',
        },
      ]);
    });
  });

  describe('/projects/:1/environments/1/flags/1/strategies (GET)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(
        app,
        '/projects/1/environments/1/flags/1/strategies',
        'get',
      ));

    it('gives a 403 when the user requests a forbidden project', async () => {
      const access_token = await authenticate(
        app,
        'jane.doe@gmail.com',
        'password',
      );

      return request(app.getHttpServer())
        .get('/projects/1/environments/1/flags/1/strategies')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives the strategies information when the user is authenticated and authorized', async () => {
      const access_token = await authenticate(app);

      const validStrategy: any = {
        name: 'Super strategy',
        strategyRuleType: 'field',
        activationType: 'percentage',
        fieldName: 'email',
        fieldComparator: 'eq',
        fieldValue: 'marvin.frachet@gmail.com\njohn.doe@gmail.com',
        rolloutPercentage: 99,
      };

      // Create a strategy to check it works
      await request(app.getHttpServer())
        .post('/projects/1/environments/1/flags/1/strategies')
        .set('Authorization', `Bearer ${access_token}`)
        .send(validStrategy);

      const response = await request(app.getHttpServer())
        .get('/projects/1/environments/1/flags/1/strategies')
        .set('Authorization', `Bearer ${access_token}`);

      const newStrat = response.body[0];

      expect(response.status).toBe(200);
      expect(newStrat.activationType).toEqual('boolean');
      expect(newStrat.fieldComparator).toEqual(null);
      expect(newStrat.fieldName).toEqual(null);
      expect(newStrat.fieldValue).toEqual(null);
      expect(newStrat.flagEnvironmentEnvironmentId).toEqual('1');
      expect(newStrat.flagEnvironmentFlagId).toEqual('1');
      expect(newStrat.name).toEqual('Super strategy');
      expect(newStrat.rolloutPercentage).toEqual(null);
      expect(newStrat.strategyRuleType).toEqual('default');
      expect(newStrat.uuid).toBeDefined();
    });
  });

  describe('/projects/1/environments/1/flags/1/strategies/1 (GET)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(
        app,
        '/projects/1/environments/1/flags/1/strategies/1',
        'get',
      ));

    it('gives a 403 when the user requests a forbidden project', async () => {
      const access_token = await authenticate(
        app,
        'jane.doe@gmail.com',
        'password',
      );

      return request(app.getHttpServer())
        .get('/projects/1/environments/1/flags/1/strategies/1')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives the strategy when the user is authenticated and authorized', async () => {
      const access_token = await authenticate(app);

      const response = await request(app.getHttpServer())
        .get('/projects/1/environments/1/flags/1/strategies/1')
        .set('Authorization', `Bearer ${access_token}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        activationType: 'boolean',
        fieldComparator: null,
        fieldName: null,
        fieldValue: null,
        flagEnvironmentEnvironmentId: '1',
        flagEnvironmentFlagId: '1',
        name: 'Super strategy',
        rolloutPercentage: null,
        strategyRuleType: 'default',
        uuid: '1',
      });
    });
  });

  describe('/projects/1/environments/1/flags/1/hits (GET)', () => {
    it('gives a 401 when the user is not authenticated', () =>
      verifyAuthGuard(app, '/projects/1/environments/1/flags/1/hits', 'get'));

    it('gives a 403 when the user requests a forbidden project', async () => {
      const access_token = await authenticate(
        app,
        'jane.doe@gmail.com',
        'password',
      );

      return request(app.getHttpServer())
        .get('/projects/1/environments/1/flags/1/hits')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(403)
        .expect({
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('gives the strategies information when the user is authenticated and authorized', async () => {
      const access_token = await authenticate(app);

      return request(app.getHttpServer())
        .get('/projects/1/environments/1/flags/1/hits')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(200)
        .expect([
          { date: '1992-01-01T01:00:00.000Z', _count: { id: 10 } },
          { date: '1992-01-02T01:00:00.000Z', _count: { id: 40 } },
          { date: '1992-01-03T01:00:00.000Z', _count: { id: 20 } },
          { date: '1992-01-06T01:00:00.000Z', _count: { id: 10 } },
        ]);
    });
  });
});
