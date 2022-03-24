describe("/dashboard/projects/[id]/environments/[envId]/flags/[flagId]/delete", () => {
  before(cy.seed);
  after(cy.cleanup);

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
          "Rollout | Project from seeding | Production | New homepage | Delete"
        );

        cy.findByText("You are about to delete the feature flag.").should(
          "be.visible"
        );
        cy.contains(
          "We really want to warn you: if you validate the flag suppression, you won't be able to access the New homepage flag anymore. It includes:"
        ).should("be.visible");

        cy.findByText(
          "All your feature flags will be turned off and removed"
        ).should("be.visible");

        cy.findByText(
          "All the stats related to the flag will be removed"
        ).should("be.visible");

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
      afterEach(cy.cleanup);

      beforeEach(() => {
        cy.signIn("Marvin");
        cy.visit("/dashboard/projects/1/environments/1/flags/1/delete");
      });

      it("removes the environment and get me back to the flags page", () => {
        cy.findByRole("button", {
          name: "Yes, delete the flag",
        }).click();

        cy.url().should(
          "contain",
          "/dashboard/projects/1/environments/1/flags?flagRemoved=true"
        );

        cy.findByText("No flags found").should("be.visible");
        cy.get(".success-box").should("have.focus");
        cy.findByText("The flag has been successfully deleted.").should(
          "be.visible"
        );
      });
    });
  });
});
