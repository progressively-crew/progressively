describe("/dashboard/projects/[id]/environments/[envId]/ab/1/delete", () => {
  before(cy.seed);
  after(cy.cleanup);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1/environments/1/ab/1/delete");
    });

    it("checks that the route is protected", () => {
      cy.checkProtectedRoute();
    });
  });

  describe("authenticated", () => {
    describe("user: Jane", () => {
      beforeEach(() => {
        cy.signIn("Jane");
        cy.visit("/dashboard/projects/1/environments/1/ab/1/delete", {
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
        cy.visit("/dashboard/projects/1/environments/1/ab/1/delete");
        cy.injectAxe();
      });

      it("does not show actions only allowed by the admin (john is a regular user)", () => {
        cy.findByRole("heading", {
          name: "You are not allowed to delete environments.",
        }).should("be.visible");

        cy.findByText(
          "If you think this is an error, make sure to contact one of the project administrators:"
        ).should("be.visible");

        cy.findByRole("button", {
          name: "Copy marvin.frachet@something.com",
        }).should("be.visible");

        cy.checkA11y();
      });
    });

    describe("user: Marvin", () => {
      beforeEach(() => {
        cy.signIn("Marvin");
        cy.visit("/dashboard/projects/1/environments/1/ab/1/delete");
        cy.injectAxe();
      });

      it("shows the layout of the page", () => {
        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Production | New homepage experiment | Settings | Delete"
        );

        cy.findByRole("heading", {
          name: "Deleting an experiment",
        }).should("be.visible");
        cy.contains(
          "We really want to warn you: if you validate the experiment suppression, you won't be able to access the New homepage experiment experiment anymore. It includes:"
        ).should("be.visible");

        cy.findByText(
          "All your experiments variants will be turned off and removed"
        ).should("be.visible");

        cy.findByText(
          "All the stats related to the experiment will be removed"
        ).should("be.visible");

        cy.findByRole("button", {
          name: "Yes, delete the experiment",
        }).should("be.visible");

        cy.findByRole("link", {
          name: "No, don't delete New homepage experiment",
        })
          .should("be.visible")
          .and(
            "have.attr",
            "href",
            "/dashboard/projects/1/environments/1/ab/1/variants"
          );

        cy.checkA11y();
      });
    });

    describe("removing envs (needs reseeding after each test)", () => {
      beforeEach(cy.seed);
      afterEach(cy.cleanup);

      beforeEach(() => {
        cy.signIn("Marvin");
        cy.visit("/dashboard/projects/1/environments/1/ab/1/delete");
      });

      it("removes the environment and get me back to the flags page", () => {
        cy.findByRole("button", {
          name: "Yes, delete the experiment",
        }).click();

        cy.url().should(
          "contain",
          "/dashboard/projects/1/environments/1/ab?experimentRemoved=true"
        );

        cy.findByText("New footer experiment").should("be.visible");
        cy.findByText("New homepage experiment").should("not.exist");
        cy.get(".success-box")
          .should("have.focus")
          .and(
            "contain.text",
            "The A/B experiment has been successfully deleted."
          );
      });
    });
  });
});
