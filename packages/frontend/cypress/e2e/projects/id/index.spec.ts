describe("/dashboard/projects/[id]", () => {
  before(cy.seed);
  after(cy.cleanupDb);

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
        cy.title().should("eq", "Progressively | Project from seeding");

        cy.verifyBreadcrumbs([
          ["Projects", "/dashboard"],
          ["Project from seeding", "/dashboard/projects/1"],
        ]);

        cy.findAllByText("Project from seeding").should("have.length", 2);

        cy.findByRole("link", { name: "Settings" })
          .should("be.visible")
          .and("have.attr", "href", "/dashboard/projects/1/settings");

        cy.findByRole("link", { name: "Environments" })
          .should("be.visible")
          .and("have.attr", "href", "/dashboard/projects/1");

        cy.findByRole("link", { name: "Create an environment" })
          .should("be.visible")
          .and(
            "have.attr",
            "href",
            "/dashboard/projects/1/environments/create"
          );

        /* verify the env list */
        cy.get("main").within(() => {
          cy.findByRole("link", { name: "Production" })
            .should("be.visible")
            .and("have.attr", "href", "/dashboard/projects/1/environments/1");

          cy.findByRole("link", { name: "Developer" })
            .should("be.visible")
            .and("have.attr", "href", "/dashboard/projects/1/environments/2");
        });

        cy.checkA11y();
      });
    });
  });
});
