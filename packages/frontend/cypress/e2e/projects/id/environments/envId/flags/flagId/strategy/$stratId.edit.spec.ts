describe("/dashboard/projects/[id]/environments/[envId]/flags/[flagId]/strategies/[stratId]/1/edit", () => {
  before(cy.seed);
  after(cy.cleanupDb);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit(
        "/dashboard/projects/1/environments/1/flags/1/strategies/1/edit"
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
          "/dashboard/projects/1/environments/1/flags/1/strategies/1/edit",
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
          "/dashboard/projects/1/environments/1/flags/1/strategies/1/edit"
        );

        cy.injectAxe();
      });

      it("shows the layout", () => {
        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Production | Flags | New homepage | Super strategy | Edit"
        );

        cy.verifyBreadcrumbs([
          ["Projects", "/dashboard"],
          ["Project from seeding", "/dashboard/projects/1"],
          ["Production", "/dashboard/projects/1/environments/1"],
          ["New homepage", "/dashboard/projects/1/environments/1/flags/1"],
          [
            "Edit Super strategy",
            "/dashboard/projects/1/environments/1/flags/1/strategies/1/edit",
          ],
        ]);

        cy.findByRole("heading", { name: "Edit Super strategy" }).should(
          "be.visible"
        );

        cy.checkA11y();
      });

      it("shows the form layout", () => {
        cy.findByLabelText("Group name").should("be.visible");

        cy.findByRole("button", {
          name: "Save the additional audience",
        }).should("be.visible");

        cy.checkA11y();
      });

      it("shows a list of errors when the field are not filled", () => {
        cy.findByLabelText("Group name").clear();
        cy.findByLabelText("Field name").clear();
        cy.findByLabelText(
          "Values matching the previous field (one per line)"
        ).clear();
        cy.findByRole("button", {
          name: "Save the additional audience",
        }).click();

        cy.get(".error-box")
          .should("have.focus")
          .and("contain.text", "The following 3 errors have been found:")
          .and("contain.text", "The strategy name is required.")
          .and("contain.text", "The field name is required.")
          .and("contain.text", "The field values are required.");

        cy.checkA11y();
      });

      it("updates a strategy", () => {
        cy.findByLabelText("Group name").type("New strategy");
        cy.findByRole("button", {
          name: "Save the additional audience",
        }).click();

        cy.url().should(
          "include",
          "/dashboard/projects/1/environments/1/flags/1?strategyUpdated=true"
        );

        cy.get(".success-box")
          .should("have.focus")
          .and("contain.text", "The additional audience has been updated.");

        cy.findAllByText("Super strategyNew strategy").should("be.visible");

        cy.checkA11y();
      });
    });
  });
});
