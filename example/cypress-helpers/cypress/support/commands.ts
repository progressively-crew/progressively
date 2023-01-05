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

Cypress.Commands.add("seed", () => cy.task("seed"));
Cypress.Commands.add("cleanup", () => cy.task("cleanup"));
Cypress.Commands.add("changeFlagStatus", (envId, flagId, status) => {
  // Auth with the admin
  cy.request("POST", "http://localhost:4000/auth/login", {
    username: "marvin.frachet@something.com",
    password: "password",
  }).then((res) => {
    const { access_token } = res.body;

    return cy.request({
      url: `http://localhost:4000/environments/${envId}/flags/${flagId}`,
      method: "PUT",
      body: {
        status,
      },
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  });
});
