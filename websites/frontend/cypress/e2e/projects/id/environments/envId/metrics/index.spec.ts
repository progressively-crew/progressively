describe("/dashboard/projects/[id]/environments/[envId]/metrics", () => {
  before(cy.seed);
  after(cy.cleanupDb);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1/environments/1/metrics");
    });

    it("checks that the route is protected", () => {
      cy.checkUnauthenticatedRoute();
    });
  });

  describe("authenticated", () => {
    describe("user: Jane", () => {
      beforeEach(() => {
        cy.signIn("Jane");
        cy.visit("/dashboard/projects/1/environments/1/metrics", {
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
        cy.visit("/dashboard/projects/1/environments/1/metrics");
        cy.injectAxe();

        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Production | Metrics"
        );

        cy.verifyBreadcrumbs([
          ["My projects", "/dashboard"],
          ["Project from seeding", "/dashboard/projects/1/flags"],
          ["Production", "/dashboard/projects/1/environments/1/flags"],
        ]);

        cy.findByRole("heading", { name: "Metrics" }).should("be.visible");

        cy.checkA11y();
      });

      it("shows the layout (without data)", () => {
        cy.visit("/dashboard/projects/1/environments/2/metrics");
        cy.injectAxe();

        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Developer | Metrics"
        );

        cy.findByRole("heading", { name: "Metrics" }).should("be.visible");

        cy.findByText("No metrics found").should("be.visible");
        cy.findByText("There are no metrics for this flag.").should(
          "be.visible"
        );

        cy.checkA11y();
      });

      it("shows the layout (with data)", () => {
        cy.visit("/dashboard/projects/1/environments/1/metrics");
        cy.injectAxe();

        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Production | Metrics"
        );

        cy.findByRole("heading", { name: "Metrics" }).should("be.visible");

        cy.findAllByText("A metric").should("be.visible");
        cy.findAllByText("B metric").should("be.visible");

        cy.checkA11y();
      });
    });
  });
});
