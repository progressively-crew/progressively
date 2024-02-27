describe("/dashboard/projects/[id]/flags/all", () => {
  before(cy.seed);
  after(cy.cleanupDb);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1/flags/all");
    });

    it("checks that the route is protected", () => {
      cy.checkUnauthenticatedRoute();
    });
  });

  describe("authenticated", () => {
    describe("user: Jane", () => {
      beforeEach(() => {
        cy.signIn("Jane");
        cy.visit("/dashboard/projects/1/flags/all", {
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
        cy.visit("/dashboard/projects/1/flags/all");
        cy.injectAxe();
      });

      it("shows the layout", () => {
        cy.title().should("eq", "Progressively | Project from seeding | Flags");

        cy.findByRole("heading", { name: "Feature flags" }).should("exist");

        cy.checkA11y();
      });
    });
  });
});
