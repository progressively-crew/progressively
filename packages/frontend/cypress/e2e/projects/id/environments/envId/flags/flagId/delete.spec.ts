describe("/dashboard/projects/[id]/environments/[envId]/flags/[flagId]/delete", () => {
  before(cy.seed);
  after(cy.cleanupDb);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1/environments/1/flags/1/delete");
    });

    it("checks that the route is protected", () => {
      cy.checkProtectedRoute();
    });
  });

  describe("authenticated", () => {
    describe("user: Jane", () => {
      beforeEach(() => {
        cy.signIn("Jane");
        cy.visit("/dashboard/projects/1/environments/1/flags/1/delete", {
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
        cy.visit("/dashboard/projects/1/environments/1/flags/1/delete");
        cy.injectAxe();
      });

      it("shows the layout of the page", () => {
        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Production | New homepage | Delete"
        );

        cy.findByRole("heading", {
          name: "Deleting a feature flag",
        }).should("be.visible");

        cy.findByRole("button", {
          name: "Yes, delete the flag",
        }).should("be.visible");

        cy.contains("No, don't delete New homepage")
          .should("be.visible")
          .and(
            "have.attr",
            "href",
            "/dashboard/projects/1/environments/1/flags/1/settings"
          );

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
        cy.visit("/dashboard/projects/1/environments/1/flags/1/delete");
        cy.findByRole("button", {
          name: "Yes, delete the flag",
        })
          .should("be.visible")
          .click();

        cy.url().should(
          "contain",
          "/dashboard/projects/1/environments/1?flagRemoved=true"
        );

        // Delete the second flag
        cy.visit("/dashboard/projects/1/environments/1/flags/2/delete");
        cy.findByRole("button", {
          name: "Yes, delete the flag",
        })
          .should("be.visible")
          .click();

        cy.url().should(
          "contain",
          "/dashboard/projects/1/environments/1?flagRemoved=true"
        );

        cy.get(".success-box")
          .should("have.focus")
          .and("contain.text", "The flag has been successfully deleted.");
      });
    });
  });
});
