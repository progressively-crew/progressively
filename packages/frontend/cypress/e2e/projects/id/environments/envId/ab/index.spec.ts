describe("/dashboard/projects/[id]/environments/[envId]/ab", () => {
  before(cy.seed);
  after(cy.cleanup);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1/environments/1/ab");
    });

    it("checks that the route is protected", () => {
      cy.checkProtectedRoute();
    });
  });

  describe("authenticated", () => {
    describe("user: Jane", () => {
      beforeEach(() => {
        cy.signIn("Jane");
        cy.visit("/dashboard/projects/1/environments/1/ab", {
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
        cy.visit("/dashboard/projects/1/environments/2/ab");
        cy.injectAxe();
      });

      it("should show the empty state when there are no flags", () => {
        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Developer | A/B experiments"
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
        cy.findByRole("heading", { name: "No A/B experiments found" }).should(
          "be.visible"
        );

        cy.findByText(
          "There are no A/B experiments yet on this environment."
        ).should("be.visible");

        cy.findByRole("link", { name: "Create an A/B experiment" })
          .should("be.visible")
          .and(
            "have.attr",
            "href",
            "/dashboard/projects/1/environments/2/ab/create"
          );
      });
    });

    describe("user: Marvin", () => {
      beforeEach(() => {
        cy.signIn("Marvin");
        cy.visit("/dashboard/projects/1/environments/1/ab");
        cy.injectAxe();
      });

      it("shows the layout", () => {
        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Production | A/B experiments"
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
        cy.findByRole("heading", { name: "A/B experiments" }).should("exist");
        cy.findByText("New homepage experiment").should("be.visible");

        cy.findByText("Create an experiment").should("be.visible");

        cy.findByText("Switch the new homepage design (experiment)").should(
          "be.visible"
        );

        cy.checkA11y();
      });
    });
  });
});
