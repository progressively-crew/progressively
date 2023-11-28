describe("/dashboard/projects/[id]/environments/create", () => {
  before(cy.seed);
  after(cy.cleanupDb);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1/environments/create");
    });

    it("checks that the route is protected", () => {
      cy.checkUnauthenticatedRoute();
    });
  });

  describe("authenticated", () => {
    describe("user: Jane", () => {
      beforeEach(() => {
        cy.signIn("Jane");
        cy.visit("/dashboard/projects/1/environments/create", {
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
        cy.visit("/dashboard/projects/1/environments/create");
        cy.injectAxe();
      });

      it("shows the create environment layout", () => {
        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Create an environment"
        );

        cy.findByRole("heading", { name: "Create an environment" }).should(
          "be.visible"
        );

        cy.findByLabelText("Environment name").should("be.visible");

        cy.findByRole("button", { name: "Create the environment" }).should(
          "be.visible"
        );

        cy.checkA11y();
      });

      it("shows an error when submitting an empty form", () => {
        cy.findByRole("button", { name: "Create the environment" }).click();

        cy.get(".error-box")
          .should("have.focus")
          .and(
            "contain.text",
            "The name field is required, make sure to have one."
          );

        cy.checkA11y();
      });

      it("creates an environment", () => {
        cy.findByLabelText("Environment name").type("My new env");
        cy.findByRole("button", { name: "Create the environment" }).click();

        cy.get(".success-box")
          .should("have.focus")
          .and(
            "contain.text",
            "The environment has been successfully created."
          );

        cy.url().should("include", "/dashboard/projects/1/environments");
        cy.checkA11y();
      });
    });
  });
});
