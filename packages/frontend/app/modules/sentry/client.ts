import { useLocation, useMatches } from "@remix-run/react";
import * as Sentry from "@sentry/remix";
import { useEffect } from "react";
import { SENTRY_DSN } from "./constants";

export const initSentryOnClient = () => {
  if (process.env.IS_IN_CI) return;

  Sentry.init({
    dsn: SENTRY_DSN,
    tracesSampleRate: 1,
    integrations: [
      new Sentry.BrowserTracing({
        routingInstrumentation: Sentry.remixRouterInstrumentation(
          useEffect,
          useLocation,
          useMatches
        ),
      }),
    ],
    // eslint-disable-next-line unicorn/better-regex
    denyUrls: [/^https?:\/\/\w+(\.\w+)*(:[0-9]+)?(\/.*)?$/],
  });
};
