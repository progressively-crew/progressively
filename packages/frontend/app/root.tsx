import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import UnauthorizedPage from "./routes/401";
import ForbiddenPage from "./routes/403";
import NotFoundPage from "./routes/404";
import styles from "./styles/app.css";
import { LinksFunction } from "@remix-run/node";
import { ThemeProvider } from "./modules/theme/ThemeProvider";
import { Document } from "./Document";
import { DefaultErrorLayout } from "./DefaultErrorLayout";

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
    { rel: "stylesheet", href: styles },
    {
      as: "style",
      href: "https://rsms.me/inter/inter.css",
      rel: "preload",
    },
  ];
};

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
          <DefaultErrorLayout
            errorMessage={error.data.message || error.statusText}
          />
        )}
      </Document>
    );
  }

  const message = (error as any).message
    ? ((error as any).message as string)
    : (error as any).data.message;

  return <DefaultErrorLayout errorMessage={message} />;
}

/**
 * The root module's default export is a component that renders the current
 * route via the `<Outlet />` component. Think of this as the global layout
 * component for your app.
 */
function App() {
  return (
    <Document>
      <ThemeProvider>
        <Outlet />
      </ThemeProvider>
    </Document>
  );
}

export default App;
