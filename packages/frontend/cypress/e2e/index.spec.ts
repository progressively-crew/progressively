describe("/", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.injectAxe();
  });

  it("shoots axe on homepage", () => {
    cy.checkA11y();
  });
});
