describe("/dashboard/projects/create", () => {
  before(cy.seed);
  after(cy.cleanupDb);

  beforeEach(() => {
    cy.visit("/dashboard/projects/create");
  });

  describe("not authenticated", () => {
    it("checks that the route is protected", () => {
      cy.checkUnauthenticatedRoute();
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
      cy.findByRole("textbox", { name: "Project name" }).type("My new project");
      cy.findByRole("textbox", { name: "Domain" }).type("project");
      cy.findByRole("button", { name: "Create the project" }).click();

      cy.get(".success-box").and(
        "contain.text",
        "The project has been successfully created."
      );

      // Verify the dashboard
      cy.findAllByText("My new project").should("have.length", 2);

      cy.url().should("include", "/dashboard/projects/");
      cy.checkA11y();
    });
  });
});
