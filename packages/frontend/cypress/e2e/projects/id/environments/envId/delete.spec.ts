describe("/dashboard/projects/[id]/environments/[envId]/delete", () => {
  before(cy.seed);
  after(cy.cleanupDb);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1/environments/1/delete");
    });

    it("checks that the route is protected", () => {
      cy.checkUnauthenticatedRoute();
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
        cy.findByRole("heading", {
          name: "Woops! You're not authorized to see this content",
        }).should("be.visible");

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
      afterEach(cy.cleanupDb);

      beforeEach(() => {
        cy.signIn("Marvin");
        cy.visit("/dashboard/projects/1/environments/1/delete");
      });

      it("removes the environment and get me back to the flags page", () => {
        cy.findByRole("button", {
          name: "Yes, delete the environment",
        }).click();

        cy.url().should(
          "contain",
          "/dashboard/projects/1/flags?envRemoved=true"
        );

        cy.findByRole("link", { name: "Developer" }).should("be.visible");
        cy.findByRole("link", { name: "Production" }).should("not.exist");
        cy.get(".success-box")
          .should("have.focus")
          .and(
            "contain.text",
            "The environment has been successfully deleted."
          );
      });
    });
  });
});
