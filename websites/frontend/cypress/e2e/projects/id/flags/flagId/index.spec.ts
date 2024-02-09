describe("/dashboard/projects/[id]/flags/[flagId]/audience", () => {
  before(cy.seed);
  after(cy.cleanupDb);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1/flags/1/audience");
    });

    it("checks that the route is protected", () => {
      cy.checkUnauthenticatedRoute();
    });
  });

  describe("authenticated", () => {
    describe("user: Jane", () => {
      beforeEach(() => {
        cy.signIn("Jane");
        cy.visit("/dashboard/projects/1/flags/1/audience", {
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
        cy.visit("/dashboard/projects/1/flags/1/audience");
        cy.injectAxe();

        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Flags | New homepage"
        );

        cy.findAllByText("New homepage").should("have.length", 2);
        cy.findByRole("heading", { name: "Audience" }).should("be.visible");

        cy.checkA11y();
      });
    });
  });
});
