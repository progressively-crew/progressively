describe("/dashboard/projects/[id]/environments/[envId]/flags/[flagId]/metrics/create", () => {
  before(cy.seed);
  after(cy.cleanupDb);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1/environments/1/flags/1/metrics/create");
    });

    it("checks that the route is protected", () => {
      cy.checkProtectedRoute();
    });
  });

  describe("authenticated", () => {
    describe("user: Jane", () => {
      beforeEach(() => {
        cy.signIn("Jane");
        cy.visit(
          "/dashboard/projects/1/environments/1/flags/1/metrics/create",
          {
            failOnStatusCode: false,
          }
        );
      });

      it("shouldnt show anything when Jane tries to visit Marvin s project", () => {
        cy.checkProtectedRoute();
      });
    });

    describe("user: Marvin", () => {
      beforeEach(() => {
        cy.signIn("Marvin");
        cy.visit("/dashboard/projects/1/environments/1/flags/1/metrics/create");

        cy.injectAxe();
      });

      it("shows the layout", () => {
        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Production | Flags | New homepage | Metrics | Create"
        );

        cy.verifyBreadcrumbs([
          ["Projects", "/dashboard"],
          ["Project from seeding", "/dashboard/projects/1"],
          ["Production", "/dashboard/projects/1/environments/1"],
          ["New homepage", "/dashboard/projects/1/environments/1/flags/1"],
          [
            "Create a metric",
            "/dashboard/projects/1/environments/1/flags/1/metrics/create",
          ],
        ]);

        cy.findByRole("heading", { name: "Create a metric" }).should(
          "be.visible"
        );

        cy.contains(
          "You're about to create a metric to New homepage in Project from seeding on Production."
        ).should("be.visible");

        cy.checkA11y();
      });

      it("adds a metric", () => {
        cy.findByLabelText("Metric name").type("New metric");
        cy.findByRole("button", { name: "Create the metric" })
          .should("be.visible")
          .click();

        cy.url().should(
          "include",
          "/dashboard/projects/1/environments/1/flags/1/metrics?newMetric=true"
        );

        cy.get(".success-box")
          .should("have.focus")
          .and("contain.text", "The metric has been successfully added.");

        cy.checkA11y();
      });
    });
  });
});
