// Only exist for SaaS pages
describe("/dashboard/profile/billing", () => {
  before(cy.seed);
  after(cy.cleanupDb);

  beforeEach(() => {
    cy.visit("/dashboard/profile/billing");
  });

  describe("not authenticated", () => {
    it("checks that the route is protected", () => {
      cy.checkUnauthenticatedRoute();
    });
  });

  describe("authenticated", () => {
    describe("trialEnd is null (think user is invited to a project)", () => {
      beforeEach(() => {
        cy.signIn("Marvin");
        cy.visit("/dashboard/profile/billing");
        cy.injectAxe();
      });

      it("shows the billing page", () => {
        cy.title().should("eq", "Progressively | Profile | Billing");
        cy.checkA11y();
      });
    });

    describe("activePlan is set", () => {
      beforeEach(() => {
        cy.signIn("Jane");
        cy.visit("/dashboard/profile/billing");
        cy.injectAxe();
      });

      it("shows the billing page", () => {
        cy.title().should("eq", "Progressively | Profile | Billing");

        cy.findByText("€22").should("be.visible");
        cy.findByLabelText("Number of projects").should("have.value", 2);
        cy.findByLabelText("Number of environments/project").should(
          "have.value",
          2
        );
        cy.findByLabelText("Flag evaluations/month").should(
          "have.value",
          20_000
        );
        cy.checkA11y();
      });
    });

    describe("trialingEnd is in progress", () => {
      beforeEach(() => {
        cy.signIn("Joe");
        cy.visit("/dashboard/profile/billing");
        cy.injectAxe();
      });

      it("shows the billing page", () => {
        cy.title().should("eq", "Progressively | Profile | Billing");
        cy.checkA11y();
      });
    });
  });
});
