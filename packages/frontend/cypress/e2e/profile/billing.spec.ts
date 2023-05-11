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

        cy.title().should("eq", "Progressively | Profile | Billing");

        cy.findByText("Passed plans").should("not.exist");
        cy.findByText("€11").should("be.visible");
        cy.findByLabelText("Number of projects").should("have.value", 1);
        cy.findByLabelText("Number of environments/project").should(
          "have.value",
          1
        );
        cy.findByLabelText("Flag evaluations/month").should(
          "have.value",
          10_000
        );
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

        cy.contains(
          "This is what you are actually paying per month. You can quickly adjust using the sliders below to fit your audience needs."
        ).should("be.visible");
        cy.findByText("Passed plans").should("be.visible");
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

        cy.findByText("You are in a trialing period").should("be.visible");
        cy.contains(
          "After the remaining 14 days of this trialing period, you will have to subscribe and use this calculator."
        ).should("be.visible");
      });
    });
  });
});
