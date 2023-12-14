describe("/dashboard/projects/[id]/settings/delete-member/[userId]", () => {
  describe("general verifications", () => {
    beforeEach(cy.seed);
    afterEach(cy.cleanupDb);

    describe("not authenticated", () => {
      beforeEach(() => {
        cy.visit("/dashboard/projects/1/settings/delete-member/2");
      });

      it("checks that the route is protected", () => {
        cy.checkUnauthenticatedRoute();
      });
    });

    describe("authenticated", () => {
      describe("user: Jane", () => {
        beforeEach(() => {
          cy.signIn("Jane");
          cy.visit("/dashboard/projects/1/settings/delete-member/2", {
            failOnStatusCode: false,
          });
        });

        it("shouldnt show anything when Jane tries to visit Marvin s project", () => {
          cy.checkProtectedRoute();
        });
      });

      describe("user: John", () => {
        beforeEach(() => {
          cy.signIn("John");
        });

        it("does not show actions only allowed by the admin (john is a regular user)", () => {
          cy.visit("/dashboard/projects/1/settings/delete-member/2");
          cy.injectAxe();

          cy.findByRole("heading", {
            name: "Woops! You're not authorized to see this content",
          }).should("be.visible");

          cy.checkA11y();
        });
      });

      describe("user: Marvin", () => {
        beforeEach(() => {
          cy.signIn("Marvin");
        });

        it("shows the layout of the page", () => {
          cy.visit("/dashboard/projects/1/settings/delete-member/2");
          cy.injectAxe();

          cy.title().should(
            "eq",
            "Progressively | Project from seeding | Delete member from project"
          );

          cy.findByRole("heading", {
            name: "Are you sure you want to remove John Doe from Project from seeding?",
          }).should("be.visible");

          cy.findByRole("button", {
            name: "Yes, remove the user from the project",
          }).should("be.visible");

          cy.findByRole("link", {
            name: "Cancel",
          })
            .should("be.visible")
            .and("have.attr", "href", "/dashboard/projects/1/settings");

          cy.checkA11y();
        });

        it("removes the user", () => {
          cy.visit("/dashboard/projects/1/settings");
          cy.findByText("john.doe@gmail.com").should("be.visible");

          cy.visit("/dashboard/projects/1/settings/delete-member/2");
          cy.injectAxe();

          cy.findByRole("button", {
            name: "Yes, remove the user from the project",
          })
            .should("be.visible")
            .click();

          cy.url().should(
            "contain",
            "/dashboard/projects/1/settings?memberRemoved=true#member-removed"
          );
          cy.findByText("john.doe@gmail.com").should("not.exist");
          cy.checkA11y();
        });

        it("cannot remove the admin user", () => {
          cy.visit("/dashboard/projects/1/settings");
          cy.findByText("marvin.frachet@something.com").should("be.visible");

          cy.visit("/dashboard/projects/1/settings/delete-member/1");
          cy.injectAxe();

          cy.findByRole("button", {
            name: "Yes, remove the user from the project",
          })
            .should("be.visible")
            .click();

          cy.findByText("marvin.frachet@something.com").should("be.visible");

          cy.checkA11y();
        });
      });
    });
  });
});
