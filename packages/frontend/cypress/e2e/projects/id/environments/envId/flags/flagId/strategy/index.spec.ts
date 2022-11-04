describe("/dashboard/projects/[id]/environments/[envId]/flags/[flagId]/strategies", () => {
  beforeEach(cy.seed);
  afterEach(cy.cleanupDb);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1/environments/1/flags/1/strategies");
    });

    it("checks that the route is protected", () => {
      cy.checkProtectedRoute();
    });
  });

  describe("authenticated", () => {
    describe("user: Jane", () => {
      beforeEach(() => {
        cy.signIn("Jane");
        cy.visit("/dashboard/projects/1/environments/1/flags/1/strategies", {
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

      it("shows the layout — (empty)", () => {
        cy.visit("/dashboard/projects/1/environments/1/flags/4/strategies");
        cy.injectAxe();

        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Production | Flags | With multivariate | Strategies"
        );

        cy.verifyBreadcrumbs([
          ["Projects", "/dashboard"],
          ["Project from seeding", "/dashboard/projects/1"],
          ["Production", "/dashboard/projects/1/environments/1"],
          ["With multivariate", "/dashboard/projects/1/environments/1/flags/4"],
        ]);

        cy.findAllByText("Strategies").should("have.length", 3);
        cy.findByRole("heading", { name: "Strategies" }).should("be.visible");

        cy.findByText("No strategies found").should("be.visible");
        cy.findByText("There are no strategies for this flag.").should(
          "be.visible"
        );
        cy.findByRole("link", { name: "Create a strategy" }).should(
          "be.visible"
        );

        cy.checkA11y();
      });

      it("shows the layout — (filled data)", () => {
        cy.visit("/dashboard/projects/1/environments/1/flags/1/strategies");
        cy.injectAxe();

        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Production | Flags | New homepage | Strategies"
        );

        cy.verifyBreadcrumbs([
          ["Projects", "/dashboard"],
          ["Project from seeding", "/dashboard/projects/1"],
          ["Production", "/dashboard/projects/1/environments/1"],
          ["New homepage", "/dashboard/projects/1/environments/1/flags/1"],
        ]);

        cy.findAllByText("New homepage").should("have.length", 3);
        cy.findByRole("heading", { name: "Strategies" }).should("be.visible");

        cy.findByRole("link", { name: "Create a strategy" }).should(
          "be.visible"
        );

        cy.checkA11y();
      });
    });
  });
});
