describe("/dashboard/projects/[id]/environments/[envId]", () => {
  before(cy.seed);
  after(cy.cleanupDb);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1/environments/1");
    });

    it("checks that the route is protected", () => {
      cy.checkUnauthenticatedRoute();
    });
  });

  describe("authenticated", () => {
    describe("user: Jane", () => {
      beforeEach(() => {
        cy.signIn("Jane");
        cy.visit("/dashboard/projects/1/environments/1", {
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
        cy.visit("/dashboard/projects/1/environments/1");
        cy.injectAxe();
      });

      it("shows a page layout", () => {
        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Production | Settings"
        );

        cy.findByRole("heading", { name: "Danger zone" }).should("be.visible");
        cy.findByText(
          "You can delete an environment at any time, but you won't be able to access its flags will be removed and be falsy in your applications. Be sure to know what you're doing before removing an environment."
        ).should("be.visible");

        cy.findByRole("link", { name: 'Delete "Production" forever' }).should(
          "be.visible"
        );

        cy.checkA11y();
      });
    });
  });
});
