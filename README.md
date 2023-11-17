<div align="center">
 <p><strong>Rollout quickly, effectively, progressively</strong></p>
 <img src="https://github.com/progressively-crew/progressively/assets/3874873/d3c331b1-25b2-41e9-a622-084b9e23fa7b" alt="Progressively" />
</div>

<br />

<div align="center">
 <a href="https://progrressively-documentation.netlify.app/" target="_blank" rel="noopener noreferrer">Documentation</a>
</div>

## Get started

```sh
$ git clone https://github.com/progressively-crew/progressively
$ cd progressively
$ docker-compose up -d # or docker compose up -d
```

You can now open http://localhost:3000/welcome to create your admin user.

## Run examples locally

The repository contains a bunch of minimalist examples using different frameworks. To run them, make sure to have [PNPM](https://pnpm.io/) installed and follow these steps:

```sh
# Install local Postgres and Redis in docker
$ docker run --name progressively-db -e POSTGRES_PASSWORD=admin -e POSTGRES_USER=admin -e POSTGRES_DB=progressively -p 5432:5432 -d postgres
$ docker run -it --name progressively-redis -p 6379:6379 -d redis

# Get the repo
$ git clone https://github.com/progressively-crew/progressively

# Install dependencies
$ pnpm i

# Seed test data so the exanple can work
$ pnpm db:seed

# Start everything needed
$ pnpm start:examples
```

You now have access to:

- The dashboard (http://localhost:3000) with a user `marvin.frachet@something.com` / `password`
- The backend (http://localhost:4000)
- [Astro](https://astro.build/) example (http://localhost:3002)
- [CRA](https://create-react-app.dev/) example (http://localhost:3003)
- [Nextjs](https://nextjs.org/) example (http://localhost:3004)
- [Node.js](https://nodejs.org/en) example (http://localhost:3005)
- [Qwik](https://qwik.builder.io/) example (http://localhost:3007)
- [Svelte](https://svelte.dev/) example (http://localhost:3008)
