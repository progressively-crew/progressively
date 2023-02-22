describe("/", () => {
  describe("with db filled", () => {
    before(cy.seed);
    after(cy.cleanupDb);

    it("shows the signin page", () => {
      cy.visit("/");
      cy.url().should("contain", "/signin");
    });
  });

  describe("with db NOT filled", () => {
    it("shows the welcome page", () => {
      cy.visit("/");
      cy.url().should("contain", "/welcome");
    });
  });
});
