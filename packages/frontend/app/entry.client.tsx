import { RemixBrowser } from "@remix-run/react";
import { hydrateRoot } from "react-dom/client";
import { initSentryOnClient } from "./modules/sentry/client";

initSentryOnClient();

hydrateRoot(document, <RemixBrowser />);
