describe("/dashboard/projects/[id]/environments/[envId]/flags/[flagId]/variants/[variantId]/delete", () => {
  before(cy.seed);
  after(cy.cleanupDb);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit(
        "/dashboard/projects/1/environments/1/flags/1/variants/1/delete"
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
          "/dashboard/projects/1/environments/1/flags/1/variants/1/delete",
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
          "/dashboard/projects/1/environments/1/flags/1/variants/1/delete"
        );
        cy.injectAxe();
      });

      it("shows the layout of the page", () => {
        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Production | New homepage | Variants | Delete"
        );

        cy.findByText("Deleting a variant").should("be.visible");

        cy.findByRole("button", {
          name: "Yes, delete the variant",
        }).should("be.visible");

        cy.findByRole("link", { name: "Cancel" })
          .should("be.visible")
          .and(
            "have.attr",
            "href",
            "/dashboard/projects/1/environments/1/flags/1/variants"
          );

        cy.checkA11y();
      });
    });

    describe("removing variant (needs reseeding after each test)", () => {
      beforeEach(cy.seed);
      afterEach(cy.cleanupDb);

      beforeEach(() => {
        cy.signIn("Marvin");
        cy.visit(
          "/dashboard/projects/1/environments/1/flags/1/variants/1/delete"
        );
      });

      it("removes the variant and get me back to the flags page", () => {
        cy.findByRole("button", {
          name: "Yes, delete the variant",
        }).click();

        cy.url().should(
          "contain",
          "/dashboard/projects/1/environments/1/flags/1/variants/?variantRemoved=true#variant-removed"
        );

        cy.get(".success-box")
          .should("have.focus")
          .and("contain.text", "The variant has been successfully removed.");
      });
    });
  });
});
