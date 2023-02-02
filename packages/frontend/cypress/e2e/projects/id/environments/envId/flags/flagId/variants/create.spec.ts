describe("/dashboard/projects/[id]/environments/[envId]/flags/[flagId]/variants/create", () => {
  before(cy.seed);
  after(cy.cleanupDb);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1/environments/1/flags/1/variants/create");
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
          "/dashboard/projects/1/environments/1/flags/1/variants/create",
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
          "/dashboard/projects/1/environments/1/flags/1/variants/create"
        );

        cy.injectAxe();
      });

      it("shows the layout", () => {
        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Production | Flags | New homepage | Variants | Create"
        );

        cy.findByRole("heading", { name: "Create a variant" }).should(
          "be.visible"
        );

        cy.checkA11y();
      });

      it("adds a variant", () => {
        cy.findByLabelText("Variant name").type("New variant");
        cy.findByRole("button", { name: "Create the variant" }).click();

        cy.url().should(
          "include",
          "/dashboard/projects/1/environments/1/flags/1?newVariant=true"
        );

        cy.get(".success-box")
          .should("have.focus")
          .and("contain.text", "The variant has been successfully created.");

        cy.checkA11y();
      });
    });
  });
});
