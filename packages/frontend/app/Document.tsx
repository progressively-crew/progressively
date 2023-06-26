import * as React from "react";
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { Background } from "./components/Background";

interface DocumentProps {
  children: React.ReactNode;
  title?: string;
}

export const Document = ({ children, title }: DocumentProps) => {
  return (
    <html lang="en" className="min-h-full h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="shortcut icon" type="image/jpg" href="/favicon.png" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
        <script
          lang="javascript"
          dangerouslySetInnerHTML={{
            __html: `
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
  } else {
  document.documentElement.classList.remove('dark')
  }
  `,
          }}
        ></script>
      </head>
      <body className="h-full">
        <Background>{children}</Background>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};
