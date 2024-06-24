describe("/dashboard/projects/[id]/segments", () => {
  beforeEach(cy.seed);
  afterEach(cy.cleanupDb);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1/segments");
    });

    it("checks that the route is protected", () => {
      cy.checkUnauthenticatedRoute();
    });
  });

  describe("authenticated", () => {
    describe("user: Jane", () => {
      beforeEach(() => {
        cy.signIn("Jane");
        cy.visit("/dashboard/projects/1/segments", {
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
        cy.visit("/dashboard/projects/1/segments");
      });

      it("shows the layout", () => {
        cy.injectAxe();

        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Segments"
        );

        cy.findAllByText("Project from seeding").should("have.length", 2);
        cy.findByRole("heading", { name: "Segments" }).should("be.visible");

        cy.checkA11y();
      });

      it("creates a new rule", () => {
        cy.injectAxe();

        cy.findAllByLabelText("Segment name").should("have.length", 1);
        cy.findByRole("button", { name: "Add a segment" }).click();
        cy.findAllByLabelText("Segment name").should("have.length", 2);

        cy.checkA11y();
      });

      it("deletes a rule", () => {
        cy.injectAxe();

        cy.findAllByLabelText("Segment name").should("have.length", 1);
        cy.findByRole("button", { name: "Delete segment" }).click();
        cy.findAllByLabelText("Segment name").should("have.length", 0);

        cy.checkA11y();
      });

      it("updates a rule", () => {
        cy.wait(100);
        cy.findByLabelText("Segment name")
          .should("be.visible")
          .clear()
          .type("Hello world");

        cy.findByRole("button", { name: "Save segments" }).click();

        cy.reload();

        cy.findByLabelText("Segment name").should(
          "not.contain",
          "Gmail and french"
        );
        cy.findByLabelText("Segment name").should(
          "contain.value",
          "Hello world"
        );
      });
    });
  });
});
