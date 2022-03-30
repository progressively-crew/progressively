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
          "Rollout | Project from seeding | Production | Flags | New homepage | Strategies | Create"
        );

        cy.findByText("Projects")
          .should("be.visible")
          .and("have.attr", "href", "/dashboard");

        cy.findAllByText("Project from seeding")
          .first()
          .should("be.visible")
          .and("have.attr", "href", "/dashboard/projects/1");

        cy.findAllByText("Production")
          .first()
          .should("be.visible")
          .and(
            "have.attr",
            "href",
            "/dashboard/projects/1/environments/1/flags"
          );

        cy.findAllByText("New homepage")
          .first()
          .should("be.visible")
          .and(
            "have.attr",
            "href",
            "/dashboard/projects/1/environments/1/flags/1"
          );

        cy.findAllByText("Add a strategy")
          .first()
          .should("be.visible")
          .and(
            "have.attr",
            "href",
            "/dashboard/projects/1/environments/1/flags/1/strategies/create"
          )
          .and("have.attr", "aria-current", "page");

        cy.get("h1").should("contain", "Add a strategy");

        cy.contains(
          "You're about to add a strategy to New homepage in Project from seeding on Production."
        ).should("be.visible");

        cy.checkA11y();
      });

      it("shows the form layout", () => {
        cy.findByText("General information").should("be.visible");
        cy.findByLabelText("Strategy name").should("be.visible");

        // Strategy audience
        cy.findByText("Strategy audience").should("be.visible");
        cy.findByLabelText("Everybody is concerned").should("be.visible");
        cy.findByLabelText("People with a specific field").should("be.visible");
        // TODO: implement the strategy first before making the test on it
        // cy.findByLabelText("People belonging to a given group").should(
        //   "be.visible"
        // );

        // Strategy activation
        cy.findByText("Activation strategy").should("be.visible");
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

        cy.get(".error-box").should("have.focus");
        cy.findByText("The following 3 errors have been found:");
        cy.findByText("The strategy name is required.");
        cy.findByText("The field name is required.");
        cy.findByText("The field values are required.");

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
        cy.get(".success-box").should("have.focus");
        cy.findByText("The strategy has been successfully created.").should(
          "be.visible"
        );
        cy.findByRole("heading", { name: "New strategy" }).should("be.visible");

        cy.checkA11y();
      });
    });
  });
});
