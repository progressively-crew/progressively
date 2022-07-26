import type { EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";
import { getCssText } from "./stitches.config";
import { server } from "./mocks/msw-server";

if (process.env.START_MOCK_SERVER === "true") {
  server?.listen({ onUnhandledRequest: "warn" });
}

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  ).replace(/<\/head>/, `<style id="stitches">${getCssText()}</style></head>`);

  responseHeaders.set("Content-Type", "text/html");

  return new Response(`<!DOCTYPE html>${markup}`, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
