import { defineConfig } from "cypress";
import * as cookieSignature from "cookie-signature";
import { getSession, commitSession } from "./app/sessions";
import { cleanupDb, seedDb } from "../backend/test/helpers/seed";

/**
 * /!\ this is not conventional and related to how Remix run when creating cookies
 * this is here because the task to login needs it.
 * For reference, instead of using a UI scenario for authentication,
 * the "serverLogin" tasks allows to bypass it and send the request + se the cookie
 * directly. It's faster, but less safe. To keep an eye on
 */
const sign = async (value, secret) => {
  return cookieSignature.sign(value, secret);
};

(global as any).sign = sign;
/** End of caution */

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    video: false,
    projectId: "kfytzc",
    specPattern: "cypress/e2e/**/*.spec.{ts,tsx}",

    setupNodeEvents(on, config) {
      on("task", {
        seed: () => {
          return seedDb().then(() => null);
        },
        cleanup: () => {
          return cleanupDb().then(() => null);
        },
        serverLogin: (accessToken) => {
          return getSession()
            .then((session) => {
              session.set("auth-cookie", accessToken);
              return commitSession(session);
            })
            .catch((e) => {
              console.error(e);
              return e;
            });
        },
      });
    },
  },
});
