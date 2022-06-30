import * as React from "react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import UnauthorizedPage from "./routes/401";
import ForbiddenPage from "./routes/403";
import NotFoundPage from "./routes/404";
import styles from "./styles/index.css";
import { NotAuthenticatedLayout } from "./layouts/NotAuthenticatedLayout";
import { H1 } from "./components/H1";
import { Main } from "./components/Main";
import { Button } from "./components/Buttons/Button";
import { Background } from "./components/Background";

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
export default function App() {
  return (
    <Document>
      <Background>
        <Outlet />
      </Background>
    </Document>
  );
}

interface DocumentProps {
  children: React.ReactNode;
  title?: string;
}

const Document = ({ children, title }: DocumentProps) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}

        <RouteChangeAnnouncement />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
};

function Layout({ children }: React.PropsWithChildren<unknown>) {
  return <div>{children}</div>;
}

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
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>{page}</Layout>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document title="Error!">
      <Layout>
        <NotAuthenticatedLayout>
          <Main>
            <H1>Outch, a wild error appeared!</H1>

            <p>{error.message}</p>

            <Button to="/signin">Signin page</Button>
          </Main>
        </NotAuthenticatedLayout>
      </Layout>
    </Document>
  );
}

/**
 * Provides an alert for screen reader users when the route changes.
 */
const RouteChangeAnnouncement = React.memo(() => {
  const [hydrated, setHydrated] = React.useState(false);
  const [innerHtml, setInnerHtml] = React.useState("");
  const location = useLocation();

  React.useEffect(() => {
    setHydrated(true);
  }, []);

  const firstRenderRef = React.useRef(true);
  React.useEffect(() => {
    // Skip the first render because we don't want an announcement on the
    // initial page load.
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    const pageTitle = location.pathname === "/" ? "Home page" : document.title;
    setInnerHtml(`Navigated to ${pageTitle}`);
  }, [location.pathname]);

  // Render nothing on the server. The live region provides no value unless
  // scripts are loaded and the browser takes over normal routing.
  if (!hydrated) {
    return null;
  }

  return (
    <div
      aria-live="assertive"
      aria-atomic
      id="route-change-region"
      style={{
        border: "0",
        clipPath: "inset(100%)",
        clip: "rect(0 0 0 0)",
        height: "1px",
        margin: "-1px",
        overflow: "hidden",
        padding: "0",
        position: "absolute",
        width: "1px",
        whiteSpace: "nowrap",
        wordWrap: "normal",
      }}
    >
      {innerHtml}
    </div>
  );
});

RouteChangeAnnouncement.displayName = "MemoizedRouteChangeAnnouncement";
