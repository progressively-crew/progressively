describe("/dashboard/projects/[id]/environments/[envId]/ab/[experimentId]/variants/create", () => {
  before(cy.seed);
  after(cy.cleanup);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1/environments/1/ab/1/variants/create");
    });

    it("checks that the route is protected", () => {
      cy.checkProtectedRoute();
    });
  });

  describe("authenticated", () => {
    describe("user: Jane", () => {
      beforeEach(() => {
        cy.signIn("Jane");
        cy.visit("/dashboard/projects/1/environments/1/ab/1/variants/create", {
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
        cy.visit("/dashboard/projects/1/environments/1/ab/1/variants/create");
        cy.injectAxe();
      });

      it("shows the layout", () => {
        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Production | New homepage experiment | Variants | Create"
        );

        cy.findByRole("link", { name: "Projects" })
          .should("be.visible")
          .and("have.attr", "href", "/dashboard");

        cy.findByRole("link", { name: "Project from seeding" })
          .should("be.visible")
          .and("have.attr", "href", "/dashboard/projects/1");

        cy.findByRole("link", { name: "Production" })
          .should("be.visible")
          .and("have.attr", "href", "/dashboard/projects/1/environments/1/ab");

        cy.findByRole("link", { name: "Create an experiment variant" })
          .should("be.visible")
          .and(
            "have.attr",
            "href",
            "/dashboard/projects/1/environments/1/ab/1/variants/create"
          )
          .and("have.attr", "aria-current", "page");

        cy.findByRole("heading", {
          name: "Create an experiment variant",
        }).should("be.visible");

        cy.contains(
          "The new variant will appear in Project from seeding / Production / New homepage experiment."
        ).should("be.visible");

        cy.findByLabelText("Variant name").should("be.visible");
        cy.findByLabelText("Variant description").should("be.visible");
        cy.findByText(
          "After the creation of an experiment variation, you will be able to get its SDK key for application usage."
        ).should("be.visible");
        cy.findByRole("button", {
          name: "Create the experiment variant",
        }).should("be.visible");

        cy.checkA11y();
      });

      it("shows an error when submitting an empty form", () => {
        cy.findByRole("button", {
          name: "Create the experiment variant",
        }).click();

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

      it("creates an experiment", () => {
        cy.findByLabelText("Variant name").type("My new experiment");
        cy.findByLabelText("Variant description").type(
          "My new experiment description"
        );
        cy.findByRole("button", {
          name: "Create the experiment variant",
        }).click();

        cy.get(".success-box")
          .should("have.focus")
          .and(
            "contain.text",
            "The experiment variant has been successfully created."
          );

        cy.findByText("My new experiment").should("be.visible");
        cy.findByText("My new experiment description").should("be.visible");

        cy.url().should(
          "include",
          "/dashboard/projects/1/environments/1/ab/1/variants?newVariantId"
        );

        cy.checkA11y();
      });

      it("shows an error when trying to create a flag  with the same key", () => {
        // Initial flag creation
        cy.findByLabelText("Variant name").type("My new flag");
        cy.findByLabelText("Variant description").type(
          "My new flag description"
        );
        cy.findByRole("button", {
          name: "Create the experiment variant",
        }).click();

        // New flag creation
        cy.visit("/dashboard/projects/1/environments/1/ab/1/variants/create");
        cy.findByLabelText("Variant name").type("My new flag");
        cy.findByLabelText("Variant description").type(
          "My new flag description"
        );
        cy.findByRole("button", {
          name: "Create the experiment variant",
        }).click();

        cy.get(".error-box")
          .should("have.focus")
          .and("contain.text", "The variant name is already used.");
      });
    });
  });
});
