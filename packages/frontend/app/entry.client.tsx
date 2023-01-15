import { RemixBrowser } from "@remix-run/react";
import { hydrate } from "react-dom";
import { initSentryOnClient } from "./modules/sentry/client";

initSentryOnClient();
hydrate(<RemixBrowser />, document);
