describe("/dashboard/projects/[id]/environments/[envId]", () => {
  before(cy.seed);
  after(cy.cleanupDb);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1/environments/1");
    });

    it("checks that the route is protected", () => {
      cy.checkUnauthenticatedRoute();
    });
  });

  describe("authenticated", () => {
    describe("user: Jane", () => {
      beforeEach(() => {
        cy.signIn("Jane");
        cy.visit("/dashboard/projects/1/environments/1", {
          failOnStatusCode: false,
        });
      });

      it("shouldnt show anything when Jane tries to visit Marvin s project", () => {
        cy.checkProtectedRoute();
      });
    });

    describe("user: John", () => {
      beforeEach(() => {
        cy.signIn("John");
        cy.visit("/dashboard/projects/1/environments/2");
        cy.injectAxe();
      });

      it("should show the empty state when there are no flags", () => {
        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Developer | Flags"
        );

        cy.verifyBreadcrumbs([
          ["Projects", "/dashboard"],
          ["Project from seeding", "/dashboard/projects/1/flags"],
          ["Developer", "/dashboard/projects/1/environments/2"],
        ]);

        cy.findAllByText("Developer").should("have.length", 3);
        cy.findByRole("heading", { name: "No flags found" }).should(
          "be.visible"
        );

        cy.findByText("There are no flags yet on this environment.").should(
          "be.visible"
        );

        cy.findAllByRole("link", { name: "Add a feature flag" })
          .should("be.visible")
          .and("have.attr", "href", "/dashboard/projects/1/flags/create");
      });
    });

    describe("user: Marvin", () => {
      beforeEach(() => {
        cy.signIn("Marvin");
        cy.visit("/dashboard/projects/1/environments/1");
        cy.injectAxe();
      });

      it("shows the layout", () => {
        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Production | Flags"
        );

        cy.verifyBreadcrumbs([
          ["Projects", "/dashboard"],
          ["Project from seeding", "/dashboard/projects/1/flags"],
          ["Production", "/dashboard/projects/1/environments/1"],
        ]);

        cy.findAllByText("Production").should("have.length", 3);
        cy.findByRole("heading", { name: "Feature flags" }).should("exist");

        cy.findByRole("link", { name: "Feature flags" }).should("be.visible");
        cy.findByRole("link", { name: "Add a feature flag" })
          .should("be.visible")
          .and("have.attr", "href", "/dashboard/projects/1/flags/create");

        /* verify the flag list */
        cy.findAllByRole("link", { name: "New homepage" }).should("be.visible");

        // it overflows in the table, reason why we test the existence and no the visibility
        cy.findByText("newHomepage").should("exist");

        cy.checkA11y();
      });
    });
  });
});
