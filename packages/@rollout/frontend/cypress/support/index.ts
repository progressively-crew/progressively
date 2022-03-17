// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
/// <reference types="cypress" />
import "cypress-axe";
import "./commands";
import { AvailableUsers } from "./constants";

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Seed the database for testing purpose
       * @example cy.seed()
       */
      seed(): void;

      /**
       * Cleanup the database for testing purpose
       * @example cy.seed()
       */
      cleanup(): void;

      /**
       * Browse through the sign in flow and authenticate the user
       */
      signIn(userName: keyof typeof AvailableUsers): void;

      /**
       * Checks if a route is well protected and can't be accessed without being logged
       */
      checkProtectedRoute(): void;
    }
  }
}

// Alternatively you can use CommonJS syntax:
// require('./commands')
