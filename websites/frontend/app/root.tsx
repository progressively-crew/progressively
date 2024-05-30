import * as React from "react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import UnauthorizedPage from "./routes/401";
import ForbiddenPage from "./routes/403";
import NotFoundPage from "./routes/404";
import { LinksFunction } from "@remix-run/node";
import { Typography } from "./components/Typography";
import { Spacer } from "./components/Spacer";
import { AiOutlineLogin } from "react-icons/ai";
import { Button } from "./components/Buttons/Button";

import styles from "~/app.css";
import stylesheet from "~/tailwind.css";

/**
 * The `links` export is a function that returns an array of objects that map to
 * the attributes for an HTML `<link>` element. These will load `<link>` tags on
 * every route in the app, but individual routes can include their own links
 * that are automatically unloaded when a user navigates away from the route.
 *
 * https://remix.run/api/app#links
 */
export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: stylesheet },
    { rel: "stylesheet", href: styles },
    {
      as: "style",
      href: "https://rsms.me/inter/inter.css",
      rel: "preload",
    },
  ];
};

interface DocumentProps {
  children: React.ReactNode;
  title?: string;
}

const Document = ({ children, title }: DocumentProps) => {
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
        <div className="flex flex-col min-h-full">{children}</div>

        <ScrollRestoration />
        <Scripts />
        <script
          src="https://progressively.app/progressively.min.js"
          data-progressively-endpoint="https://api.progressively.app"
          data-progressively-client-key="5add391e-35ac-44d8-a6ce-545305e07740"
        ></script>
        <LiveReload />
      </body>
    </html>
  );
};

function DefaultError({ errorMessage }: { errorMessage: string }) {
  return (
    <Document title="Error!">
      <main className="p-8">
        <Typography as="h1" className="font-bold text-lg">
          Outch, a wild error appeared!
        </Typography>

        <Typography>{errorMessage}</Typography>

        <Spacer size={2} />

        <div className="inline-block">
          <Button
            to="/signin"
            variant="secondary"
            icon={<AiOutlineLogin aria-hidden />}
          >
            Signin page
          </Button>
        </div>
      </main>
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Document title={`${error.status} ${error.statusText}`}>
        {error.status === 403 ? (
          <ForbiddenPage />
        ) : error.status === 401 ? (
          <UnauthorizedPage />
        ) : error.status === 404 ? (
          <NotFoundPage />
        ) : (
          <DefaultError errorMessage={error.data.message || error.statusText} />
        )}
      </Document>
    );
  }

  const message = (error as any).message
    ? ((error as any).message as string)
    : (error as any).data.message;

  return <DefaultError errorMessage={message} />;
}

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

export default App;
