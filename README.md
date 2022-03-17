A personal feature flag solution built with [Nestjs](https://nestjs.com/) and [Remix.run](https://remix.run/).

## Quick start

### Docker

_If you use docker, make sure to have set the environments variables in the [the backend Dockerfile](./packages/@rollout/backend/Dockerfile) in order to receive email for account activation._

```sh
$ docker-compose docker-compose.sqlite.yml up
# or
$ docker-compose docker-compose.postgres.yml up
```

### Development setup

```sh
$ git clone https://github.com/mfrachet/rollout.git
$ cd rollout
$ mv ./packages/@rollout/frontend/.env.example ./packages/@rollout/frontend/.env # rename .env.example to .env
$ mv ./packages/@rollout/backend/.env.example ./packages/@rollout/backend/.env # rename .env.example to .env
$ npm install
$ npm run setup
$ npm run db:prepare:sqlite # or npm run db:prepare:sqlite with the good env variables
$ npm run db:seed # optional will bring some mocking data
$ npm run build
$ npm run start:dev
```

You can open the ui on `http://localhost:3000/signin` and connect with one of these testing account:

- `marvin.frachet@gmail.com` / `password`
- `john.doe@gmail.com` / `password`
- `jane.doe@gmail.com` / `password`

### Running tests

#### Backend tests

The backend is tested from the API endpoints to the db hits. To run the tests, make sure you DON'T have a running backend, get to the backend package (`./packages/@rollout/backend`) and run:

```sh
$ npm run test:e2e
```

#### E2E tests

The project has a bunch of E2E tests using [Cypress](https://www.cypress.io/). The easiest way to run them is to use the SQLITE configuration and then:

- make sure to have the backend running
- make sure to have the frontend running
- inside the frontend package `./packages/@rollout/frontend`, run `$ npm run test:e2e`

And you can now run whatever test you want :).
