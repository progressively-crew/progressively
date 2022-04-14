describe("/dashboard/projects/create", () => {
  before(cy.seed);
  after(cy.cleanup);

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
      cy.title().should("eq", "Rollout | Create a project");
      cy.findByRole("heading", { name: "Create a project" }).should(
        "be.visible"
      );

      cy.findByRole("link", { name: "Projects" })
        .should("be.visible")
        .and("have.attr", "href", "/dashboard");

      cy.findByRole("link", { name: "Create a project" })
        .should("be.visible")
        .and("have.attr", "href", "/dashboard/projects/create")
        .and("have.attr", "aria-current", "page");

      cy.findByLabelText("Project name").should("be.visible");
      cy.findByText(
        "When creating a project, you'll become the administrator of it and will have full control over it."
      ).should("be.visible");

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
      cy.findByText("My new project").should("be.visible");
      cy.url().should("include", "/dashboard?newProjectId");
      cy.checkA11y();
    });
  });
});
