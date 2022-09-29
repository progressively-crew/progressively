describe("/dashboard/projects/[id]/environments/[envId]/flags/[flagId]/scheduling", () => {
  before(cy.seed);
  after(cy.cleanupDb);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1/environments/1/flags/1/scheduling");
    });

    it("checks that the route is protected", () => {
      cy.checkProtectedRoute();
    });
  });

  describe("authenticated", () => {
    describe("user: Jane", () => {
      beforeEach(() => {
        cy.signIn("Jane");
        cy.visit("/dashboard/projects/1/environments/1/flags/1/scheduling", {
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
        cy.visit("/dashboard/projects/1/environments/1/flags/1/scheduling");
        cy.injectAxe();

        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Production | Flags | New homepage | Scheduling"
        );

        cy.verifyBreadcrumbs([
          ["Projects", "/dashboard"],
          ["Project from seeding", "/dashboard/projects/1"],
          ["Production", "/dashboard/projects/1/environments/1"],
          [
            "New homepage",
            "/dashboard/projects/1/environments/1/flags/1/scheduling",
            false,
          ],
        ]);

        cy.findByRole("link", { name: "Insights" })
          .should("be.visible")
          .and(
            "have.attr",
            "href",
            "/dashboard/projects/1/environments/1/flags/1/insights"
          );

        cy.findByRole("link", { name: "Scheduling" })
          .should("be.visible")
          .and(
            "have.attr",
            "href",
            "/dashboard/projects/1/environments/1/flags/1/scheduling"
          )
          .and("have.attr", "aria-current", "page");

        cy.findAllByText("New homepage").should("have.length", 2);
        cy.findByRole("heading", { name: "Scheduling" }).should("be.visible");

        cy.checkA11y();
      });

      it("shows the layout (without data)", () => {
        cy.visit("/dashboard/projects/1/environments/1/flags/2/scheduling");
        cy.injectAxe();

        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Production | Flags | New footer | Scheduling"
        );

        cy.findAllByText("New footer").should("have.length", 2);
        cy.findByRole("heading", { name: "Scheduling" }).should("be.visible");

        cy.findByText("No schedule found").should("be.visible");
        cy.findByText("There are no scheduling for this flag.").should(
          "be.visible"
        );

        cy.checkA11y();
      });
    });
  });
});
