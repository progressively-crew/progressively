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

Cypress.Commands.add("seed", () => cy.task("seed"));
Cypress.Commands.add("cleanup", () => cy.task("cleanup"));

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

Cypress.on(
  "uncaught:exception",
  (err) => !err.message.includes("ResizeObserver loop limit exceeded")
);
