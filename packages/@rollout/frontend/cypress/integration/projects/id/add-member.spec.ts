describe("/dashboard/projects/[id]/add-member", () => {
  describe("general verifications", () => {
    beforeEach(cy.seed);
    afterEach(cy.cleanup);

    describe("not authenticated", () => {
      beforeEach(() => {
        cy.visit("/dashboard/projects/1/add-member");
      });

      it("checks that the route is protected", () => {
        cy.checkProtectedRoute();
      });
    });

    describe("authenticated", () => {
      describe("user: Jane", () => {
        beforeEach(() => {
          cy.signIn("Jane");
          cy.visit("/dashboard/projects/1/add-member", {
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
          cy.visit("/dashboard/projects/1/add-member");
          cy.injectAxe();
        });

        it("does not show actions only allowed by the admin (john is a regular user)", () => {
          cy.findByRole("heading", {
            name: "You are not allowed to add members to projects.",
          }).should("be.visible");

          cy.findByText(
            "If you think this is an error, make sure to contact one of the project administrators:"
          ).should("be.visible");

          cy.findByRole("button", {
            name: "Copy marvin.frachet@gmail.com",
          }).should("be.visible");

          cy.checkA11y();
        });
      });

      describe("user: Marvin", () => {
        beforeEach(() => {
          cy.signIn("Marvin");
          cy.visit("/dashboard/projects/1/add-member");
          cy.injectAxe();
        });

        it("shows the layout of the page", () => {
          cy.title().should(
            "eq",
            "Rollout | Project from seeding | Add member"
          );

          cy.findByRole("heading", {
            name: "Add member",
          }).should("be.visible");

          cy.findByLabelText("Member email").should("be.visible");
          cy.findByRole("button", { name: "Add the member" }).should(
            "be.visible"
          );

          cy.checkA11y();
        });

        it("shows an error when the email is not valid", () => {
          cy.findByLabelText("Member email").type("lol");
          cy.findByRole("button", { name: "Add the member" }).click();

          cy.get(".error-box")
            .should("have.focus")
            .and(
              "contain.text",
              'The provided email address is not valid. It should look like "jane.doe@domain.com".'
            );

          cy.checkA11y();
        });

        it("shows an error when the user is already in the project", () => {
          cy.findByLabelText("Member email").type("marvin.frachet@gmail.com");
          cy.findByRole("button", { name: "Add the member" }).click();

          cy.get(".error-box")
            .should("have.focus")
            .and(
              "contain.text",
              "The user is already a member of the project."
            );

          cy.checkA11y();
        });

        it("shows an error message when the user does not exist in the db", () => {
          cy.findByLabelText("Member email").type("blah.blah@gmail.com");
          cy.findByRole("button", { name: "Add the member" }).click();

          cy.get(".error-box")
            .should("have.focus")
            .and(
              "contain.text",
              "The user does not exist. They must have to create an account before being able to join the project."
            );

          cy.checkA11y();
        });

        it("shows a successful message when the user has been added to the project", () => {
          cy.findByLabelText("Member email").type("jane.doe@gmail.com");
          cy.findByRole("button", { name: "Add the member" }).click();

          cy.get(".success-box")
            .should("have.focus")
            .and(
              "contain.text",
              "The user has been invited invited to join the project."
            );

          cy.checkA11y();
        });
      });
    });
  });
});
