## What is this package?

This application comes with heuristic aiming to provide flag variations to users depending on their attributes.

While it's easy to verify the behaviour in E2E tests and unit tests, these tests are very "arranged" and concern only one user at a time.

The `load-testing` package aims to provide a way to run tests that cover less "business" scope than E2E ones, but with a configurable number of client applications, on different browsers.

They mostly aim to verify that the flag provided to the N users are the good ones, even after a websocket update.

## How to start the load tests?

- You first need to follow the [Raw installation guide](https://mfrachet.github.io/progressively/docs/get-started/raw-installation)
- Then, start the backend using `npm run dev` in the `./packages/backend`
- Then start the dedicated client application running `npm start` in `./packages/load-testing`
- Finally, run one of the following command:
  - `npm run test:chromium`
  - `npm run test:firefox`
  - `npm run test:webkit`

You can adjust the number of clients by running something like `USER_COUNT=100 npm run test:chromium`
