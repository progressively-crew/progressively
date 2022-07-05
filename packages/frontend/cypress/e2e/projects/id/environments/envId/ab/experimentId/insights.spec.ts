describe("/dashboard/projects/[id]/environments/[envId]/ab/[experimentId]/insights", () => {
  before(cy.seed);
  after(cy.cleanup);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1/environments/1/ab/1/insights");
    });

    it("checks that the route is protected", () => {
      cy.checkProtectedRoute();
    });
  });

  describe("authenticated", () => {
    describe("user: Jane", () => {
      beforeEach(() => {
        cy.signIn("Jane");
        cy.visit("/dashboard/projects/1/environments/1/ab/1/insights", {
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

      it.skip("shows the layout (with data)", () => {
        cy.visit("/dashboard/projects/1/environments/1/ab/1/insights");
        cy.injectAxe();

        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Production | New footer experiment | Insights"
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
        cy.findByText("Number of hits per date").should("be.visible");

        cy.checkA11y();
      });

      it("shows the layout (without data)", () => {
        cy.visit("/dashboard/projects/1/environments/1/ab/3/insights");
        cy.injectAxe();

        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Production | New footer experiment | Insights"
        );

        cy.findByRole("link", { name: "Projects" })
          .should("be.visible")
          .and("have.attr", "href", "/dashboard");

        cy.findByRole("link", { name: "Project from seeding" })
          .should("be.visible")
          .and("have.attr", "href", "/dashboard/projects/1");

        cy.findByRole("link", { name: "Production" })
          .should("be.visible")
          .and("have.attr", "href", "/dashboard/projects/1/environments/1/ab");

        cy.findByRole("link", { name: "Insights" })
          .should("be.visible")
          .and(
            "have.attr",
            "href",
            "/dashboard/projects/1/environments/1/ab/3/insights"
          )
          .and("have.attr", "aria-current", "page");

        cy.findByRole("heading", { name: "New footer experiment" }).should(
          "be.visible"
        );
        cy.findByRole("heading", { name: "Insights" }).should("be.visible");

        cy.findByText("No hits found").should("be.visible");
        cy.findByText(
          "There are no hits for the experiment variants. Make sure to activate the experiment in order to collect variant hits."
        ).should("be.visible");

        cy.checkA11y();
      });
    });
  });
});
