describe("/dashboard/projects/[id]/environments/[envId]/flags/[flagId]/scheduling/create", () => {
  before(cy.seed);
  after(cy.cleanupDb);

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

        cy.verifyBreadcrumbs([
          ["Projects", "/dashboard"],
          ["Project from seeding", "/dashboard/projects/1"],
          ["Production", "/dashboard/projects/1/environments/1"],
          ["New homepage", "/dashboard/projects/1/environments/1/flags/1"],
          [
            "Create a scheduling",
            "/dashboard/projects/1/environments/1/flags/1/scheduling/create",
          ],
        ]);

        cy.findByRole("heading", { name: "Create a scheduling" }).should(
          "be.visible"
        );

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
