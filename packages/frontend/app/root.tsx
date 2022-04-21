import * as React from "react";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLocation,
} from "remix";
import type { LinksFunction } from "remix";
import { Box, ChakraProvider, Button } from "@chakra-ui/react";
import { withEmotionCache } from "@emotion/react";
import ClientStyleContext from "./_chakra-setup/context.client";
import ServerStyleContext from "./_chakra-setup/context.server";
import { lightTheme } from "./modules/themes/light";
import ForbiddenPage from "./routes/403";
import styles from "./styles/index.css";
import UnauthorizedPage from "./routes/401";
import { NotAuthenticatedLayout } from "./layouts/NotAuthenticatedLayout";
import { H1 } from "./components/H1";
import { Main } from "./components/Main";
import { AiOutlineLogin } from "react-icons/ai";

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
      <Outlet />
    </Document>
  );
}

interface DocumentProps {
  children: React.ReactNode;
  title?: string;
}

interface EmotionStylsheet extends StyleSheet {
  _insertTag: (str: HTMLStyleElement) => void;
}
const Document = withEmotionCache(
  ({ children, title }: DocumentProps, emotionCache) => {
    const serverSyleData = React.useContext(ServerStyleContext);
    const clientStyleData = React.useContext(ClientStyleContext);

    // Only executed on client
    React.useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;

      emotionCache.sheet.flush();

      tags.forEach((tag) => {
        (emotionCache.sheet as unknown as EmotionStylsheet)._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData.reset();
    }, []);

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          {title ? <title>{title}</title> : null}
          <Meta />
          <Links />

          {serverSyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(" ")}`}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
        </head>
        <body>
          <ChakraProvider theme={lightTheme}>
            <Box minH="100%" bg="background" paddingBottom={8}>
              {children}
            </Box>
          </ChakraProvider>
          <RouteChangeAnnouncement />
          <ScrollRestoration />
          <Scripts />
          {process.env.NODE_ENV === "development" && <LiveReload />}
        </body>
      </html>
    );
  }
);

function Layout({ children }: React.PropsWithChildren<unknown>) {
  return <div>{children}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  let message;
  switch (caught.status) {
    case 403: {
      return <ForbiddenPage />;
    }
    case 401:
      return <UnauthorizedPage />;
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <NotAuthenticatedLayout>
          <Main>
            <H1>Outch, a wild error appeared!</H1>

            <Box my={6}>
              <p>
                <strong>
                  {caught.status}: {caught.statusText}
                </strong>
              </p>
            </Box>

            <Box my={6}>
              <p>{message}</p>
            </Box>

            <Button
              as={Link}
              to="/signin"
              colorScheme={"brand"}
              leftIcon={<AiOutlineLogin aria-hidden />}
            >
              Signin page
            </Button>
          </Main>
        </NotAuthenticatedLayout>
      </Layout>
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

            <Box my={6}>
              <p>{error.message}</p>
            </Box>

            <Button
              as={Link}
              to="/signin"
              colorScheme={"brand"}
              leftIcon={<AiOutlineLogin aria-hidden />}
            >
              Signin page
            </Button>
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
