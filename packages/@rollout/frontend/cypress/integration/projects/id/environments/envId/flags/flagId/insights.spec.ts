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
        cy.visit("/dashboard/projects/1/environments/1/flags/1/insights");
        cy.injectAxe();
      });

      it("shows the layout", () => {
        cy.title().should(
          "eq",
          "Rollout | Project from seeding | Production | New homepage | Insights"
        );

        cy.findByText("Projects")
          .should("be.visible")
          .and("have.attr", "href", "/dashboard");

        cy.findAllByText("Project from seeding")
          .first()
          .should("be.visible")
          .and("have.attr", "href", "/dashboard/projects/1");

        cy.findAllByText("Production")
          .first()
          .should("be.visible")
          .and(
            "have.attr",
            "href",
            "/dashboard/projects/1/environments/1/flags"
          );

        cy.findAllByText("New homepage")
          .first()
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

        cy.get("h1").should("contain", "New homepage");

        cy.findByRole("heading", { name: "Insights" }).should("be.visible");
        cy.findByText("Number of hits per date").should("be.visible");

        cy.checkA11y();
      });
    });
  });
});
