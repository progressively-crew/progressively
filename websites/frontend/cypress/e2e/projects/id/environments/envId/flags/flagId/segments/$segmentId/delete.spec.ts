describe("/dashboard/projects/[id]/environments/[envId]/flags/[flagId]/segments/[stratId]/delete", () => {
  before(cy.seed);
  after(cy.cleanupDb);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit(
        "/dashboard/projects/1/environments/1/flags/1/segments/1/delete"
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
          "/dashboard/projects/1/environments/1/flags/1/segments/1/delete",
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
          "/dashboard/projects/1/environments/1/flags/1/segments/1/delete"
        );
        cy.injectAxe();
      });

      it("shows the layout of the page", () => {
        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Production | New homepage | Segments | Delete"
        );

        cy.findByText("Deleting a segment").should("be.visible");

        cy.findByRole("button", {
          name: "Yes, delete the segment",
        }).should("be.visible");

        cy.findByRole("link", { name: "Cancel" })
          .should("be.visible")
          .and(
            "have.attr",
            "href",
            "/dashboard/projects/1/environments/1/flags/1/segments"
          );

        cy.checkA11y();
      });
    });

    describe("removing segments (needs reseeding after each test)", () => {
      beforeEach(cy.seed);
      afterEach(cy.cleanupDb);

      beforeEach(() => {
        cy.signIn("Marvin");
        cy.visit(
          "/dashboard/projects/1/environments/1/flags/1/segments/1/delete"
        );
      });

      it("removes the segment and get me back to the flags page", () => {
        cy.findByRole("button", {
          name: "Yes, delete the segment",
        }).click();

        cy.url().should(
          "contain",
          "/dashboard/projects/1/environments/1/flags/1/segments?segmentRemoved=true"
        );

        cy.get(".success-box")
          .should("have.focus")
          .and("contain.text", "The segment has been successfully removed.");
      });
    });
  });
});
