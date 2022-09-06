describe("/dashboard/projects/[id]/environments/[envId]/flags/[flagId]/variants", () => {
  beforeEach(cy.seed);
  afterEach(cy.cleanupDb);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1/environments/1/flags/1/variants");
    });

    it("checks that the route is protected", () => {
      cy.checkProtectedRoute();
    });
  });

  describe("authenticated", () => {
    describe("user: Jane", () => {
      beforeEach(() => {
        cy.signIn("Jane");
        cy.visit("/dashboard/projects/1/environments/1/flags/1/variants", {
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
      });

      it("adds a variant", () => {
        cy.visit("/dashboard/projects/1/environments/1/flags/1/variants");
        cy.findByLabelText("New variant value").type("Alternative");
        cy.findByRole("button", { name: "Add variant" }).click();

        cy.findByLabelText("Variant 1 value")
          .should("be.visible")
          .and("have.attr", "value", "Alternative");
      });

      it("edits a variant", () => {
        cy.visit("/dashboard/projects/1/environments/1/flags/1/variants");
        cy.findByLabelText("New variant value").type("Alternative");
        cy.findByRole("button", { name: "Add variant" }).click();

        cy.findByLabelText("Variant 1 value").type("Variant alternative");
        cy.findByRole("button", { name: "Edit variants" }).click();

        cy.reload();

        cy.findByLabelText("Variant 1 value")
          .should("be.visible")
          .and("have.attr", "value", "AlternativeVariant alternative");
      });

      it("shows the layout — (empty)", () => {
        cy.visit("/dashboard/projects/1/environments/1/flags/1/variants");
        cy.injectAxe();

        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Production | Flags | New homepage | Variants"
        );

        cy.findByRole("link", { name: "Projects" })
          .should("be.visible")
          .and("have.attr", "href", "/dashboard");

        cy.findByRole("link", { name: "Project from seeding" })
          .should("be.visible")
          .and("have.attr", "href", "/dashboard/projects/1");

        cy.findByRole("link", { name: "Production" })
          .should("be.visible")
          .and("have.attr", "href", "/dashboard/projects/1/environments/1/flags");

        cy.findByRole("link", { name: "New homepage" })
          .should("be.visible")
          .and("have.attr", "href", "/dashboard/projects/1/environments/1/flags/1/variants")
          .and("have.attr", "aria-current", "page");

        cy.findByRole("heading", { name: "New homepage" }).should("be.visible");
        cy.findByRole("heading", { name: "Variants" }).should("be.visible");

        cy.findByText("No variants found").should("be.visible");
        cy.findByText("There are no variants found for this flag.").should("be.visible");
        cy.findByRole("button", { name: "Add variant" }).should("be.visible");

        cy.checkA11y();
      });

      it("shows the layout — (filled data)", () => {
        cy.visit("/dashboard/projects/1/environments/1/flags/4/variants");
        cy.injectAxe();

        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Production | Flags | With multivariate | Variants"
        );

        cy.findByRole("link", { name: "Projects" })
          .should("be.visible")
          .and("have.attr", "href", "/dashboard");

        cy.findByRole("link", { name: "Project from seeding" })
          .should("be.visible")
          .and("have.attr", "href", "/dashboard/projects/1");

        cy.findByRole("link", { name: "Production" })
          .should("be.visible")
          .and("have.attr", "href", "/dashboard/projects/1/environments/1/flags");

        cy.findByRole("link", { name: "With multivariate" })
          .should("be.visible")
          .and("have.attr", "href", "/dashboard/projects/1/environments/1/flags/4/variants")
          .and("have.attr", "aria-current", "page");

        cy.findByRole("heading", { name: "With multivariate" }).should("be.visible");
        cy.findByRole("heading", { name: "Variants" }).should("be.visible");

        cy.findByRole("button", { name: "Add variant" }).should("be.visible");

        cy.checkA11y();
      });
    });
  });
});
