describe("/dashboard/projects/[id]/settings", () => {
  before(cy.seed);
  after(cy.cleanupDb);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1/settings");
    });

    it("checks that the route is protected", () => {
      cy.checkUnauthenticatedRoute();
    });
  });

  describe("authenticated", () => {
    describe("user: Jane", () => {
      beforeEach(() => {
        cy.signIn("Jane");
        cy.visit("/dashboard/projects/1/settings", { failOnStatusCode: false });
      });

      it("shouldnt show anything when Jane tries to visit Marvin s project", () => {
        cy.checkProtectedRoute();
      });
    });

    describe("user: John", () => {
      beforeEach(() => {
        cy.signIn("John");
        cy.visit("/dashboard/projects/1/settings");
        cy.injectAxe();
      });

      it("does not show actions only allowed by the admin (john is a regular user)", () => {
        cy.findByRole("heading", { name: "Danger zone" }).should("not.exist");
        cy.findByRole("button", { name: "Add member" }).should("not.exist");

        cy.checkA11y();
      });
    });

    describe("user: Marvin", () => {
      beforeEach(() => {
        cy.signIn("Marvin");
        cy.visit("/dashboard/projects/1/settings");
        cy.injectAxe();
      });

      it("has a valid title", () => {
        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Settings"
        );
      });

      it("show actions only allowed by the admin", () => {
        cy.findByRole("heading", { name: "Danger zone" }).should("be.visible");

        cy.findByRole("link", { name: "Add member" }).should("be.visible");

        cy.checkA11y();
      });
    });
  });
});
