describe("/dashboard/projects/[id]/environments/[envId]/flags/[flagId]/segments/create", () => {
  before(cy.seed);
  after(cy.cleanupDb);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1/environments/1/flags/1/segments/create");
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
          "/dashboard/projects/1/environments/1/flags/1/segments/create",
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
          "/dashboard/projects/1/environments/1/flags/1/segments/create"
        );

        cy.injectAxe();
      });

      it("shows the layout", () => {
        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Production | Flags | New homepage | Segments | Create"
        );

        cy.findByRole("heading", { name: "Create a segment" }).should(
          "be.visible"
        );

        cy.checkA11y();
      });

      it("adds a segment", () => {
        cy.findByLabelText("Segment name").type("New segment");
        cy.findByRole("button", { name: "Create the segment" }).click();

        cy.url().should(
          "include",
          "/dashboard/projects/1/environments/1/flags/1/segments?newSegment=true"
        );

        cy.get(".success-box").should(
          "contain.text",
          "The segment has been successfully added."
        );

        cy.checkA11y();
      });
    });
  });
});
