/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
import * as cookieSignature from "cookie-signature";
import { getSession, commitSession } from "../../app/sessions";
import { cleanupDb, seedDb } from "../../../backend/test/helpers/seed";

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
global.sign = sign;
/** End of caution */

module.exports = (on: any, config: any) => {
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
};
