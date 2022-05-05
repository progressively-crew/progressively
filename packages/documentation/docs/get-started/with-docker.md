# Usage with Docker

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

## Docker Compose

At the root of the project, run the following command:

```bash
docker-compose up
```

The dashboard is now available on [http://localhost:3000](http://localhost:3000), the backend APIs are available on [http://localhost:4000/api](http://localhost:4000/api).

## Docker without Compose

Without compose, you need to install Postgres by yourself. You can have a running instance in a Docker container using the following:

```bash
# Make sure to modify the user and password ;)
docker run --name progressively-db -e POSTGRES_PASSWORD=admin -e POSTGRES_USER=admin -e POSTGRES_DB=progressively -p 5432:5432 -d postgres
```

Then, prepare the database by creating the tables:

```bash
# At the root of the project
npm install
npm run setup         # prepares the mono-repo
npm run db:prepare    # creates the tables
```

Now, you can either build the image using the Dockerfile available in the project or directly use the image hosted on Docker Hub:

```bash
# Start the API
docker run --env-file .env -p 4000:4000 -p 4001:4001 mfrachet/progressively-backend

# Start the dashboard
docker run --env-file .env -p 3000:3000 mfrachet/progressively-frontend
```
