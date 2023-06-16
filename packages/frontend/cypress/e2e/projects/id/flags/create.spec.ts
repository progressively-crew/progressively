describe("/dashboard/projects/[id]flags/create", () => {
  before(cy.seed);
  after(cy.cleanupDb);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1/flags/create");
    });

    it("checks that the route is protected", () => {
      cy.checkUnauthenticatedRoute();
    });
  });

  describe("authenticated", () => {
    describe("user: Jane", () => {
      beforeEach(() => {
        cy.signIn("Jane");
        cy.visit("/dashboard/projects/1/flags/create", {
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
        cy.visit("/dashboard/projects/1/flags/create");
        cy.injectAxe();
      });

      it("shows the layout", () => {
        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Flags | Create"
        );

        cy.findByRole("heading", { name: "Create a feature flag" }).should(
          "be.visible"
        );

        cy.findByLabelText("Flag name").should("be.visible");
        cy.findByLabelText("Flag description").should("be.visible");

        cy.findByRole("button", { name: "Create the feature flag" }).should(
          "be.visible"
        );

        cy.checkA11y();
      });

      it("shows an error when submitting an empty form", () => {
        cy.findByRole("button", { name: "Create the feature flag" }).click();

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

      it("creates a flag ", () => {
        cy.findByLabelText("Flag name").type("My new flag");
        cy.findByLabelText("Flag description").type("My new flag description");
        cy.findByRole("button", { name: "Create the feature flag" }).click();

        cy.get(".success-box")
          .should("have.focus")
          .and("contain.text", "The flag has been successfully created.");

        cy.findByText("My new flag").should("be.visible");
        cy.findByText("My new flag description").should("be.visible");

        cy.url().should("include", "/dashboard/projects/1/flags?newFlagId");

        cy.checkA11y();
      });

      it("shows an error when trying to create a flag  with the same key", () => {
        // Initial flag creation
        cy.findByLabelText("Flag name").type("My new flag");
        cy.findByLabelText("Flag description").type("My new flag description");
        cy.findByRole("button", { name: "Create the feature flag" }).click();

        // New flag creation
        cy.visit("/dashboard/projects/1/flags/create");
        cy.findByLabelText("Flag name").type("My new flag");
        cy.findByLabelText("Flag description").type("My new flag description");
        cy.findByRole("button", { name: "Create the feature flag" }).click();

        cy.get(".error-box")
          .should("have.focus")
          .and("contain.text", "The flag name is already used.");
      });
    });
  });
});
