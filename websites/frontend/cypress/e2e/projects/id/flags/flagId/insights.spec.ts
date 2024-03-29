describe("/dashboard/projects/[id]/flags/[flagId]/insights", () => {
  before(cy.seed);
  after(cy.cleanupDb);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1/flags/1/insights");
    });

    it("checks that the route is protected", () => {
      cy.checkUnauthenticatedRoute();
    });
  });

  describe("authenticated", () => {
    describe("user: Jane", () => {
      beforeEach(() => {
        cy.signIn("Jane");
        cy.visit("/dashboard/projects/1/flags/1/insights", {
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
        cy.visit("/dashboard/projects/1/flags/1/insights");
        cy.injectAxe();

        cy.title().should(
          "eq",
          "Progressively | Project from seeding | New homepage | Insights"
        );

        cy.findByRole("link", { name: "Insights" })
          .should("be.visible")
          .and("have.attr", "href", "/dashboard/projects/1/flags/1/insights")
          .and("have.attr", "aria-current", "page");

        cy.findAllByText("New homepage").should("have.length", 2);
        cy.findByRole("heading", { name: "Insights" }).should("be.visible");
      });

      it("shows the layout (without data)", () => {
        cy.visit("/dashboard/projects/1/flags/2/insights");
        cy.injectAxe();

        cy.title().should(
          "eq",
          "Progressively | Project from seeding | New footer | Insights"
        );

        cy.findByRole("link", { name: "Insights" })
          .should("be.visible")
          .and("have.attr", "href", "/dashboard/projects/1/flags/2/insights")
          .and("have.attr", "aria-current", "page");

        cy.findAllByText("New footer").should("have.length", 2);
        cy.findByRole("heading", { name: "Insights" }).should("be.visible");
      });
    });
  });
});
