A personal feature flag solution built with [Nestjs](https://nestjs.com/) and [Remix.run](https://remix.run/).

## Quick start

### Docker

_If you use docker, make sure to have set the environments variables in the [the backend Dockerfile](./packages/@rollout/backend/Dockerfile) in order to receive email for account activation._

```sh
# or
$ docker-compose up
```

### Development setup

> :warning: the following database username and password are for development ONLY. They are not secured at all, but easy to remember when developing locally. If you want to use another user and password in production (and make sure to do it), don't forget to modify the `.env` file of the backend so that it can access it.

#### Run a postgres instance

##### With docker

```sh
$ docker run --name rollout-db -e POSTGRES_PASSWORD=admin -e POSTGRES_USER=admin -e POSTGRES_DB=rollout -p 5432:5432 -d postgres
```

##### Manually

You can install [Postgres manually on its website](https://www.postgresql.org/). In development (and according to the `.env` file), you may need to:

- create a user `admin` with password `admin` (again, for dev only)
- create a database with name `rollout`

#### Setup the project

```sh
$ git clone https://github.com/mfrachet/rollout.git
$ cd rollout
$ mv ./packages/@rollout/frontend/.env.example ./packages/@rollout/frontend/.env # rename .env.example to .env
$ mv ./packages/@rollout/backend/.env.example ./packages/@rollout/backend/.env # rename .env.example to .env
$ npm install
$ npm run setup
$ npm run db:prepare
$ npm run db:seed # optional will bring some mocking data
$ npm run build
$ npm run start:dev
```

You can now:

- Navigate the frontend app on `http://localhost:3000/` and connect with one of these testing account:

  - `marvin.frachet@gmail.com` / `password`
  - `john.doe@gmail.com` / `password`
  - `jane.doe@gmail.com` / `password`

- Navigate the API on `http://localhost:4000` and the swagger on `http://localhost:4000/api/`

### Running tests

#### Backend tests

The backend is tested from the API endpoints to the db hits. To run the tests, make sure you DON'T have a running backend, get to the backend package (`./packages/@rollout/backend`) and run:

```sh
$ npm run test:e2e
```

#### E2E tests

The project has a bunch of E2E tests using [Cypress](https://www.cypress.io/):

- make sure to have postgres running
- make sure to have the backend running
- make sure to have the frontend running
- inside the frontend package `./packages/@rollout/frontend`, run `$ npm run test:e2e`

And you can now run whatever test you want :).
