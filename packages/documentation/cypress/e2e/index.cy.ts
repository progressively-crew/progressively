describe("homepage", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000");
    cy.injectAxe();

    cy.checkA11y();
  });
});
