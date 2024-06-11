import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import { Typography } from "./components/Typography";
import UnauthorizedPage from "./routes/401";
import ForbiddenPage from "./routes/403";
import NotFoundPage from "./routes/404";
import { AiOutlineLogin } from "react-icons/ai";
import { Button } from "./components/Buttons/Button";
import { Spacer } from "./components/Spacer";

import "./app.css";
import "./tailwind.css";
import { LinksFunction } from "@remix-run/node";

export const links: LinksFunction = () => {
  return [
    {
      as: "style",
      href: "https://rsms.me/inter/inter.css",
      rel: "preload",
    },
    { rel: "icon", href: "/favicon.png", sizes: "32x32" },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="min-h-full h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
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
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

function DefaultError({ errorMessage }: { errorMessage: string }) {
  return (
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
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return error.status === 403 ? (
      <ForbiddenPage />
    ) : error.status === 401 ? (
      <UnauthorizedPage />
    ) : error.status === 404 ? (
      <NotFoundPage />
    ) : (
      <DefaultError errorMessage={error.data.message || error.statusText} />
    );
  }

  const message = (error as any).message
    ? ((error as any).message as string)
    : (error as any).data.message;

  return <DefaultError errorMessage={message} />;
}
