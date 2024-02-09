describe("/dashboard/projects/[id]/flags/[flagId]/activity", () => {
  before(cy.seed);
  after(cy.cleanupDb);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1/flags/1/activity");
    });

    it("checks that the route is protected", () => {
      cy.checkUnauthenticatedRoute();
    });
  });

  describe("authenticated", () => {
    describe("user: Jane", () => {
      beforeEach(() => {
        cy.signIn("Jane");
        cy.visit("/dashboard/projects/1/flags/1/activity", {
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
        cy.visit("/dashboard/projects/1/flags/1/activity");
        cy.injectAxe();

        cy.title().should(
          "eq",
          "Progressively | Project from seeding | New homepage | Activity"
        );

        cy.findAllByText("New homepage").should("have.length", 2);
        cy.findByRole("heading", { name: "Activity" }).should("be.visible");

        cy.checkA11y();
      });
    });
  });
});
