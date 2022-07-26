describe("/", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://api.progressively.app/sdk/*", {
      body: {
        showDocumentationButton: false,
      },
      statusCode: 200,
    });
  });

  beforeEach(() => {
    cy.visit("/");
    cy.injectAxe();
  });

  it("shoots axe on homepage", () => {
    cy.findByText("Documentation").should("not.exist");
    cy.checkA11y();
  });
});
