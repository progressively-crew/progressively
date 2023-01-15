import { useLocation, useMatches } from "@remix-run/react";
import * as Sentry from "@sentry/remix";
import { useEffect } from "react";

export const initSentryOnClient = () => {
  if (!(window as any).SENTRY_DSN) return;

  Sentry.init({
    dsn: (window as any).SENTRY_DSN,
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
