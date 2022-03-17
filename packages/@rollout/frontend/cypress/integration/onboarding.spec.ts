describe("/dashboard/onboarding", () => {
  before(cy.seed);
  after(cy.cleanup);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/onboarding");
    });

    it("checks that the route is protected", () => {
      cy.checkProtectedRoute();
    });
  });

  describe("authenticated", () => {
    beforeEach(() => {
      cy.signIn("Jane");
      cy.visit("/dashboard/onboarding");
      cy.injectAxe();
    });

    it("shows an onboarding layout", () => {
      cy.title().should("eq", "Rollout | Onboarding");
      cy.findByText("Welcome aboard").should("be.visible");
      cy.contains(
        "Before being fully operational, you will need to create a project"
      ).should("be.visible");
      cy.findByLabelText("Project name").should("be.visible");
      cy.get("button[type=submit]").should("be.visible");

      cy.checkA11y();
    });

    it("shows an error when submitting an empty form", () => {
      cy.get("button[type=submit]").click();
      cy.get(".error-box").should("have.focus");
      cy.findByText(
        "The name field is required, make sure to have one."
      ).should("be.visible");

      cy.checkA11y();
    });

    it("creates a new project", () => {
      cy.get("input").type("My new project");
      cy.get("button[type=submit]").click();

      cy.get(".success-box").should("have.focus");
      cy.findByText("The project has been successfully created.").should(
        "be.visible"
      );

      cy.findByText("My new project").should("be.visible");

      cy.url().should("include", "/dashboard?newProjectId");
      cy.checkA11y();
    });
  });
});
