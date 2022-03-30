describe("/dashboard/projects/[id]/settings", () => {
  before(cy.seed);
  after(cy.cleanup);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1/settings");
    });

    it("checks that the route is protected", () => {
      cy.checkProtectedRoute();
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
        cy.title().should("eq", "Rollout | Project from seeding | Settings");
      });

      it("show actions only allowed by the admin", () => {
        cy.findByRole("heading", { name: "Danger zone" }).should("be.visible");
        cy.findByRole("button", { name: "Remove from project" }).should(
          "be.visible"
        );

        cy.checkA11y();
      });

      it("shows an error message when trying to remove an admin user", () => {
        cy.get("#col-1").last().click();
        cy.findByRole("button", { name: "Remove from project" }).click();

        cy.get(".error-box")
          .should("have.focus")
          .and(
            "contain.text",
            "You have attempted to remove an admin user! No worries, we got your back!"
          );

        cy.checkA11y();
      });

      it("shows a success message when removing a user", () => {
        cy.get("#col-2").last().click();
        cy.findByRole("button", { name: "Remove from project" }).click();

        cy.get(".success-box")
          .should("have.focus")
          .and(
            "contain.text",
            "1 user have been successfully removed from the project."
          );

        cy.checkA11y();
      });
    });
  });
});
