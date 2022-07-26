Starts an HTTP server which goal is to intercept API calls to the real instance of progressively in order to avoid filling a bunch of flag / experiment hit when running E2e tests.

Activate the `START_MOCK_SERVER='true'` environment variable to start a MSW server intercepting client and server side requests to the real API.
