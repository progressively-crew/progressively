import { defineConfig } from "cypress";
import * as cookieSignature from "cookie-signature";
import { getSession, commitSession } from "./app/sessions";
import { cleanupDb, seedDb } from "@progressively/database/seed";

/**
 * /!\ this is not conventional and related to how Remix run when creating cookies
 * this is here because the task to login needs it.
 * For reference, instead of using a UI scenario for authentication,
 * the "serverLogin" tasks allows to bypass it and send the request + se the cookie
 * directly. It's faster, but less safe. To keep an eye on
 */
const sign = async (value: any, secret: any) => {
  return cookieSignature.sign(value, secret);
};

(global as any).sign = sign;
/** End of caution */

export default defineConfig({
  viewportWidth: 1400,
  viewportHeight: 800,
  e2e: {
    baseUrl: "http://localhost:3000",
    video: Boolean(process.env.CI),
    projectId: "kfytzc",
    specPattern: "cypress/e2e/**/*.spec.{ts,tsx}",
    defaultCommandTimeout: 10000,

    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser, launchOptions) => {
        const REDUCE = 1;
        if (browser.family === "firefox") {
          launchOptions.preferences["ui.prefersReducedMotion"] = REDUCE;
        }

        if (browser.family === "chromium") {
          launchOptions.args.push("--force-prefers-reduced-motion");
        }

        return launchOptions;
      }),
        on("task", {
          seed: (opts = {}) => {
            return seedDb(opts).then(() => null);
          },
          cleanupDb: () => {
            return cleanupDb().then(() => null);
          },
          serverLogin: (accessToken) => {
            return getSession()
              .then((session) => {
                session.set("auth-cookie", accessToken);
                return commitSession(session);
              })
              .catch((error) => {
                console.error(error);
                return error;
              });
          },
        });
    },
  },
});
