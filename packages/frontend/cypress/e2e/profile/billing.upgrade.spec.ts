// Only exist for SaaS pages
describe("/dashboard/profile/billing/upgrade", () => {
  describe("not authenticated", () => {
    before(cy.seed);
    after(cy.cleanupDb);

    it("checks that the route is protected", () => {
      cy.visit("/dashboard/profile/billing/upgrade");
      cy.checkUnauthenticatedRoute();
    });
  });

  describe("authenticated", () => {
    describe("invalid url query params", () => {
      before(cy.seed);
      after(cy.cleanupDb);

      beforeEach(() => {
        cy.signIn("Marvin");
      });

      it("shows an error when query params are missing", () => {
        cy.visit("/dashboard/profile/billing/upgrade");
        cy.injectAxe();

        cy.title().should("eq", "Progressively | Profile | Billing | Upgrade");

        cy.findByText(
          "One of the mandatory information is missing. Please, retry the action."
        ).should("be.visible");

        cy.checkA11y();
      });

      it("shows an error when projectCount is missing", () => {
        cy.visit(
          "/dashboard/profile/billing/upgrade?envCount=1&evalCount=10000"
        );
        cy.injectAxe();

        cy.title().should("eq", "Progressively | Profile | Billing | Upgrade");

        cy.findByText(
          "One of the mandatory information is missing. Please, retry the action."
        ).should("be.visible");

        cy.checkA11y();
      });

      it("shows an error when envCount is missing", () => {
        cy.visit(
          "/dashboard/profile/billing/upgrade?projectCount=1&evalCount=10000"
        );
        cy.injectAxe();

        cy.title().should("eq", "Progressively | Profile | Billing | Upgrade");

        cy.findByText(
          "One of the mandatory information is missing. Please, retry the action."
        ).should("be.visible");

        cy.checkA11y();
      });

      it("shows an error when evalCount is missing", () => {
        cy.visit(
          "/dashboard/profile/billing/upgrade?projectCount=1&envCount=2"
        );
        cy.injectAxe();

        cy.title().should("eq", "Progressively | Profile | Billing | Upgrade");

        cy.findByText(
          "One of the mandatory information is missing. Please, retry the action."
        ).should("be.visible");

        cy.checkA11y();
      });

      it("shows an error when projectCount is in invalid format", () => {
        cy.visit(
          "/dashboard/profile/billing/upgrade?projectCount=abcd&envCount=1&evalCount=10000"
        );
        cy.injectAxe();

        cy.title().should("eq", "Progressively | Profile | Billing | Upgrade");

        cy.findByText(
          "One of the information is not of a valid formatting. Please, try the action."
        ).should("be.visible");

        cy.checkA11y();
      });

      it("shows an error when envCount is in invalid format", () => {
        cy.visit(
          "/dashboard/profile/billing/upgrade?projectCount=2&envCount=abcd&evalCount=10000"
        );
        cy.injectAxe();

        cy.title().should("eq", "Progressively | Profile | Billing | Upgrade");

        cy.findByText(
          "One of the information is not of a valid formatting. Please, try the action."
        ).should("be.visible");

        cy.checkA11y();
      });

      it("shows an error when evalCount is in invalid format", () => {
        cy.visit(
          "/dashboard/profile/billing/upgrade?projectCount=2&envCount=2&evalCount=abcd"
        );
        cy.injectAxe();

        cy.title().should("eq", "Progressively | Profile | Billing | Upgrade");

        cy.findByText(
          "One of the information is not of a valid formatting. Please, try the action."
        ).should("be.visible");

        cy.checkA11y();
      });

      it("shows an error when projectCount is outside its range", () => {
        cy.visit(
          "/dashboard/profile/billing/upgrade?projectCount=12&envCount=2&evalCount=10000"
        );
        cy.injectAxe();

        cy.title().should("eq", "Progressively | Profile | Billing | Upgrade");
        cy.findByRole("button", { name: "Update" }).click();

        cy.findByText(
          "Something went wrong when trying to add the plan."
        ).should("be.visible");

        cy.checkA11y();
      });

      it("shows an error when envCount is outside its range", () => {
        cy.visit(
          "/dashboard/profile/billing/upgrade?projectCount=2&envCount=12&evalCount=10000"
        );
        cy.injectAxe();

        cy.title().should("eq", "Progressively | Profile | Billing | Upgrade");
        cy.findByRole("button", { name: "Update" }).click();

        cy.findByText(
          "Something went wrong when trying to add the plan."
        ).should("be.visible");

        cy.checkA11y();
      });

      it("shows an error when evalCount is outside its range", () => {
        cy.visit(
          "/dashboard/profile/billing/upgrade?projectCount=2&envCount=2&evalCount=12000"
        );
        cy.injectAxe();

        cy.title().should("eq", "Progressively | Profile | Billing | Upgrade");
        cy.findByRole("button", { name: "Update" }).click();

        cy.findByText(
          "Something went wrong when trying to add the plan."
        ).should("be.visible");

        cy.checkA11y();
      });
    });

    describe("validating a passing plan", () => {
      before(cy.seed);
      after(cy.cleanupDb);

      beforeEach(() => {
        cy.signIn("Marvin");
      });

      it("upgrades to a new plan", () => {
        cy.visit(
          "/dashboard/profile/billing/upgrade?projectCount=2&envCount=3&evalCount=30000"
        );

        cy.findByRole("button", { name: "Update" }).click();
        cy.url().should(
          "contain",
          "/dashboard/profile/billing?planCreated=true"
        );
        cy.focused().should("contain", "The plan has been successfully added.");
        cy.findByText("€30").should("be.visible");
      });
    });
  });
});
