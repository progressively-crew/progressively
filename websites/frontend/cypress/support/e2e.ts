// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// @ts-ignore
import "@testing-library/cypress/add-commands";
import "cypress-axe";
import { AvailableUsers } from "./constants";

Cypress.Commands.add("seed", (opts) =>
  cy.task("seed", { eventsCount: opts?.eventCount })
);
Cypress.Commands.add("cleanupDb", () => cy.task("cleanupDb"));

Cypress.Commands.add("signIn", (userName?: keyof typeof AvailableUsers) => {
  const user = AvailableUsers[userName || "Marvin"];

  cy.request({
    url: "http://localhost:4000/auth/login",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: user.email, password: user.password }),
  })
    .then((res) => cy.task("serverLogin", res.body.access_token))
    .then((cookies: string) => {
      const [key, value] = cookies.split("=");
      cy.setCookie(key, value.split(";")[0]);
    });
});

Cypress.Commands.add("checkProtectedRoute", () => {
  cy.findByText(
    "It looks you're trying to access this page while not being authenticated."
  );

  cy.findByText(
    "To access this content, make sure to fill the authentication page form."
  );
});

Cypress.Commands.add("checkUnauthenticatedRoute", () => {
  cy.url().should("contain", "/signin");
});

Cypress.Commands.overwrite("checkA11y", (originalFn) => {
  cy.wait(100);

  return originalFn();
});

Cypress.on("uncaught:exception", (err) => {
  // Cypress and React Hydrating the document don't get along
  // for some unknown reason. Hopefully, we figure out why eventually
  // so we can remove this.
  if (
    /hydrat/i.test(err.message) ||
    /Minified React error #418/.test(err.message) ||
    /Minified React error #423/.test(err.message)
  ) {
    return false;
  }
});

beforeEach(() => {
  cy.intercept("POST", "https://api.progressively.app/*", {
    statusCode: 201,
    body: {},
  });

  cy.intercept("GET", "https://api.progressively.app/*", {
    statusCode: 200,
    body: {},
  });
});
