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

      it("edits a variant", () => {
        // create the variant
        cy.visit(
          "/dashboard/projects/1/environments/1/flags/1/variants/create"
        );
        cy.findByLabelText("Variant name").type("Variant 1 value");
        cy.findByRole("button", { name: "Create the variant" }).click();

        cy.url().should(
          "include",
          "/dashboard/projects/1/environments/1/flags/1/variants?newVariant=true"
        );

        // edit the variant
        cy.visit("/dashboard/projects/1/environments/1/flags/1/variants");

        cy.findByLabelText("Variant 1 value").type("Variant alternative");
        cy.findByRole("button", { name: "Edit variants" }).click();

        cy.reload();

        cy.findByLabelText("Variant 1 value")
          .should("exist")
          .and("have.attr", "value", "Variant 1 valueVariant alternative");
      });

      it("shows the layout — (empty)", () => {
        cy.visit("/dashboard/projects/1/environments/1/flags/1/variants");
        cy.injectAxe();

        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Production | Flags | New homepage | Variants"
        );

        cy.verifyBreadcrumbs([
          ["Projects", "/dashboard"],
          ["Project from seeding", "/dashboard/projects/1"],
          ["Production", "/dashboard/projects/1/environments/1"],
          ["New homepage", "/dashboard/projects/1/environments/1/flags/1"],
        ]);

        cy.findAllByText("New homepage").should("have.length", 3);
        cy.findByRole("heading", { name: "Variants" }).should("be.visible");

        cy.findByText("No variants found").should("be.visible");
        cy.findByText("There are no variants found for this flag.").should(
          "be.visible"
        );

        cy.checkA11y();
      });

      it("shows the layout — (filled data)", () => {
        cy.visit("/dashboard/projects/1/environments/1/flags/4/variants");
        cy.injectAxe();

        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Production | Flags | With multivariate | Variants"
        );

        cy.verifyBreadcrumbs([
          ["Projects", "/dashboard"],
          ["Project from seeding", "/dashboard/projects/1"],
          ["Production", "/dashboard/projects/1/environments/1"],
          ["With multivariate", "/dashboard/projects/1/environments/1/flags/4"],
        ]);

        cy.findAllByText("With multivariate").should("have.length", 3);
        cy.findByRole("heading", { name: "Variants" }).should("be.visible");

        cy.checkA11y();
      });
    });
  });
});
