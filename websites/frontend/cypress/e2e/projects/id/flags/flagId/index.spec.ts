describe("/dashboard/projects/[id]/flags/[flagId]", () => {
  before(cy.seed);
  after(cy.cleanupDb);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1/flags/1");
    });

    it("checks that the route is protected", () => {
      cy.checkUnauthenticatedRoute();
    });
  });

  describe("authenticated", () => {
    describe("user: Jane", () => {
      beforeEach(() => {
        cy.signIn("Jane");
        cy.visit("/dashboard/projects/1/flags/1", {
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
        cy.visit("/dashboard/projects/1/flags/1");
        cy.injectAxe();
      });

      it("shows a page layout", () => {
        cy.title().should(
          "eq",
          "Progressively | Project from seeding | New homepage | Settings"
        );

        cy.findByRole("heading", { name: "Danger zone" }).should("be.visible");

        cy.findByText(
          "You can delete a feature flag at any time, but you won't be able to access its insights anymore and false will be served to the application using it."
        ).should("be.visible");

        cy.findByRole("link", { name: "Delete New homepage forever" })
          .should("be.visible")
          .and("have.attr", "href", "/dashboard/projects/1/flags/1/delete");

        cy.checkA11y();
      });
    });
  });
});
