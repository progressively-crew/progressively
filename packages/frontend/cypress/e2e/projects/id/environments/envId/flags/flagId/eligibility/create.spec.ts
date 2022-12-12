describe("/dashboard/projects/[id]/environments/[envId]/flags/[flagId]/eligibilities/create", () => {
  before(cy.seed);
  after(cy.cleanupDb);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit(
        "/dashboard/projects/1/environments/1/flags/1/eligibilities/create"
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
          "/dashboard/projects/1/environments/1/flags/1/eligibilities/create",
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
          "/dashboard/projects/1/environments/1/flags/1/eligibilities/create"
        );

        cy.injectAxe();
      });

      it("shows the layout", () => {
        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Production | Flags | New homepage | Eligibility | Create"
        );

        cy.findByRole("heading", {
          name: "Create an eligibility restriction",
        }).should("be.visible");

        cy.checkA11y();
      });

      it("shows the form layout", () => {
        cy.findByRole("button", {
          name: "Save the restriction",
        }).should("be.visible");

        cy.checkA11y();
      });

      it("shows a list of errors when the field are not filled", () => {
        cy.findByRole("button", {
          name: "Save the restriction",
        }).click();

        cy.get(".error-box")
          .should("have.focus")
          .and("contain.text", "The following 2 errors have been found:")
          .and("contain.text", "The field name is required.")
          .and("contain.text", "The field values are required.");

        cy.checkA11y();
      });

      // TODO: improve E2E testing for strategies. The business covering is minimal atm
      it("adds a strategy", () => {
        cy.findByLabelText("Field name").type("email");
        cy.findByLabelText("Values matching the previous field").type("email");
        cy.findByRole("button", {
          name: "Save the restriction",
        }).click();

        cy.url().should(
          "include",
          "/dashboard/projects/1/environments/1/flags/1?newEligibility=true#eligibility-added"
        );

        cy.get(".success-box")
          .should("have.focus")
          .and(
            "contain.text",
            "The eligibility audience has been successfully set."
          );

        cy.checkA11y();
      });
    });
  });
});
