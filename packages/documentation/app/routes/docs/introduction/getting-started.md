# Getting started

This section will help you spawn a new Progressively instance you can interact with.

## Quick start (demo purpose, with `docker-compose`)

```bash
$ git clone https://github.com/progressively-crew/progressively
$ cd progressively
$ docker-compose up -d
```

You can now open <a href="http://localhost:3000/welcome" target="_blank" rel="noreferrer">the welcome page</a> to create your admin user.

## Medium start (local development)

Progressively requires 2 databases: <a href="https://www.postgresql.org/" target="_blank" rel="noreferrer">Postgres</a> and <a href="https://redis.io/" target="_blank" rel="noreferrer">Redis</a>. It's up to you to choose how to install them, but for the sake of simplicity in this section, we'll use <a href="https://www.docker.com/" target="_blank" rel="noreferrer">Docker</a>.

```sh
$ git clone https://github.com/progressively-crew/progressively && cd progressively
$ cp ./packages/backend/.env.example ./packages/backend/.env
$ cp ./packages/frontend/.env.example ./packages/frontend/.env
$ docker run --name progressively-db -e POSTGRES_PASSWORD=admin -e POSTGRES_USER=admin -e POSTGRES_DB=progressively -p 5432:5432 -d postgres
$ docker run -it --rm --name progressively-redis -p 6379:6379 -d redis
$ npm run setup && npm run db:prepare
$ npm run start:dev
```

You can now open <a href="http://localhost:3000/welcome" target="_blank" rel="noreferrer">the welcome page</a> to create your admin user.

## Long start (explanations, step by step)

### The stack

This is the stack, in a nutshell, and the links to the various documentation of the involved tool. More precise explanations on the different parts of the project will come later in this document.

- **frontend (dashboard)**: built with [Remix.run](https://remix.run/)
- **backend (API/Websockets)** built with [Nestjs](https://nestjs.com/)
- **database access/migrations** built with [Prisma](https://www.prisma.io/)
- **databases**: [Postgres](https://www.postgresql.org/) and [Redis](https://redis.io/) (for websocket backend)

All of the packages are written in [TypeScript](https://www.typescriptlang.org/).

### The repository

The project repository is a mono-repo managed by [Lerna](https://lerna.js.org/). You can find all the available packages at `./packages` from the root.

It is composed of different pieces:

- **backend**: the API, business logic and websocket servers
- **frontend**: the dashboard server for managing feature flags
- **react**: the sdk to use in React applications
- **sdk-js**: the sdk to use in JavaScript applications (not framework specific)

#### Initializing the project

In order for the project to start, we have to do the following steps:

1. create `.env` files in **backend** and **frontend**
2. start Postgres
3. start Redis
4. Setup the whole project (dependencies, builds etc...)
5. create Postgres tables
6. seed Postgres Data
7. start the **backend**
8. start the **frontend**

**1. create `.env` files in backend and frontend**

The repository has `.env.example` in both these packages that you can rename and modify.

```sh
$  cp ./packages/backend/.env.example ./packages/backend/.env
$  cp ./packages/frontend/.env.example ./packages/frontend/.env
```

**2. start Postgres**

The following command starts a Postgres instance in a Docker container. Note that you will only have to run this command when restarting your machine or when deleting the container.

```sh
# this will start postgres in a local container with a dummy password.
# keep in mind that you can change the password BUT you will have to modify
$ docker run --name progressively-db -e POSTGRES_PASSWORD=admin -e POSTGRES_USER=admin -e POSTGRES_DB=progressively -p 5432:5432 -d postgres
```

**3. start Redis**

The following command starts a Redis instance in a Docker container. Note that you will only have to run this command when restarting your machine or when deleting the container.

```sh
$  docker run -it --rm --name progressively-redis -p 6379:6379 -d redis
```

**4. Setup the whole project (dependencies, builds etc...)**

The following commands install all the packages dependencies and creates lerna packages inter-dependencies.

```sh
$ npm run setup
```

**5. create Postgres tables**

This commands creates the table in Postgres (only necessary to run it one time). Note that Postgres needs to be started.

```sh
$ npm run db:prepare
```

**6. seed Postgres Data**

This commands loads a bunch of data into the database so that you can connect and start interacting.

```sh
$ npm run db:seed
```

You now have access to the following users:

- marvin.frachet@something.com / password
- john.doe@gmail.com / password
- jane.doe@gmail.com / password

**7. start the backend**

In `./packages/backend`, run the following command to start a development server with hot reloading:

```sh
$ npm run dev
```

**8. start the frontend**

In `./packages/frontend`, run the following command to start a development server with hot reloading:

```sh
$ npm run dev
```

---

And your now ready to navigate on http://localhost:3000 (dashboard) and http://localhost:4000 (backend) :).
