describe("/dashboard/projects/[id]/environments/[envId]/flags/[flagId]/metrics/create", () => {
  before(cy.seed);
  after(cy.cleanupDb);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1/environments/1/flags/1/metrics/create");
    });

    it("checks that the route is protected", () => {
      cy.checkUnauthenticatedRoute();
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

        cy.findByRole("heading", { name: "Create a metric" }).should(
          "be.visible"
        );

        cy.checkA11y();
      });

      it("adds a metric", () => {
        cy.findByLabelText("Metric name").type("New metric");
        cy.findByRole("button", { name: "Create the metric" }).click();

        cy.url().should(
          "include",
          "/dashboard/projects/1/environments/1/flags/1/metrics?newMetric=true"
        );

        cy.get(".success-box").should(
          "contain.text",
          "The metric has been successfully added."
        );

        cy.checkA11y();
      });
    });
  });
});
