// Only exist for SaaS pages
describe("/dashboard/profile/billing/upgrade", () => {
  describe("not authenticated", () => {
    before(cy.seed);
    after(cy.cleanupDb);

    it("checks that the route is protected", () => {
      cy.visit("/dashboard/profile/billing/upgrade");
      cy.checkUnauthenticatedRoute();
    });
  });

  describe("authenticated", () => {
    describe("invalid url query params", () => {
      before(cy.seed);
      after(cy.cleanupDb);

      beforeEach(() => {
        cy.signIn("Marvin");
      });

      it("shows an error when query params are missing", () => {
        cy.visit("/dashboard/profile/billing/upgrade");
        cy.injectAxe();

        cy.title().should("eq", "Progressively | Profile | Billing | Upgrade");

        cy.findByText(
          "One of the mandatory information is missing. Please, retry the action."
        ).should("be.visible");

        cy.checkA11y();
      });

      it("shows an error when evalCount is missing", () => {
        cy.visit("/dashboard/profile/billing/upgrade");
        cy.injectAxe();

        cy.title().should("eq", "Progressively | Profile | Billing | Upgrade");

        cy.findByText(
          "One of the mandatory information is missing. Please, retry the action."
        ).should("be.visible");

        cy.checkA11y();
      });

      it("shows an error when evalCount is in invalid format", () => {
        cy.visit("/dashboard/profile/billing/upgrade?evalCount=abcd");
        cy.injectAxe();

        cy.title().should("eq", "Progressively | Profile | Billing | Upgrade");

        cy.findByText(
          "One of the information is not of a valid formatting. Please, try the action."
        ).should("be.visible");

        cy.checkA11y();
      });

      it("shows an error when evalCount is outside its range", () => {
        cy.visit("/dashboard/profile/billing/upgrade?evalCount=12000");
        cy.injectAxe();

        cy.title().should("eq", "Progressively | Profile | Billing | Upgrade");
        cy.findByRole("button", { name: "Update" }).click();

        cy.findByText(
          "Something went wrong when trying to add the plan."
        ).should("be.visible");

        cy.checkA11y();
      });
    });
  });
});
