describe("/dashboard/projects/[id]/environments/[envId]/flags/[flagId]", () => {
  beforeEach(cy.seed);
  afterEach(cy.cleanupDb);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1/environments/1/flags/1");
    });

    it("checks that the route is protected", () => {
      cy.checkProtectedRoute();
    });
  });

  describe("authenticated", () => {
    describe("user: Jane", () => {
      beforeEach(() => {
        cy.signIn("Jane");
        cy.visit("/dashboard/projects/1/environments/1/flags/1", {
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

      it("shows the layout", () => {
        cy.visit("/dashboard/projects/1/environments/1/flags/1");
        cy.injectAxe();

        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Production | Flags | New homepage"
        );

        cy.verifyBreadcrumbs([
          ["Projects", "/dashboard"],
          ["Project from seeding", "/dashboard/projects/1"],
          ["Production", "/dashboard/projects/1/environments/1"],
          ["New homepage", "/dashboard/projects/1/environments/1/flags/1"],
        ]);

        cy.findAllByText("New homepage").should("have.length", 2);
        cy.findByRole("heading", { name: "Audience" }).should("be.visible");
        cy.findByRole("heading", { name: "Percentage of the audience" }).should(
          "be.visible"
        );

        // Concerned flag has empty state for eligibility audience
        cy.get("#eligibility-section").within(() => {
          cy.findByRole("button", { name: "Update" }).should("not.exist");
        });

        cy.checkA11y();
      });

      describe("Audience eligibility (form)", () => {
        beforeEach(() => {
          cy.visit("/dashboard/projects/1/environments/1/flags/2");
          cy.injectAxe();
        });

        it("shows an initial form", () => {
          cy.get("#eligibility-section").within(() => {
            cy.findByLabelText("Field name")
              .should("be.visible")
              .and("have.value", "email");
            cy.findByLabelText("Field comparator")
              .should("be.visible")
              .and("have.value", "eq");
            cy.get("[name='field-value']").and("have.value", "@gmail.com");
          });

          cy.checkA11y();
        });

        it("adds a new rule when pressing the button", () => {
          cy.get("#eligibility-section").within(() => {
            cy.findAllByLabelText("Field name").should("have.length", 1);

            cy.findByRole("button", { name: "Add a new rule" })
              .should("be.visible")
              .click();

            cy.get("[name='field-name']").should("have.length", 2);
            cy.checkA11y();

            cy.reload();

            cy.get("[name='field-name']").should("have.length", 2);
          });
        });

        it("edits the existing rules", () => {
          cy.get("#eligibility-section").within(() => {
            cy.findByRole("button", { name: "Add a new rule" }).click();

            cy.get("[name='field-name']").should("have.length", 2);

            cy.get("[name='field-name']").last().type("firstname");
            cy.get("[name='tag-name']").last().type("hello world{enter}");
            cy.findByRole("button", { name: "Update" }).click();

            cy.get("[name='field-name']").should("have.length", 2);

            cy.get("[name='field-name']")
              .last()
              .should("have.attr", "value", "firstname");
            cy.get("[name='field-value']")
              .last()
              .should("have.attr", "value", "hello world");
          });
        });
      });

      describe("Additional Audience (form)", () => {
        beforeEach(() => {
          cy.visit("/dashboard/projects/1/environments/1/flags/2");
          cy.injectAxe();
        });

        it("shows an initial form", () => {
          cy.get("#additional-audience-section").within(() => {
            cy.findByLabelText("Field name")
              .should("be.visible")
              .and("have.value", "id");
            cy.findByLabelText("Field comparator")
              .should("be.visible")
              .and("have.value", "eq");
            cy.get("[name='field-value']").and("have.value", "1");
          });

          cy.checkA11y();
        });

        it("adds a new rule when pressing the button", () => {
          cy.get("#additional-audience-section").within(() => {
            cy.findAllByLabelText("Field name").should("have.length", 1);

            cy.findByRole("button", { name: "Add a new rule" })
              .should("be.visible")
              .click();

            cy.get("[name='field-name']").should("have.length", 2);
            cy.checkA11y();

            cy.reload();

            cy.get("[name='field-name']").should("have.length", 2);
          });
        });

        it("edits the existing rules", () => {
          cy.get("#additional-audience-section").within(() => {
            cy.findByRole("button", { name: "Add a new rule" }).click();

            cy.get("[name='field-name']").should("have.length", 2);
            cy.get("[name='field-name']").last().type("firstname");

            cy.get("[name='tag-name']").last().type("hello world{enter}");
            cy.findByRole("button", { name: "Update" }).click();

            cy.get("[name='field-name']").should("have.length", 2);
            cy.get("[name='field-value']")
              .last()
              .should("have.attr", "value", "hello world");
          });
        });
      });
    });
  });
});
