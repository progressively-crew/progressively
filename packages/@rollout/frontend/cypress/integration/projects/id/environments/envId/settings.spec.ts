describe("/dashboard/projects/[id]/environments/[envId]/settings", () => {
  before(cy.seed);
  after(cy.cleanup);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1/environments/1/settings");
    });

    it("checks that the route is protected", () => {
      cy.checkProtectedRoute();
    });
  });

  describe("authenticated", () => {
    describe("user: Jane", () => {
      beforeEach(() => {
        cy.signIn("Jane");
        cy.visit("/dashboard/projects/1/environments/1/settings", {
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
        cy.visit("/dashboard/projects/1/environments/1/settings");
        cy.injectAxe();
      });

      it("shows a page layout", () => {
        cy.title().should(
          "eq",
          "Rollout | Project from seeding | Production | Settings"
        );

        cy.findByRole("heading", { name: "Danger zone" }).should("be.visible");
        cy.findByText(
          "You can delete an environment at any time, but you won’t be able to access its flags will be removed and be falsy in your applications. Be sure to know what you're doing before removing an environment."
        ).should("be.visible");

        cy.findByRole("link", { name: 'Delete "Production" forever' }).should(
          "be.visible"
        );

        cy.checkA11y();
      });
    });
  });
});
