describe("/dashboard/projects/[id]/delete", () => {
  describe("general verifications", () => {
    before(cy.seed);
    after(cy.cleanupDb);

    describe("not authenticated", () => {
      beforeEach(() => {
        cy.visit("/dashboard/projects/1/delete");
      });

      it("checks that the route is protected", () => {
        cy.checkProtectedRoute();
      });
    });

    describe("authenticated", () => {
      describe("user: Jane", () => {
        beforeEach(() => {
          cy.signIn("Jane");
          cy.visit("/dashboard/projects/1/delete", { failOnStatusCode: false });
        });

        it("shouldnt show anything when Jane tries to visit Marvin s project", () => {
          cy.checkProtectedRoute();
        });
      });

      describe("user: John", () => {
        beforeEach(() => {
          cy.signIn("John");
          cy.visit("/dashboard/projects/1/delete");
          cy.injectAxe();
        });

        it("does not show actions only allowed by the admin (john is a regular user)", () => {
          cy.findByRole("heading", {
            name: "Woops! You're not authorized to see this content",
          }).should("be.visible");

          cy.checkA11y();
        });
      });

      describe("user: Marvin", () => {
        beforeEach(() => {
          cy.signIn("Marvin");
          cy.visit("/dashboard/projects/1/delete");
          cy.injectAxe();
        });

        it("shows the layout of the page", () => {
          cy.title().should(
            "eq",
            "Progressively | Project from seeding | Delete"
          );

          cy.findByRole("heading", {
            name: "Deleting a project",
          }).should("be.visible");

          cy.findByRole("button", {
            name: "Yes, delete the project",
          }).should("be.visible");

          cy.findByRole("link", {
            name: "No, don't delete Project from seeding",
          })
            .should("be.visible")
            .and("have.attr", "href", "/dashboard/projects/1/settings");

          cy.checkA11y();
        });
      });
    });
  });

  describe("removing projects (needs reseeding after each test)", () => {
    beforeEach(cy.seed);
    afterEach(cy.cleanupDb);

    beforeEach(() => {
      cy.signIn("Marvin");
      cy.visit("/dashboard/projects/1/delete");
      cy.injectAxe();
    });

    it("removes the project and get me back to the onboarding page when I dont have other projects", () => {
      cy.findByRole("button", {
        name: "Yes, delete the project",
      }).click();

      cy.url().should("contain", "/dashboard/onboarding");
    });

    it("removes the project and get me back to the project list when I have other projects", () => {
      // Create another project as a test setup
      cy.visit("/dashboard/projects/create");
      cy.findByLabelText("Project name").type("My new project");
      cy.findByRole("button", { name: "Create the project" }).click();
      cy.get(".success-box").should("be.visible");

      // Delete a project and verify that the other is still here
      cy.visit("/dashboard/projects/1/delete");

      cy.findByRole("button", {
        name: "Yes, delete the project",
      }).click();

      cy.url().should("contain", "/dashboard?projectRemoved=true");
      cy.get(".success-box")
        .should("have.focus")
        .and("be.visible")
        .and("contain", "The project has been successfully removed.");

      cy.get("main").within(() => {
        cy.findByText("Project from seeding").should("not.exist");
        cy.findByText("My new project").should("be.visible");
      });
    });
  });
});
