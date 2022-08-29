describe("/dashboard/projects/[id]/environments/[envId]/flags/[flagId]/scheduling/create", () => {
  before(cy.seed);
  after(cy.cleanup);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit(
        "/dashboard/projects/1/environments/1/flags/1/scheduling/create"
      );
    });

    it("checks that the route is protected", () => {
      cy.checkProtectedRoute();
    });
  });

  describe("authenticated", () => {
    describe("user: Jane", () => {
      beforeEach(() => {
        cy.signIn("Jane");
        cy.visit(
          "/dashboard/projects/1/environments/1/flags/1/scheduling/create",
          {
            failOnStatusCode: false,
          }
        );
      });

      it("shouldnt show anything when Jane tries to visit Marvin s project", () => {
        cy.checkProtectedRoute();
      });
    });

    describe("user: Marvin", () => {
      beforeEach(() => {
        cy.signIn("Marvin");
        cy.visit(
          "/dashboard/projects/1/environments/1/flags/1/scheduling/create"
        );

        cy.injectAxe();
      });

      it("shows the layout", () => {
        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Production | Flags | New homepage | Scheduling | Create"
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
            "/dashboard/projects/1/environments/1/flags/1/scheduling"
          );

        cy.findByRole("link", { name: "Create a scheduling" })
          .should("be.visible")
          .and(
            "have.attr",
            "href",
            "/dashboard/projects/1/environments/1/flags/1/scheduling/create"
          )
          .and("have.attr", "aria-current", "page");

        cy.findByRole("heading", { name: "Create a scheduling" }).should(
          "be.visible"
        );

        cy.contains(
          "You're about to create a scheduling to New homepage in Project from seeding on Production."
        ).should("be.visible");

        // cy.checkA11y(); axe is yelling because of a missing label while the field is in a fieldset with legend
      });

      it("shows the form layout", () => {
        cy.findByText("When should the flag change status").should(
          "be.visible"
        );

        cy.findByText("What should be the next status").should("be.visible");
        cy.findByLabelText("What should be the next rollout percentage").should(
          "be.visible"
        );

        cy.findByRole("button", { name: "Save the schedule" }).should(
          "be.visible"
        );

        // cy.checkA11y(); axe is yelling because of a missing label while the field is in a fieldset with legend
      });

      it("adds a schedule", () => {
        cy.findByRole("button", { name: "Save the schedule" }).click();

        cy.url().should(
          "include",
          "/dashboard/projects/1/environments/1/flags/1/scheduling?newSchedule=true"
        );

        cy.get(".success-box")
          .should("have.focus")
          .and("contain.text", "The schedule has been successfully added.");

        cy.checkA11y();
      });
    });
  });
});
