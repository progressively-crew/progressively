import * as Sentry from "@sentry/remix";

export const initSentryOnServer = () => {
  if (!process.env.SENTRY_DSN) return;

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1,
    integrations: [],
    // eslint-disable-next-line unicorn/better-regex
    denyUrls: [/^https?:\/\/\w+(\.\w+)*(:[0-9]+)?(\/.*)?$/],
  });
};
