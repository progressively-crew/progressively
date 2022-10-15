# Getting started

This section will help you spawn a new Progressively instance you can interact with.

## Using `docker-compose`

```bash
$ git clone https://github.com/progressively-crew/progressively
$ cd progressively
$ mv ./packages/backend/.env.example ./packages/backend/.env
$ mv ./packages/frontend/.env.example ./packages/frontend/.env
$ docker-compose up -d
```

You can now open <a href="http://localhost:3000/welcome" target="_blank" rel="noreferrer">http://localhost:3000/welcome</a> to create your admin user.

## Regular setup

Progressively requires 2 databases: <a href="https://www.postgresql.org/" target="_blank" rel="noreferrer">Postgres</a> and <a href="https://redis.io/" target="_blank" rel="noreferrer">Redis</a>. It's up to you to choose how to install them, but for the sake of simplicity in this section, we'll use <a href="https://www.docker.com/" target="_blank" rel="noreferrer">Docker</a>.

```bash
$ docker run --name progressively-db -e POSTGRES_PASSWORD=admin -e POSTGRES_USER=admin -e POSTGRES_DB=progressively -p 5432:5432 -d postgres
$ docker run -it --rm --name progressively-redis -p 6379:6379 -d redis
###
$ git clone https://github.com/progressively-crew/progressively
$ cd progressively
$ mv ./packages/backend/.env.example ./packages/backend/.env
$ mv ./packages/frontend/.env.example ./packages/frontend/.env
$ npm install
$ npm run setup
$ npm run db:prepare
```

You can now open <a href="http://localhost:3000/welcome" target="_blank" rel="noreferrer">http://localhost:3000/welcome</a> to create your admin user.
