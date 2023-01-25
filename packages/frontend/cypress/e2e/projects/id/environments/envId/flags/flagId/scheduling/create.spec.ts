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
          cy.findByLabelText(
            "What should be the next rollout percentage"
          ).should("be.visible");

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

          cy.get(".success-box")
            .should("have.focus")
            .and("contain.text", "The schedule has been successfully added.");

          cy.checkA11y();
        });
      });

      describe("multi variants", () => {
        beforeEach(() => {
          cy.signIn("Marvin");
          cy.visit(
            "/dashboard/projects/1/environments/1/flags/4/scheduling/create"
          );
        });

        it("shows the form layout", () => {
          cy.findByText("When should the flag change status").should(
            "be.visible"
          );

          cy.findByText("What should be the next status").should("be.visible");
          cy.findByLabelText(
            "What should be the next rollout percentage for Control"
          ).should("be.visible");

          cy.findByLabelText(
            "What should be the next rollout percentage for Second"
          ).should("be.visible");

          cy.findByRole("button", { name: "Save the schedule" }).should(
            "be.visible"
          );
        });

        it("shows an error message when the sum of the percentage is over 100%", () => {
          cy.findByRole("button", { name: "Save the schedule" }).click();
          cy.findByText(
            "The sum of the variant percentage is 200% which exceeds 100%."
          ).should("be.visible");
        });

        it("shows an error message when the sum of the percentage is less than 100%", () => {
          cy.findByLabelText(
            "What should be the next rollout percentage for Control"
          )
            .invoke("val", 20)
            .trigger("change");

          cy.findByLabelText(
            "What should be the next rollout percentage for Second"
          )
            .invoke("val", 40)
            .trigger("change");

          cy.findByRole("button", { name: "Save the schedule" }).click();

          cy.findByText(
            "The sum of the variant percentage is 60% which is lower than 100%."
          ).should("be.visible");
        });

        it.only("shows and success message in the scheduling list page", () => {
          cy.get("#date-dateTime").type("2023-01-27");
          cy.get("#time-dateTime").type("03:15");

          cy.findByLabelText("What should be the next status").click();

          cy.findByLabelText(
            "What should be the next rollout percentage for Control"
          )
            .invoke("val", 30)
            .trigger("change");

          cy.findByLabelText(
            "What should be the next rollout percentage for Second"
          )
            .invoke("val", 70)
            .trigger("change");

          cy.findByRole("button", { name: "Save the schedule" }).click();

          cy.findByText("The schedule has been successfully added.").should(
            "be.visible"
          );

          cy.get(".scheduling-row")
            .first()
            .within(() => {
              cy.findByText("27/01/2023, 03:15:00").should("be.visible");
              cy.contains("Updating status to Activated").should("be.visible");
              cy.contains("Control to 30%").should("be.visible");
              cy.contains("Second to 70%").should("be.visible");
            });
        });
      });
    });
  });
});
