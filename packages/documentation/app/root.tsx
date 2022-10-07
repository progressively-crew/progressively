import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import font from "./styles/fonts.css";
import reset from "./styles/reset.css";
import index from "./styles/index.css";
import shared from "./styles/shared.css";
import prism from "./styles/prism.css";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Progressively",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => {
  return [
    {
      rel: "preload",
      href: "/fonts/Catamaran-ExtraBold.ttf",
      as: "font",
      type: "font/ttf",
    },
    {
      rel: "preload",
      href: "/fonts/Mulish-Medium.ttf",
      as: "font",
      type: "font/ttf",
    },
    {
      rel: "preload",
      href: "/fonts/Mulish-ExtraBold.ttf",
      as: "font",
      type: "font/ttf",
    },
    { rel: "stylesheet", href: prism },
    { rel: "stylesheet", href: reset },
    { rel: "stylesheet", href: font },
    { rel: "stylesheet", href: shared },
    { rel: "stylesheet", href: index },
  ];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <link rel="shortcut icon" type="image/jpg" href="/favicon.png" />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
