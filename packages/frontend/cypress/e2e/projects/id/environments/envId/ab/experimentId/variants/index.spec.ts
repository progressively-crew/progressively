describe("/dashboard/projects/[id]/environments/[envId]/ab/[experimentId]/variants", () => {
  before(cy.seed);
  after(cy.cleanup);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1/environments/1/ab/1/variants");
    });

    it("checks that the route is protected", () => {
      cy.checkProtectedRoute();
    });
  });

  describe("authenticated", () => {
    describe("user: Jane", () => {
      beforeEach(() => {
        cy.signIn("Jane");
        cy.visit("/dashboard/projects/1/environments/1/ab/1/variants", {
          failOnStatusCode: false,
        });
      });

      it("shouldnt show anything when Jane tries to visit Marvin s project", () => {
        cy.checkProtectedRoute();
      });
    });

    describe("user: Marvin", () => {
      describe("empty state", () => {
        beforeEach(() => {
          cy.signIn("Marvin");
          cy.visit("/dashboard/projects/1/environments/1/ab/3/variants");
          cy.injectAxe();
        });

        it("shows a page layout (empty state)", () => {
          cy.title().should(
            "eq",
            "Progressively | Project from seeding | Production | New footer experiment | Variants"
          );

          cy.findByRole("heading", { name: "Variants" }).should("exist");

          cy.findByRole("heading", { name: "No variants found" }).should(
            "exist"
          );

          cy.findByText("There are no variants found to this flag yet.").should(
            "be.visible"
          );

          cy.findByRole("link", { name: "Add a variant" }).should("be.visible");

          cy.checkA11y();
        });
      });
    });

    describe("with data", () => {
      beforeEach(() => {
        cy.signIn("Marvin");
        cy.visit("/dashboard/projects/1/environments/1/ab/1/variants");
        cy.injectAxe();
      });

      it("shows a page layout", () => {
        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Production | New homepage experiment | Variants"
        );

        cy.findByRole("heading", { name: "Variants" }).should("exist");
        cy.findByRole("link", { name: "Add a variant" }).should("be.visible");

        cy.findByText("Control variant for home").should("be.visible");
        cy.findByText("Controls the homepage variant").should("be.visible");

        cy.findAllByText("Alternative homepage").should("have.length", 2);

        cy.checkA11y();
      });
    });
  });
});
