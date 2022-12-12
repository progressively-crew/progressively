describe("/dashboard/projects/create", () => {
  before(cy.seed);
  after(cy.cleanupDb);

  beforeEach(() => {
    cy.visit("/dashboard/projects/create");
  });

  describe("not authenticated", () => {
    it("checks that the route is protected", () => {
      cy.checkProtectedRoute();
    });
  });

  describe("authenticated", () => {
    beforeEach(() => {
      cy.signIn("Marvin");
      cy.visit("/dashboard/projects/create");
      cy.injectAxe();
    });

    it("shows the create page layout", () => {
      cy.title().should("eq", "Progressively | Create a project");
      cy.findByRole("heading", { name: "Create a project" }).should(
        "be.visible"
      );

      cy.verifyBreadcrumbs([
        ["Projects", "/dashboard"],
        ["Create a project", "/dashboard/projects/create"],
      ]);

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
      cy.findByLabelText("Project name").type("My new project");
      cy.findByRole("button", { name: "Create the project" }).click();

      cy.get(".success-box")
        .should("have.focus")
        .and("contain.text", "The project has been successfully created.");

      // Verify the dashboard
      cy.get("main").within(() => {
        cy.findByText("My new project").should("be.visible");
      });

      cy.url().should("include", "/dashboard?newProjectId");
      cy.checkA11y();
    });
  });
});
