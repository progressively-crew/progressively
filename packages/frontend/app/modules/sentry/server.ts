import * as Sentry from "@sentry/remix";

export const initSentryOnServer = () => {
  if (!process.env.SENTRY_DSN) return;

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1,
    integrations: [],
  });
};
