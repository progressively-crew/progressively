import type { EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";
import { startMockServer } from "./mocks/mock-server";
import { initSentryOnServer } from "./modules/sentry/server";

initSentryOnServer();

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  if (process.env.START_MOCK_SERVER === "true") {
    console.log(
      "[Mock server initiated] Value is:",
      process.env.START_MOCK_SERVER
    );
    startMockServer();
  }

  const markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  responseHeaders.set("Content-Type", "text/html");

  return new Response(`<!DOCTYPE html>${markup}`, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
