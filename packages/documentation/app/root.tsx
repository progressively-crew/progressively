import type { MetaFunction } from "@remix-run/node";
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

export const loader = async () => {
  const { data, response } = await getProgressivelyData(
    "51f0412c-8be1-48a3-97e3-5f1f59d3d392",
    {
      websocketUrl: "wss://backend-progressively.fly.dev",
      apiUrl: "https://backend-progressively.fly.dev",
    }
  );

  return {
    progressivelyProps: data,
  };
};

export default function App() {
  const { progressivelyProps } = useLoaderData<typeof loader>();

  console.log("lol", progressivelyProps);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <link rel="shortcut icon" type="image/jpg" href="/favicon.png" />
      </head>
      <body>
        <ProgressivelyProvider {...progressivelyProps}>
          <Outlet />
        </ProgressivelyProvider>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
