import { WebSocket } from "mock-websocket";

describe("/", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://api.progressively.app/sdk/*", {
      statusCode: 200,
      body: {
        showDocumentationButton: false,
      },
    });
  });

  beforeEach(() => {
    cy.visit("/", {
      onBeforeLoad(win) {
        cy.stub(win, "WebSocket", (url) => new WebSocket(url));
      },
    });

    cy.injectAxe();
  });

  it("shoots axe on homepage", () => {
    cy.findByText("Documentation").should("not.exist");
    cy.checkA11y();
  });
});
