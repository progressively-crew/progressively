import * as Sentry from "@sentry/remix";
import { SENTRY_DSN } from "./constants";

export const initSentryOnServer = () => {
  if (process.env.IS_IN_CI) return;

  Sentry.init({
    dsn: SENTRY_DSN,
    tracesSampleRate: 1,
    integrations: [],
    // eslint-disable-next-line unicorn/better-regex
    denyUrls: [/^https?:\/\/\w+(\.\w+)*(:[0-9]+)?(\/.*)?$/],
  });
};
