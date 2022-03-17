describe("/dashboard/projects/[id]/environments/[envId]/delete", () => {
  before(cy.seed);
  after(cy.cleanup);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1/environments/1/delete");
    });

    it("checks that the route is protected", () => {
      cy.checkProtectedRoute();
    });
  });

  describe("authenticated", () => {
    describe("user: Jane", () => {
      beforeEach(() => {
        cy.signIn("Jane");
        cy.visit("/dashboard/projects/1/environments/1/delete", {
          failOnStatusCode: false,
        });
      });

      it("shouldnt show anything when Jane tries to visit Marvin s project", () => {
        cy.checkProtectedRoute();
      });
    });

    describe("user: John", () => {
      beforeEach(() => {
        cy.signIn("John");
        cy.visit("/dashboard/projects/1/environments/1/delete");
        cy.injectAxe();
      });

      it("does not show actions only allowed by the admin (john is a regular user)", () => {
        cy.findByText("You are not allowed to delete environments.").should(
          "be.visible"
        );

        cy.findByText(
          "If you think this is an error, make sure to contact one of the project administrators:"
        ).should("be.visible");

        cy.findByText("Marvin Frachet").should("be.visible");

        cy.findByText("marvin.frachet@gmail.com").should("be.visible");

        cy.checkA11y();
      });
    });

    describe("user: Marvin", () => {
      beforeEach(() => {
        cy.signIn("Marvin");
        cy.visit("/dashboard/projects/1/environments/1/delete");
        cy.injectAxe();
      });

      it("shows the layout of the page", () => {
        cy.title().should(
          "eq",
          "Rollout | Project from seeding | Production | Settings | Delete"
        );

        cy.findByText("You are about to delete the environment.").should(
          "be.visible"
        );
        cy.contains(
          "We really want to warn you: if you validate the environment suppression, you won't be able to access the Production environment anymore. It includes:"
        ).should("be.visible");

        cy.findByText(
          "All your feature flags will be turned off and removed"
        ).should("be.visible");

        cy.findByText(
          "All the stats related to the environment will be removed"
        ).should("be.visible");

        cy.findByRole("button", {
          name: "Yes, delete the environment",
        }).should("be.visible");

        cy.contains("No, don't delete Production")
          .should("be.visible")
          .and(
            "have.attr",
            "href",
            "/dashboard/projects/1/environments/1/settings"
          );

        cy.checkA11y();
      });
    });

    describe("removing envs (needs reseeding after each test)", () => {
      beforeEach(cy.seed);
      afterEach(cy.cleanup);

      beforeEach(() => {
        cy.signIn("Marvin");
        cy.visit("/dashboard/projects/1/environments/1/delete");
      });

      it("removes the environment and get me back to the flags page", () => {
        cy.findByRole("button", {
          name: "Yes, delete the environment",
        }).click();

        cy.url().should("contain", "/dashboard/projects/1?envRemoved=true");

        cy.findByText("Developer").should("be.visible");
        cy.findByText("Production").should("not.exist");
        cy.get(".success-box").should("have.focus");
        cy.findByText("The environment has been successfully deleted.").should(
          "be.visible"
        );
      });
    });
  });
});
