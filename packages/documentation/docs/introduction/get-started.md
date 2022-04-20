# Starting the service

## Get the project from Github

In your favorite terminal with git installed, run the following command:

```sh
$ git clone https://github.com/mfrachet/progressively
```

## Creating `.env` files

> ℹ️ This step is required for both usage — with and without Docker

The next thing to do is to make sure you have a `.env` file in both the `./packages/frontend` and `./packages/backend` packages.

When cloning the repository, a `.env.example` file is created as an example in these packages. Make sure to modify them (there are secrets inside) and rename them from `.env.example` to `.env`.

For instance, you can run the following commands at the root of the project to move the `.env.example` to `.env` files:

```sh
$ mv ./packages/frontend/.env.example ./packages/frontend/.env
$ mv ./packages/backend/.env.example ./packages/backend/.env
```

## Usage with Docker

### With compose

At the root of the project, run the following command:

```sh
$ docker-compose up
```

The dashboard is now available on [http://localhost:3000](http://localhost:3000), the backend APIs are available on [http://localhost:4000/api](http://localhost:4000/api)

### Without compose

You can run the postgres container using the following command:

```sh
# Make sure to modify the user and password ;)
$ docker run --name progressively-db -e POSTGRES_PASSWORD=admin -e POSTGRES_USER=admin -e POSTGRES_DB=progressively -p 5432:5432 -d postgres
```

And make sure the `postgres` database has tables in it:

```sh
$ npm install
$ npm run setup         # prepares the mono-repo
$ npm run db:prepare    # creates the tables
```

You can build and run the backend container using the following command inside `./packages/backend`:

```sh
$ docker build -t progressively-backend .
# Make sure to have a .env file the user/password defined for postgres
$ docker run --env-file .env -p 4000:4000 -p 4001:4001 progressively-backend
```

You can finally build and run the frontend container using the following command inside: `./packages/frontend`:

```sh
$ docker build -t progressively-frontend .
# Make sure to have the .env file with the good variables
$ docker run --env-file .env -p 3000:3000 progressively-frontend
```

The dashboard is now available on [http://localhost:3000](http://localhost:3000), the backend APIs are available on [http://localhost:4000/api](http://localhost:4000/api)

## Usage without Docker

This setup aims to provide a raw installation of the project and can also be used **for contributions**.

Before going further, you need to have a running [Postgres](https://www.postgresql.org/) instance (Docker or locally) with a `progressively` database.

Then, at the root of the project, make sure to run the following commands:

```sh
$ npm install
$ npm run setup         # prepares the mono-repo
$ npm run db:prepare    # creates the tables
$ npm run db:seed       # (optional) will bring some fixtures
$ npm run build         # builds the projects and their inter-dependencies
$ npm run start         # start the frontend and the backend
```

_You can also run `npm run start:dev` if you want to benefit from hot reloading in development mode._

If you have decided to rely on the fixtures, you can now log in the app on `http://localhost:3000/signin` with one of the following account:

- `marvin.frachet@gmail.com` / `password`
- `john.doe@gmail.com` / `password`
- `jane.doe@gmail.com` / `password`
