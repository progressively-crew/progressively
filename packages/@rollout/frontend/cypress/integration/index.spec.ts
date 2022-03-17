describe("/dashboard", () => {
  before(cy.seed);
  after(cy.cleanup);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard");
    });

    describe("not authenticated", () => {
      it("checks that the route is protected", () => {
        cy.checkProtectedRoute();
      });
    });
  });

  describe("authenticated", () => {
    describe("user: Marvin", () => {
      beforeEach(() => {
        cy.signIn("Marvin");
        cy.visit("/dashboard");
        cy.injectAxe();
      });

      it("shows a list of project and Marvin s name in the menu", () => {
        cy.title().should("eq", "Rollout | Projects list");
        cy.findByText("Projects").should("be.visible");

        cy.findByRole("button", { name: /Marvin Frachet/i }).should(
          "be.visible"
        );

        cy.findByText("Project from seeding")
          .should("be.visible")
          .and("have.attr", "href", "/dashboard/projects/1");

        cy.contains("Create a project").should(
          "have.attr",
          "href",
          "/dashboard/projects/create"
        );

        cy.contains("You are an admin of the project.").should("be.visible");

        cy.checkA11y();
      });
    });

    describe("user: Jane", () => {
      beforeEach(() => {
        cy.signIn("Jane");
        cy.visit("/dashboard");
      });

      it("shows the onboarding page", () => {
        cy.url().should("include", "/onboarding");
      });
    });
  });
});
