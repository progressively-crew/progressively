describe("/dashboard/projects/[id]/environments/[envId]/ab/[experimentId]/variations", () => {
  before(cy.seed);
  after(cy.cleanup);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1/environments/1/ab/1/variations");
    });

    it("checks that the route is protected", () => {
      cy.checkProtectedRoute();
    });
  });

  describe("authenticated", () => {
    describe("user: Jane", () => {
      beforeEach(() => {
        cy.signIn("Jane");
        cy.visit("/dashboard/projects/1/environments/1/ab/1/variations", {
          failOnStatusCode: false,
        });
      });

      it("shouldnt show anything when Jane tries to visit Marvin s project", () => {
        cy.checkProtectedRoute();
      });
    });

    describe("user: Marvin", () => {
      describe("empty state", () => {
        beforeEach(() => {
          cy.signIn("Marvin");
          cy.visit("/dashboard/projects/1/environments/1/ab/3/variations");
          cy.injectAxe();
        });

        it("shows a page layout (empty state)", () => {
          cy.title().should(
            "eq",
            "Progressively | Project from seeding | Production | New footer experiment | Variations"
          );

          cy.findByRole("heading", { name: "Variations" }).should("exist");

          cy.findByRole("heading", { name: "No variations found" }).should(
            "exist"
          );

          cy.findByText(
            "There are no variations found to this flag yet."
          ).should("be.visible");

          cy.findByRole("link", { name: "Add a variation" }).should(
            "be.visible"
          );

          cy.checkA11y();
        });
      });
    });
  });
});
