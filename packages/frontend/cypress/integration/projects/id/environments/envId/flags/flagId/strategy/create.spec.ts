describe("/dashboard/projects/[id]/environments/[envId]/flags/[flagId]/strategies/create", () => {
  before(cy.seed);
  after(cy.cleanup);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit(
        "/dashboard/projects/1/environments/1/flags/1/strategies/create"
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
          "/dashboard/projects/1/environments/1/flags/1/strategies/create",
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
          "/dashboard/projects/1/environments/1/flags/1/strategies/create"
        );

        cy.injectAxe();
      });

      it("shows the layout", () => {
        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Production | Flags | New homepage | Strategies | Create"
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

        cy.findByRole("link", { name: "New homepage" })
          .should("be.visible")
          .and(
            "have.attr",
            "href",
            "/dashboard/projects/1/environments/1/flags/1"
          );

        cy.findByRole("link", { name: "Add a strategy" })
          .should("be.visible")
          .and(
            "have.attr",
            "href",
            "/dashboard/projects/1/environments/1/flags/1/strategies/create"
          )
          .and("have.attr", "aria-current", "page");

        cy.findByRole("heading", { name: "Add a strategy" }).should(
          "be.visible"
        );

        cy.contains(
          "You're about to add a strategy to New homepage in Project from seeding on Production."
        ).should("be.visible");

        cy.checkA11y();
      });

      it("shows the form layout", () => {
        cy.findByRole("heading", { name: "General information" }).should(
          "be.visible"
        );
        cy.findByLabelText("Strategy name").should("be.visible");

        // Strategy audience
        cy.findByRole("heading", { name: "Strategy audience" }).should(
          "be.visible"
        );

        cy.findByLabelText("Everybody is concerned").should("be.visible");
        cy.findByLabelText("People with a specific field").should("be.visible");
        // TODO: implement the strategy first before making the test on it
        // cy.findByLabelText("People belonging to a given group").should(
        //   "be.visible"
        // );

        // Strategy activation
        cy.findByRole("heading", { name: "Activation strategy" }).should(
          "be.visible"
        );
        cy.findByLabelText("Everyone will see the variants").should(
          "be.visible"
        );
        cy.findByLabelText(
          "A percentage of the people will see the variants"
        ).should("be.visible");
        cy.findByRole("button", { name: "Save the strategy" }).should(
          "be.visible"
        );

        cy.checkA11y();
      });

      it("shows a list of errors when the field are not filled", () => {
        cy.findByLabelText("People with a specific field").click({
          force: true,
        });
        cy.findByRole("button", { name: "Save the strategy" }).click();

        cy.get(".error-box")
          .should("have.focus")
          .and("contain.text", "The following 3 errors have been found:")
          .and("contain.text", "The strategy name is required.")
          .and("contain.text", "The field name is required.")
          .and("contain.text", "The field values are required.");

        cy.checkA11y();
      });

      // TODO: improve E2E testing for strategies. The business covering is minimal atm
      it("adds a strategy", () => {
        cy.findByLabelText("Strategy name").type("New strategy");
        cy.findByRole("button", { name: "Save the strategy" }).click();

        cy.url().should(
          "include",
          "/dashboard/projects/1/environments/1/flags/1?newStrategy=true"
        );

        cy.get(".success-box")
          .should("have.focus")
          .and("contain.text", "The strategy has been successfully created.");

        cy.findByRole("heading", { name: "New strategy" }).should("be.visible");

        cy.checkA11y();
      });
    });
  });
});
