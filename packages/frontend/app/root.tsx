import * as React from "react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";
import UnauthorizedPage from "./routes/401";
import ForbiddenPage from "./routes/403";
import NotFoundPage from "./routes/404";
import styles from "./styles/app.css";
import { H1 } from "./components/H1";
import { Main } from "./components/Main";
import { Background } from "./components/Background";
import { LinksFunction } from "@remix-run/node";
import { ErrorLayout } from "./layouts/ErrorLayout";
import { Typography } from "./components/Typography";
import { Spacer } from "./components/Spacer";
import { withSentry } from "@sentry/remix";
import { SubmitButton } from "./components/Buttons/SubmitButton";

/**
 * The `links` export is a function that returns an array of objects that map to
 * the attributes for an HTML `<link>` element. These will load `<link>` tags on
 * every route in the app, but individual routes can include their own links
 * that are automatically unloaded when a user navigates away from the route.
 *
 * https://remix.run/api/app#links
 */
export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

/**
 * The root module's default export is a component that renders the current
 * route via the `<Outlet />` component. Think of this as the global layout
 * component for your app.
 */
function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export default withSentry(App);

interface DocumentProps {
  children: React.ReactNode;
  title?: string;
}

const Document = ({ children, title }: DocumentProps) => {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="shortcut icon" type="image/jpg" href="/favicon.png" />
        <Meta />
        <Links />
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

export function CatchBoundary() {
  const caught = useCatch();

  let page;
  switch (caught.status) {
    case 403: {
      page = <ForbiddenPage />;
      break;
    }
    case 401:
      page = <UnauthorizedPage />;
      break;
    case 404:
      page = <NotFoundPage />;
      break;

    default: {
      throw new Error(caught.data || caught.statusText);
    }
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>{page}</Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document title="Error!">
      <ErrorLayout>
        <Main>
          <H1>Outch, a wild error appeared!</H1>

          <Typography>{error.message}</Typography>
          <Spacer size={4} />

          <SubmitButton to="/signin">Signin page</SubmitButton>
        </Main>
      </ErrorLayout>
    </Document>
  );
}
