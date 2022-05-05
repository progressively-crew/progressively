# Raw installation

## Initial setup (mandatory)

In your favorite terminal with git installed, run the following command:

```bash
git clone https://github.com/mfrachet/progressively
```

Next, you need to make sure you have a `.env` file in both the `./packages/frontend` and `./packages/backend` directories.

When cloning the project, a `.env.example` file is created as an example in these packages. Make sure to modify them **(there are secrets inside)** and rename them from `.env.example` to `.env`:

```bash
cp ./packages/frontend/.env.example ./packages/frontend/.env
cp ./packages/backend/.env.example ./packages/backend/.env
```

## Starting the project

You need to install Postgres by yourself. You can have a running instance in a Docker container using the following:

```bash
# Make sure to modify the user and password ;)
docker run --name progressively-db -e POSTGRES_PASSWORD=admin -e POSTGRES_USER=admin -e POSTGRES_DB=progressively -p 5432:5432 -d postgres
```

Then, run the following commands at the root of the project:

```bash
npm install
npm run setup         # prepares the mono-repo
npm run db:prepare    # creates the tables
npm run build         # builds the projects and their inter-dependencies
npm run start         # start the frontend and the backend
```

The dashboard is now available on [http://localhost:3000](http://localhost:3000), the backend APIs are available on [http://localhost:4000/api](http://localhost:4000/api).

_Note: this project comes with fixtures to run API and E2E automated tests. You can seed Postgres running the `npm run db:seed` and cleaning up using `npm run db:cleanup`. The following accounts are provided:_

- marvin.frachet@something.com / password
- john.doe@gmail.com / password
- jane.doe@gmail.com / password
