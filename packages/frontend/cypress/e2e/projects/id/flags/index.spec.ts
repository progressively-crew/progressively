describe("/dashboard/projects/[id]/flags", () => {
  before(cy.seed);
  after(cy.cleanupDb);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1/flags");
    });

    it("checks that the route is protected", () => {
      cy.checkUnauthenticatedRoute();
    });
  });

  describe("authenticated", () => {
    describe("user: Jane", () => {
      beforeEach(() => {
        cy.signIn("Jane");
        cy.visit("/dashboard/projects/1/flags", {
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
        cy.visit("/dashboard/projects/1/flags");
        cy.injectAxe();
      });

      it("shows the layout", () => {
        cy.title().should("eq", "Progressively | Project from seeding | Flags");

        cy.verifyBreadcrumbs([
          ["Projects", "/dashboard"],
          ["Project from seeding", "/dashboard/projects/1/flags"],
        ]);

        cy.findByRole("heading", { name: "Feature flags" }).should("exist");
        cy.findByRole("link", { name: "With multivariate" }).should(
          "be.visible"
        );
        cy.findByRole("link", { name: "New footer" }).should("be.visible");
        cy.findByRole("link", { name: "New homepage" }).should("be.visible");

        cy.checkA11y();
      });
    });
  });
});
