describe("/dashboard/projects/[id]/flags/[flagId]/edit", () => {
  before(cy.seed);
  after(cy.cleanupDb);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1/flags/1/edit");
    });

    it("checks that the route is protected", () => {
      cy.checkUnauthenticatedRoute();
    });
  });

  describe("authenticated", () => {
    describe("user: Jane", () => {
      beforeEach(() => {
        cy.signIn("Jane");
        cy.visit("/dashboard/projects/1/flags/1/edit", {
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
        cy.visit("/dashboard/projects/1/flags/1/edit");
        cy.injectAxe();
      });

      it("shows the layout", () => {
        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Flags | Edit"
        );

        cy.findByRole("heading", { name: "Edit a feature flag" }).should(
          "be.visible"
        );

        cy.findByLabelText("Flag name").should("be.visible").type("1");
        cy.findByLabelText("Flag description").should("be.visible");

        cy.findByRole("button", { name: "Edit the feature flag" }).should(
          "be.visible"
        );

        cy.checkA11y();
      });

      it("shows an error when submitting an empty form", () => {
        cy.findByLabelText("Flag name").clear();
        cy.findByLabelText("Flag description").clear();
        cy.findByRole("button", { name: "Edit the feature flag" }).click();

        cy.get(".error-box")
          .should("have.focus")
          .and(
            "contain.text",
            "The name field is required, make sure to have one."
          )
          .and(
            "contain.text",
            "The description field is required, make sure to have one."
          );

        cy.checkA11y();
      });

      it("edits a flag ", () => {
        cy.findByLabelText("Flag name").type(" 2");
        cy.findByLabelText("Flag description").type(" 2");
        cy.findByRole("button", { name: "Edit the feature flag" }).click();

        cy.get(".success-box")
          .should("have.focus")
          .and("contain.text", "The flag has been successfully edited.");

        cy.findByText("New homepage 2").should("be.visible");

        cy.url().should("include", "/dashboard/projects/1/flags?flagEdited");

        cy.checkA11y();
      });

      it("shows an error when trying to edit a flag  with the same key", () => {
        cy.findByRole("button", { name: "Edit the feature flag" }).click();

        cy.get(".error-box")
          .should("have.focus")
          .and("contain.text", "The flag name is already used.");
      });
    });
  });
});
