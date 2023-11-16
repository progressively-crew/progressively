describe("/dashboard/projects/[id]/environments/[envId]/flags/[flagId]/webhooks/create", () => {
  before(cy.seed);
  after(cy.cleanupDb);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1/environments/1/flags/1/webhooks/create");
    });

    it("checks that the route is protected", () => {
      cy.checkUnauthenticatedRoute();
    });
  });

  describe("authenticated", () => {
    describe("user: Jane", () => {
      beforeEach(() => {
        cy.signIn("Jane");
        cy.visit(
          "/dashboard/projects/1/environments/1/flags/1/webhooks/create",
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
          "/dashboard/projects/1/environments/1/flags/1/webhooks/create"
        );

        cy.injectAxe();
      });

      it("shows the layout", () => {
        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Production | Flags | New homepage | Webhooks | Create"
        );

        cy.findByRole("heading", { name: "Create a webhook" }).should(
          "be.visible"
        );
      });

      it("creates a webhook", () => {
        cy.findByLabelText("Endpoint:")
          .should("be.visible")
          .type("https://something.com");

        cy.findByLabelText("Event:").click();
        cy.findByLabelText("Flag activation").click();

        cy.findByRole("button", { name: "Save the webhook" })
          .should("be.visible")
          .click();

        cy.url().should(
          "include",
          "/dashboard/projects/1/environments/1/flags/1/webhooks?newWebhook=true"
        );

        cy.get(".success-box")
          .should("have.focus")
          .and("contain.text", "The webhook has been successfully added.");

        cy.checkA11y();
      });
    });
  });
});
