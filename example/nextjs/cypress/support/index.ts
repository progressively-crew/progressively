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
import "./commands";

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
       * Change the flag status
       */
      changeFlagStatus(envId: string, flagId: string, status: string): void;
    }
  }
}

// Alternatively you can use CommonJS syntax:
// require('./commands')
