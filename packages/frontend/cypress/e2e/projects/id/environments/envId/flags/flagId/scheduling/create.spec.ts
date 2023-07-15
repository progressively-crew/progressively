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
      cy.checkUnauthenticatedRoute();
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
      describe("no variants", () => {
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

          cy.findByRole("heading", { name: "Create a scheduling" }).should(
            "be.visible"
          );
        });

        it("shows the form layout", () => {
          cy.findByText("When should the flag change status").should(
            "be.visible"
          );

          cy.findByText("What should be the next status").should("be.visible");

          cy.findByRole("button", { name: "Save the schedule" }).should(
            "be.visible"
          );
        });

        it("adds a schedule", () => {
          cy.findByRole("button", { name: "Save the schedule" }).click();

          cy.url().should(
            "include",
            "/dashboard/projects/1/environments/1/flags/1/scheduling?newSchedule=true"
          );

          cy.get(".success-box").should(
            "contain.text",
            "The schedule has been successfully added."
          );

          cy.checkA11y();
        });
      });
    });
  });
});
