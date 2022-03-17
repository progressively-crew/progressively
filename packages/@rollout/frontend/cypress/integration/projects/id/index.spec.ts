describe("/dashboard/projects/[id]", () => {
  before(cy.seed);
  after(cy.cleanup);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1");
    });

    it("checks that the route is protected", () => {
      cy.checkProtectedRoute();
    });
  });

  describe("authenticated", () => {
    describe("user: Jane", () => {
      beforeEach(() => {
        cy.signIn("Jane");
        cy.visit("/dashboard/projects/1", { failOnStatusCode: false });
      });

      it("shouldnt show anything when Jane tries to visit Marvin s project", () => {
        cy.checkProtectedRoute();
      });
    });

    describe("user: Marvin", () => {
      beforeEach(() => {
        cy.signIn("Marvin");
        cy.visit("/dashboard/projects/1", { failOnStatusCode: false });
        cy.injectAxe();
      });

      it("shows the project layout", () => {
        cy.title().should("eq", "Rollout | Project from seeding");

        cy.findByText("Projects")
          .should("be.visible")
          .and("have.attr", "href", "/dashboard");

        cy.findAllByText("Project from seeding")
          .first()
          .should("be.visible")
          .and("have.attr", "href", "/dashboard/projects/1")
          .and("have.attr", "aria-current", "page");

        cy.get("h1").should("contain", "Project from seeding");
        cy.findByRole("link", { name: "Settings" })
          .should("be.visible")
          .and("have.attr", "href", "/dashboard/projects/1/settings");

        cy.findByRole("link", { name: "Environments" })
          .should("be.visible")
          .and("have.attr", "href", "/dashboard/projects/1");

        cy.findByText("Create an environment")
          .should("be.visible")
          .and(
            "have.attr",
            "href",
            "/dashboard/projects/1/environments/create"
          );

        /* verify the env list */
        cy.findByText("Production")
          .should("be.visible")
          .and(
            "have.attr",
            "href",
            "/dashboard/projects/1/environments/1/flags"
          );
        cy.contains("valid-sdk-key").should("be.visible");

        cy.findByText("Developer")
          .should("be.visible")
          .and(
            "have.attr",
            "href",
            "/dashboard/projects/1/environments/2/flags"
          );
        cy.contains("valid-sdk-key-2").should("be.visible");

        cy.checkA11y();
      });
    });
  });
});
