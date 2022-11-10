import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import styles from "./styles/app.css";
import theme from "highlight.js/styles/github.css";
import { ProgressivelyProvider } from "@progressively/react";
import { getProgressivelyData } from "@progressively/server-side";
import { progressivelyCookie } from "./cookies";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Progressively, the simple and accessible feature flagging tool",
  viewport: "width=device-width,initial-scale=1",
});

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    {
      rel: "stylesheet",
      href: theme,
    },
  ];
}

export const loader: LoaderFunction = async ({ request }) => {
  if (!process.env.PROGRESSIVELY_ENV) {
    return {
      progressivelyProps: undefined,
    };
  }

  const { data, response } = await getProgressivelyData(
    String(process.env.PROGRESSIVELY_ENV),
    {
      websocketUrl: "wss://backend-progressively.fly.dev",
      apiUrl: "https://backend-progressively.fly.dev",
    }
  );

  // Remix cookies
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await progressivelyCookie.parse(cookieHeader)) || {};

  // Progressively cookies
  const cookieValue = response.headers
    .get("set-cookie")
    ?.split(";")
    ?.find((str) => str.includes("progressively-id"))
    ?.split("=")?.[1];

  // Assigning progessively cookie to remix cookie
  cookie["progressively-id"] = cookieValue;

  return json(
    {
      progressivelyProps: data,
    },
    {
      headers: {
        "Set-Cookie": await progressivelyCookie.serialize(cookie),
      },
    }
  );
};

export default function App() {
  const { progressivelyProps } = useLoaderData<any>();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <link rel="shortcut icon" type="image/jpg" href="/favicon.png" />
      </head>
      <body>
        {progressivelyProps ? (
          <ProgressivelyProvider {...progressivelyProps}>
            <Outlet />
          </ProgressivelyProvider>
        ) : (
          <Outlet />
        )}

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
