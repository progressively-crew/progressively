import type { EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";
import { Constants } from "./constants";
import { startMockServer } from "./mocks/mock-server";
// import { initSentryOnServer } from "./modules/sentry/server";

// initSentryOnServer();

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  if (Constants.StartMockServer === "true") {
    console.log("[Mock server initiated] Value is:", Constants.StartMockServer);
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
