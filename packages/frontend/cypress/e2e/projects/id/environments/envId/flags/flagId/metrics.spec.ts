describe("/dashboard/projects/[id]/environments/[envId]/flags/[flagId]/metrics", () => {
  before(cy.seed);
  after(cy.cleanupDb);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1/environments/1/flags/1/metrics");
    });

    it("checks that the route is protected", () => {
      cy.checkUnauthenticatedRoute();
    });
  });

  describe("authenticated", () => {
    describe("user: Jane", () => {
      beforeEach(() => {
        cy.signIn("Jane");
        cy.visit("/dashboard/projects/1/environments/1/flags/1/metrics", {
          failOnStatusCode: false,
        });
      });

      it("shouldnt show anything when Jane tries to visit Marvin s project", () => {
        cy.checkProtectedRoute();
      });
    });

    describe("user: Marvin", () => {
      beforeEach(() => {
        cy.signIn("Marvin");
      });

      it("shows the layout (with data)", () => {
        cy.visit("/dashboard/projects/1/environments/1/flags/1/metrics");
        cy.injectAxe();

        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Production | Flags | New homepage | Metrics"
        );

        cy.verifyBreadcrumbs([
          ["My projects", "/dashboard"],
          ["Project from seeding", "/dashboard/projects/1/flags"],
          ["Production", "/dashboard/projects/1/environments/1"],
          [
            "New homepage",
            "/dashboard/projects/1/environments/1/flags/1",
            false,
          ],
        ]);

        cy.findByRole("link", { name: "Insights" })
          .should("be.visible")
          .and(
            "have.attr",
            "href",
            "/dashboard/projects/1/environments/1/flags/1/insights"
          );

        cy.findByRole("link", { name: "Metrics" })
          .should("be.visible")
          .and(
            "have.attr",
            "href",
            "/dashboard/projects/1/environments/1/flags/1/metrics"
          )
          .and("have.attr", "aria-current", "page");

        cy.findAllByText("New homepage").should("have.length", 2);
        cy.findByRole("heading", { name: "Metrics" }).should("be.visible");

        cy.checkA11y();
      });

      it("shows the layout (without data)", () => {
        cy.visit("/dashboard/projects/1/environments/1/flags/2/metrics");
        cy.injectAxe();

        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Production | Flags | New footer | Metrics"
        );

        cy.findAllByText("New footer").should("have.length", 2);
        cy.findByRole("heading", { name: "Metrics" }).should("be.visible");

        cy.findByText("No metrics found").should("be.visible");
        cy.findByText("There are no metrics for this flag.").should(
          "be.visible"
        );

        cy.checkA11y();
      });

      it("shows the layout (with data)", () => {
        cy.visit("/dashboard/projects/1/environments/1/flags/4/metrics");
        cy.injectAxe();

        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Production | Flags | With multivariate | Metrics"
        );

        cy.findByRole("heading", { name: "Metrics" }).should("be.visible");

        cy.findAllByText("A metric").should("have.length", 2);
        cy.findAllByText("B metric").should("have.length", 2);

        cy.checkA11y();
      });
    });
  });
});
