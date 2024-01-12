describe("/dashboard/projects/[id]/environments/[envId]/settings/delete", () => {
  before(cy.seed);
  after(cy.cleanupDb);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1/environments/1/settings/delete");
    });

    it("checks that the route is protected", () => {
      cy.checkUnauthenticatedRoute();
    });
  });

  describe("authenticated", () => {
    describe("user: Jane", () => {
      beforeEach(() => {
        cy.signIn("Jane");
        cy.visit("/dashboard/projects/1/environments/1/settings/delete", {
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
        cy.visit("/dashboard/projects/1/environments/1/settings/delete");
        cy.injectAxe();
      });

      it.only("does not show actions only allowed by the admin (john is a regular user)", () => {
        cy.findByRole("heading", {
          name: "Woops! You're not authorized to see this content",
        }).should("be.visible");

        cy.wait(100);
        cy.checkA11y();
      });
    });

    describe("user: Marvin", () => {
      beforeEach(() => {
        cy.signIn("Marvin");
        cy.visit("/dashboard/projects/1/environments/1/settings/delete");
        cy.injectAxe();
      });

      it("shows the layout of the page", () => {
        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Production | Settings | Delete"
        );

        cy.findByRole("heading", {
          name: "Are you sure you want to delete Production?",
        }).should("be.visible");

        cy.findByRole("button", {
          name: "Yes, delete the environment",
        }).should("be.visible");

        cy.findByRole("link", { name: "Cancel" })
          .should("be.visible")
          .and("have.attr", "href", "/dashboard/projects/1/environments/1");

        cy.checkA11y();
      });
    });

    describe("removing envs (needs reseeding after each test)", () => {
      beforeEach(cy.seed);
      afterEach(cy.cleanupDb);

      beforeEach(() => {
        cy.signIn("Marvin");
        cy.visit("/dashboard/projects/1/environments/1/settings/delete");
      });

      it("removes the environment and get me back to the flags page z", () => {
        cy.findByRole("button", {
          name: "Yes, delete the environment",
        }).click();

        cy.url().should(
          "contain",
          "/dashboard/projects/1/flags?envRemoved=true"
        );

        cy.get(".success-box").and(
          "contain.text",
          "The environment has been successfully deleted."
        );
      });
    });
  });
});
