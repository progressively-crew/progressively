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

      cy.findByText("Projects")
        .should("be.visible")
        .and("have.attr", "href", "/dashboard");

      cy.findAllByText("Create a project")
        .first()
        .should("be.visible")
        .and("have.attr", "href", "/dashboard/projects/create")
        .and("have.attr", "aria-current", "page");

      cy.findByLabelText("Project name").should("be.visible");
      cy.findByText(
        "When creating a project, you'll become the administrator of it and will have full control over it."
      ).should("be.visible");
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
