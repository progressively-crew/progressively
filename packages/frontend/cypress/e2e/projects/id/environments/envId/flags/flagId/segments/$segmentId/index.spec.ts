describe("/dashboard/projects/[id]/environments/[envId]/flags/[flagId]/segments/[segmentId]", () => {
  beforeEach(cy.seed);
  afterEach(cy.cleanupDb);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/1/environments/1/flags/1/segments/1");
    });

    it("checks that the route is protected", () => {
      cy.checkProtectedRoute();
    });
  });

  describe("authenticated", () => {
    describe("user: Jane", () => {
      beforeEach(() => {
        cy.signIn("Jane");
        cy.visit("/dashboard/projects/1/environments/1/flags/1/segments/1", {
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
        cy.visit("/dashboard/projects/1/environments/1/flags/1/segments/1");
        cy.injectAxe();

        cy.title().should(
          "eq",
          "Progressively | Project from seeding | Production | Flags | New homepage | Segments | By email address"
        );

        cy.verifyBreadcrumbs([
          ["Projects", "/dashboard"],
          ["Project from seeding", "/dashboard/projects/1"],
          ["Production", "/dashboard/projects/1/environments/1"],
          ["New homepage", "/dashboard/projects/1/environments/1/flags/1"],
        ]);

        cy.findAllByText("New homepage").should("have.length", 2);
        cy.findByRole("heading", {
          name: `Segments "By email address"`,
        }).should("be.visible");

        cy.findByLabelText("Name of the segment")
          .should("be.visible")
          .and("have.value", "By email address");

        cy.checkA11y();
      });

      describe("Segment update (General Section)", () => {
        beforeEach(() => {
          cy.visit("/dashboard/projects/1/environments/1/flags/1/segments/1");
          cy.injectAxe();
        });

        it("edits the current segment name", () => {
          cy.findByLabelText("Name of the segment").type("Hello world");

          cy.findByRole("button", { name: "Save the segment" })
            .should("be.visible")
            .click();

          cy.findByRole("heading", {
            name: `Segments "By email addressHello world"`,
          }).should("not.exist");

          cy.findByRole("heading", {
            name: `Segments "By email addressHello world"`,
          }).should("be.visible");

          cy.findByText("The segment has been successfully edited.").should(
            "be.visible"
          );

          cy.checkA11y();

          cy.reload();

          cy.findByRole("heading", {
            name: `Segments "By email addressHello world"`,
          }).should("be.visible");
        });
      });

      describe("Segment Update (rules)", () => {
        beforeEach(() => {
          cy.visit("/dashboard/projects/1/environments/1/flags/1/segments/1");
          cy.injectAxe();
        });

        it("shows an initial form", () => {
          cy.findByLabelText("Field name")
            .should("be.visible")
            .and("have.value", "email");

          cy.findByLabelText("Field comparator")
            .should("be.visible")
            .and("have.text", "is in array");

          cy.get("[name='field-value']").and("have.value", "gmail.com");

          cy.checkA11y();
        });

        it("adds a new rule when pressing the button", () => {
          cy.findAllByLabelText("Field name").should("have.length", 1);

          cy.findByRole("button", { name: "Add a rule" })
            .should("be.visible")
            .click();

          cy.get("[name='field-name']").should("have.length", 2);
          cy.checkA11y();

          cy.reload();

          cy.get("[name='field-name']").should("have.length", 2);
        });

        it.only("edits the existing rules", () => {
          cy.findByRole("button", { name: "Add a rule" }).click();
          cy.get("[name='field-name']").should("have.length", 2);

          cy.get("[name='field-name']").last().type("firstname");
          cy.get("[name='tag-name']").last().type("hello world{enter}");
          cy.findByRole("button", { name: "Save the rules" }).click();

          cy.get("[name='field-name']").should("have.length", 2);

          cy.get("[name='field-name']")
            .last()
            .should("have.attr", "value", "firstname");
          cy.get("[name='field-value']")
            .last()
            .should("have.attr", "value", "hello world");
          cy.findByText(
            "The segment rules have been successfully edited."
          ).should("be.visible");
        });
      });
    });
  });
});
