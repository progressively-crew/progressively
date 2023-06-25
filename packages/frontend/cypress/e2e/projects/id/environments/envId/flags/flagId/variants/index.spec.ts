describe("/dashboard/projects/[id]/environments/[envId]/flags/[flagId]/variants", () => {
  beforeEach(cy.seed);
  afterEach(cy.cleanupDb);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1/environments/1/flags/1/variants");
    });

    it("checks that the route is protected", () => {
      cy.checkUnauthenticatedRoute();
    });
  });

  describe("authenticated", () => {
    describe("user: Jane", () => {
      beforeEach(() => {
        cy.signIn("Jane");
        cy.visit("/dashboard/projects/1/environments/1/flags/1/variants", {
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

      it("shows the layout", () => {
        cy.visit("/dashboard/projects/1/environments/1/flags/4/variants");
        cy.injectAxe();

        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Production | Flags | With multivariate | Variants"
        );

        cy.verifyBreadcrumbs([
          ["My projects", "/dashboard"],
          ["Project from seeding", "/dashboard/projects/1/flags"],
          ["Production", "/dashboard/projects/1/environments/1"],
          ["With multivariate", "/dashboard/projects/1/environments/1/flags/4"],
        ]);

        cy.findAllByText("With multivariate").should("have.length", 2);
        cy.findByRole("heading", { name: "Variants" }).should("be.visible");

        cy.findByRole("link", { name: "Create a variant" }).should(
          "be.visible"
        );

        cy.checkA11y();
      });
    });
  });
});
