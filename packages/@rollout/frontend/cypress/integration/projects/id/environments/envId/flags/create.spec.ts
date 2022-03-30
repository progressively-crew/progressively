describe("/dashboard/projects/[id]/environments/[envId]/flags/create", () => {
  before(cy.seed);
  after(cy.cleanup);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1/environments/1/flags/create");
    });

    it("checks that the route is protected", () => {
      cy.checkProtectedRoute();
    });
  });

  describe("authenticated", () => {
    describe("user: Jane", () => {
      beforeEach(() => {
        cy.signIn("Jane");
        cy.visit("/dashboard/projects/1/environments/1/flags/create", {
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
        cy.visit("/dashboard/projects/1/environments/1/flags/create");
        cy.injectAxe();
      });

      it("shows the layout", () => {
        cy.title().should(
          "eq",
          "Rollout | Project from seeding | Production | Flags | Create"
        );

        cy.findByRole("link", { name: "Projects" })
          .should("be.visible")
          .and("have.attr", "href", "/dashboard");

        cy.findByRole("link", { name: "Project from seeding" })
          .should("be.visible")
          .and("have.attr", "href", "/dashboard/projects/1");

        cy.findByRole("link", { name: "Production" })
          .should("be.visible")
          .and(
            "have.attr",
            "href",
            "/dashboard/projects/1/environments/1/flags"
          );

        cy.findByRole("link", { name: "Create a feature flag" })
          .should("be.visible")
          .and(
            "have.attr",
            "href",
            "/dashboard/projects/1/environments/1/flags/create"
          )
          .and("have.attr", "aria-current", "page");

        cy.findByRole("heading", { name: "Create a feature flag" }).should(
          "be.visible"
        );

        cy.contains(
          "The new feature flag will appear in Project from seeding / Production."
        ).should("be.visible");

        cy.findByLabelText("Flag name").should("be.visible");
        cy.findByLabelText("Flag description").should("be.visible");
        cy.findByText(
          "After the creation of a feature flag, you will be able to get its SDK key for application usage."
        ).should("be.visible");
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

      it("creates an environment", () => {
        cy.findByLabelText("Flag name").type("My new flag");
        cy.findByLabelText("Flag description").type("My new flag description");
        cy.findByRole("button", { name: "Create the feature flag" }).click();

        cy.get(".success-box")
          .should("have.focus")
          .and("contain.text", "The flag has been successfully created.");

        cy.findByRole("heading", { name: "My new flag feature flag" }).should(
          "be.visible"
        );
        cy.findByText("My new flag description").should("be.visible");

        cy.url().should(
          "include",
          "/dashboard/projects/1/environments/1/flags?newFlagId"
        );

        cy.checkA11y();
      });

      it("shows an error when trying to create a flag  with the same key", () => {
        // Initial flag creation
        cy.findByLabelText("Flag name").type("My new flag");
        cy.findByLabelText("Flag description").type("My new flag description");
        cy.findByRole("button", { name: "Create the feature flag" }).click();

        // New flag creation
        cy.visit("/dashboard/projects/1/environments/1/flags/create");
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
