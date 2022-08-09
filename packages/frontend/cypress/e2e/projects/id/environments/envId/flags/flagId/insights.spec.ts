describe("/dashboard/projects/[id]/environments/[envId]/flags/[flagId]/insights", () => {
  before(cy.seed);
  after(cy.cleanup);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1/environments/1/flags/1/insights");
    });

    it("checks that the route is protected", () => {
      cy.checkProtectedRoute();
    });
  });

  describe("authenticated", () => {
    describe("user: Jane", () => {
      beforeEach(() => {
        cy.signIn("Jane");
        cy.visit("/dashboard/projects/1/environments/1/flags/1/insights", {
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
      });

      it("shows the layout (with data)", () => {
        cy.visit("/dashboard/projects/1/environments/1/flags/1/insights");
        cy.injectAxe();

        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Production | New homepage | Insights"
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
          );

        cy.findByRole("link", { name: "New homepage" })
          .should("be.visible")
          .and(
            "have.attr",
            "href",
            "/dashboard/projects/1/environments/1/flags/1"
          );

        cy.findByRole("link", { name: "Insights" })
          .should("be.visible")
          .and(
            "have.attr",
            "href",
            "/dashboard/projects/1/environments/1/flags/1/insights"
          )
          .and("have.attr", "aria-current", "page");

        cy.findByRole("heading", { name: "New homepage" }).should("be.visible");
        cy.findByRole("heading", { name: "Insights" }).should("be.visible");

        cy.checkA11y();
      });

      it("shows the layout (without data)", () => {
        cy.visit("/dashboard/projects/1/environments/1/flags/2/insights");
        cy.injectAxe();

        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Production | New footer | Insights"
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
          );

        cy.findByRole("link", { name: "Insights" })
          .should("be.visible")
          .and(
            "have.attr",
            "href",
            "/dashboard/projects/1/environments/1/flags/2/insights"
          )
          .and("have.attr", "aria-current", "page");

        cy.findByRole("heading", { name: "New footer" }).should("be.visible");
        cy.findByRole("heading", { name: "Insights" }).should("be.visible");

        cy.findByText("No hits found").should("be.visible");
        cy.findByText(
          "There are no hits for this flag. Make sure to activate the flag in order to collect hits."
        ).should("be.visible");

        cy.checkA11y();
      });
    });
  });
});
