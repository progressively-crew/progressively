describe("/dashboard/projects/[id]/environments/[envId]/flags/[flagId]", () => {
  before(cy.seed);
  after(cy.cleanupDb);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1/environments/1/flags/1");
    });

    it("checks that the route is protected", () => {
      cy.checkProtectedRoute();
    });
  });

  describe("authenticated", () => {
    describe("user: Jane", () => {
      beforeEach(() => {
        cy.signIn("Jane");
        cy.visit("/dashboard/projects/1/environments/1/flags/1", {
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
        cy.visit("/dashboard/projects/1/environments/1/flags/1");
        cy.injectAxe();
      });

      it("shows the layout", () => {
        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Production | Flags | New homepage"
        );

        cy.verifyBreadcrumbs([
          ["Projects", "/dashboard"],
          ["Project from seeding", "/dashboard/projects/1"],
          ["Production", "/dashboard/projects/1/environments/1"],
          ["New homepage", "/dashboard/projects/1/environments/1/flags/1"],
        ]);

        cy.findAllByText("New homepage").should("have.length", 2);
        cy.findByRole("heading", { name: "Rollout details" }).should(
          "be.visible"
        );
        cy.findByRole("heading", { name: "Percentage of the audience" }).should(
          "be.visible"
        );
        cy.findByRole("heading", { name: "Strategies" }).should("be.visible");
        cy.findAllByText("Super strategy").should("be.visible");

        cy.checkA11y();
      });
    });
  });
});
