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
      cy.title().should("eq", "Progressively | Onboarding");
      cy.findByText("Welcome aboard").should("be.visible");
      cy.contains(
        "Before being fully operational, you will need to create a project"
      ).should("be.visible");
      cy.findByLabelText("Project name").should("be.visible");
      cy.findByRole("button", { name: "Create the project" }).should(
        "be.visible"
      );

      cy.checkA11y();
    });

    it("shows an error when submitting an empty form", () => {
      cy.findByRole("button", { name: "Create the project" }).click();
      cy.get(".error-box")
        .should("have.focus")
        .and(
          "contain.text",
          "The name field is required, make sure to have one."
        );

      cy.checkA11y();
    });

    it("creates a new project", () => {
      cy.get("input").type("My new project");
      cy.findByRole("button", { name: "Create the project" }).click();
      cy.get(".success-box")
        .should("have.focus")
        .and("contain.text", "The project has been successfully created.");

      cy.findByText("My new project").should("be.visible");

      cy.url().should("include", "/dashboard?newProjectId");
      cy.checkA11y();
    });
  });
});
