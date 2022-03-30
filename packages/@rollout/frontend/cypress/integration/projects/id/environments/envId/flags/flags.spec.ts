describe("/dashboard/projects/[id]/environments/[envId]/flags", () => {
  before(cy.seed);
  after(cy.cleanup);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1/environments/1/flags");
    });

    it("checks that the route is protected", () => {
      cy.checkProtectedRoute();
    });
  });

  describe("authenticated", () => {
    describe("user: Jane", () => {
      beforeEach(() => {
        cy.signIn("Jane");
        cy.visit("/dashboard/projects/1/environments/1/flags", {
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
        cy.visit("/dashboard/projects/1/environments/2/flags");
        cy.injectAxe();
      });

      it("should show the empty state when there are no flags", () => {
        cy.title().should(
          "eq",
          "Rollout | Project from seeding | Developer | Flags"
        );

        cy.findByRole("link", { name: "Projects" })
          .should("be.visible")
          .and("have.attr", "href", "/dashboard");

        cy.findByRole("link", { name: "Project from seeding" })
          .should("be.visible")
          .and("have.attr", "href", "/dashboard/projects/1");

        cy.findByRole("link", { name: "Developer" })
          .should("be.visible")
          .and(
            "have.attr",
            "href",
            "/dashboard/projects/1/environments/2/flags"
          )
          .and("have.attr", "aria-current", "page");

        cy.findByRole("heading", { name: "Developer" }).should("be.visible");
        cy.findByRole("heading", { name: "No flags found" }).should(
          "be.visible"
        );

        cy.findByText("There are no flags yet on this environment.").should(
          "be.visible"
        );

        cy.findByRole("link", { name: "Create a feature flag" })
          .should("be.visible")
          .and(
            "have.attr",
            "href",
            "/dashboard/projects/1/environments/2/flags/create"
          );
      });
    });

    describe("user: Marvin", () => {
      beforeEach(() => {
        cy.signIn("Marvin");
        cy.visit("/dashboard/projects/1/environments/1/flags");
        cy.injectAxe();
      });

      it("shows the layout", () => {
        cy.title().should(
          "eq",
          "Rollout | Project from seeding | Production | Flags"
        );

        cy.findByRole("link", { name: "Projects" })
          .should("be.visible")
          .and("have.attr", "href", "/dashboard");

        cy.findByRole("link", { name: "Project from seeding" })
          .should("be.visible")
          .and("have.attr", "href", "/dashboard/projects/1");

        cy.findByRole("link", { name: "Production" })
          .should("be.visible")
          .and(
            "have.attr",
            "href",
            "/dashboard/projects/1/environments/1/flags"
          )
          .and("have.attr", "aria-current", "page");

        cy.findByRole("heading", { name: "Production" }).should("be.visible");
        cy.findByRole("heading", { name: "Feature flags" }).should(
          "be.visible"
        );

        cy.findByRole("link", { name: "Feature flags" }).should("be.visible");
        cy.findByRole("link", { name: "Create a feature flag" })
          .should("be.visible")
          .and(
            "have.attr",
            "href",
            "/dashboard/projects/1/environments/1/flags/create"
          );

        /* verify the flag list */
        cy.findByRole("heading", { name: "New homepage feature flag" }).should(
          "be.visible"
        );
        cy.findByText("newHomepage").should("be.visible");
        cy.findByText("Switch the new homepage design").should("be.visible");
        cy.findByRole("switch")
          .should("be.visible")
          .and("have.attr", "aria-checked", "false");

        cy.checkA11y();
      });

      it("activates the flag when pressing the switch button", () => {
        cy.findByRole("switch").click();

        cy.findByRole("switch")
          .should("be.visible")
          .and("have.attr", "aria-checked", "false");

        cy.checkA11y();
      });
    });
  });
});
