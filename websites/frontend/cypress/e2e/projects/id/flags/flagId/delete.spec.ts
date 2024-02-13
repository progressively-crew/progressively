describe("/dashboard/projects/[id]/flags/[flagId]/settings/delete", () => {
  before(cy.seed);
  after(cy.cleanupDb);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1/flags/1/settings/delete");
    });

    it("checks that the route is protected", () => {
      cy.checkUnauthenticatedRoute();
    });
  });

  describe("authenticated", () => {
    describe("user: Jane", () => {
      beforeEach(() => {
        cy.signIn("Jane");
        cy.visit("/dashboard/projects/1/flags/1/settings/delete", {
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
        cy.visit("/dashboard/projects/1/flags/1/settings/delete");
        cy.injectAxe();
      });

      it("shows the layout of the page", () => {
        cy.title().should(
          "eq",
          "Progressively | Project from seeding | New homepage | Delete"
        );

        cy.findByRole("heading", {
          name: "Are you sure you want to delete New homepage?",
        }).should("be.visible");

        cy.findByRole("button", {
          name: "Delete",
        }).should("be.visible");

        cy.contains("Cancel")
          .should("be.visible")
          .and("have.attr", "href", "/dashboard/projects/1/flags/1/settings");

        cy.checkA11y();
      });
    });

    describe("removing flags (needs reseeding after each test)", () => {
      beforeEach(cy.seed);
      afterEach(cy.cleanupDb);

      beforeEach(() => {
        cy.signIn("Marvin");
      });

      it("removes the flag and get me back to the envs page (empty state)", () => {
        // Delete the first flag
        cy.visit("/dashboard/projects/1/flags/1/settings/delete");
        cy.findByRole("button", {
          name: "Delete",
        }).click();

        cy.url().should(
          "contain",
          "/dashboard/projects/1/flags?flagRemoved=true"
        );

        // Delete the second flag
        cy.visit("/dashboard/projects/1/flags/2/settings/delete");
        cy.findByRole("button", {
          name: "Delete",
        }).click();

        cy.url().should(
          "contain",
          "/dashboard/projects/1/flags?flagRemoved=true"
        );

        cy.get(".success-box")
          .should("have.focus")
          .and("contain.text", "The flag has been successfully deleted.");
      });
    });
  });
});
