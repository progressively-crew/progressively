## TODO

- [] Make sure to rely on .env on SDK file
- [] Make sure to handle CORS correctly (ws AND API)
- [] JWT token expiration and renewal
- [] make sure the docker stuff is working as expected

```sh
docker build -t rollout .
docker run -p 3000:3000 -p 4000:4000 -p 4001:4001 -e SESSION_SECRET="session-secret" rollout
```

## Backend dev

Don't forget to run

```sh
$ npm run db:gen:sqlite
# or
$ npm run db:gen:postgres
```

before going on dev or prod
