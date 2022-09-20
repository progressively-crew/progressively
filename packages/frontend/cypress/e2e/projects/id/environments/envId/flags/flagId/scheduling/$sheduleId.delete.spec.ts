describe("/dashboard/projects/[id]/environments/[envId]/flags/[flagId]/scheduling/[stratId]/delete", () => {
  before(cy.seed);
  after(cy.cleanupDb);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit(
        "/dashboard/projects/1/environments/1/flags/1/scheduling/1/delete"
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
          "/dashboard/projects/1/environments/1/flags/1/scheduling/1/delete",
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
          "/dashboard/projects/1/environments/1/flags/1/scheduling/1/delete"
        );
        cy.injectAxe();
      });

      it("shows the layout of the page", () => {
        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Production | New homepage | Scheduling | Delete"
        );

        cy.findByText("Deleting a schedule").should("be.visible");

        cy.findByRole("button", {
          name: "Yes, delete the schedule",
        }).should("be.visible");

        cy.findByRole("link", { name: "No, don't delete" })
          .should("be.visible")
          .and(
            "have.attr",
            "href",
            "/dashboard/projects/1/environments/1/flags/1/scheduling"
          );

        cy.checkA11y();
      });
    });

    describe("removing scheduling (needs reseeding after each test)", () => {
      beforeEach(cy.seed);
      afterEach(cy.cleanupDb);

      beforeEach(() => {
        cy.signIn("Marvin");
        cy.visit(
          "/dashboard/projects/1/environments/1/flags/1/scheduling/1/delete"
        );
      });

      it("removes the schedule and get me back to the flags page", () => {
        cy.findByRole("button", {
          name: "Yes, delete the schedule",
        }).click();

        cy.url().should(
          "contain",
          "/dashboard/projects/1/environments/1/flags/1/scheduling?scheduleRemoved=true"
        );

        cy.findByRole("heading", { name: "No schedule found" }).should(
          "be.visible"
        );

        cy.get(".success-box")
          .should("have.focus")
          .and("contain.text", "The schedule has been successfully removed.");
      });
    });
  });
});
