To start the backend on a dedicated terminal, you can run:

```sh
$ npm run dev # in this folder
```

## In docker

```sh
 $ docker run --env-file .env -p 4000:4000 -p 4001:4001 mfrachet/rollout-be
```
