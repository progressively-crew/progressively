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
Cypress.Commands.add("cleanupDb", () => cy.task("cleanupDb"));

Cypress.Commands.add("signIn", (userName?: keyof typeof AvailableUsers) => {
  const user = AvailableUsers[userName || "Marvin"];

  cy.visit("/signin");
  cy.findByRole("textbox", { name: "Email" }).type(user.email);
  cy.findByLabelText("Password").type(user.password);
  cy.findByRole("button", { name: "Sign in" }).click();
  cy.url().should("contain", "dashboard");

  // Not working anymore because of ESM support of cypress
  // cy.request({
  //   url: "http://localhost:4000/auth/login",
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ username: user.email, password: user.password }),
  // })
  //   .then((res) => cy.task("serverLogin", res.body.access_token))
  //   .then((cookies: string) => {
  //     const [key, value] = cookies.split("=");
  //     cy.setCookie(key, value.split(";")[0]);
  //   });
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

Cypress.Commands.add("verifyBreadcrumbs", (crumbs: Array<any>) => {
  const lastIndex = crumbs.length - 1;

  cy.findByLabelText("Breadcrumbs").within(() => {
    crumbs.forEach(
      ([name, href, shouldAssertCurrent = true], index: number) => {
        if (index === lastIndex && shouldAssertCurrent) {
          cy.findByRole("link", { name })
            .should("be.visible")
            .and("have.attr", "href", href)
            .and("have.attr", "aria-current", "page");
        } else {
          cy.findByRole("link", { name })
            .should("be.visible")
            .and("have.attr", "href", href);
        }
      }
    );
  });
});

Cypress.on("uncaught:exception", (err) => {
  const validErrors = [
    "ResizeObserver loop limit exceeded",
    "hydrating",
    "Hydration",
  ];
  const containsError = validErrors.find((e) => err.message.includes(e));

  if (containsError) {
    return false;
  }
});

if (Cypress.env("DARK_THEME")) {
  Cypress.on("window:before:load", (win) => {
    cy.stub(win, "matchMedia")
      .withArgs("(prefers-color-scheme: dark)")
      .returns({
        matches: true,
      });
  });
}
