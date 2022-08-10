import * as Sentry from "@sentry/remix";
import { SENTRY_DSN } from "./constants";

export const initSentryOnServer = () => {
  Sentry.init({
    dsn: SENTRY_DSN,
    tracesSampleRate: 1,
    integrations: [],
    denyUrls: ["localhost"],
  });
};
