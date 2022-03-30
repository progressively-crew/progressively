describe("/reset-password", () => {
  before(cy.seed);
  after(cy.cleanup);

  describe("shared", () => {
    beforeEach(() => {
      cy.visit("/reset-password?token=invalid-token");
      cy.injectAxe();
    });

    it("shows the page layout", () => {
      cy.findByRole("heading", { name: "Reset password" }).should("be.visible");
      cy.findByText("Set your new password.").should("be.visible");
      cy.findByLabelText("New password").should("be.visible");
      cy.findByLabelText("Confirmation password").should("be.visible");
      cy.findByRole("button", { name: "Change password" }).should("be.visible");
      cy.checkA11y();
    });

    it("shows an error when the passwords are not set", () => {
      cy.findByRole("button", { name: "Change password" }).click();

      cy.get(".error-box")
        .should("have.focus")
        .and("contain.text", "The password field is required.")
        .and("contain.text", "The confirmation password field is required.");
    });

    it("shows an error when the passwords are not long enough", () => {
      cy.findByLabelText("New password").type("p");
      cy.findByLabelText("Confirmation password").type("p");
      cy.findByRole("button", { name: "Change password" }).click();

      cy.get(".error-box")
        .should("have.focus")
        .and(
          "contain.text",
          "The provided password is too short. It should be at least 8 characters."
        )
        .and(
          "contain.text",
          "The provided confirmation password is too short. It should be at least 8 characters."
        );
    });

    it("shows an error when the passwords are not the same", () => {
      cy.findByLabelText("New password").type("password1");
      cy.findByLabelText("Confirmation password").type("password2");
      cy.findByRole("button", { name: "Change password" }).click();

      cy.get(".error-box")
        .should("have.focus")
        .and("contain.text", "The two passwords are not the same.");
    });

    it("shows an error when the passwords are valid but the token is an invalid one", () => {
      cy.findByLabelText("New password").type("password1");
      cy.findByLabelText("Confirmation password").type("password1");
      cy.findByRole("button", { name: "Change password" }).click();

      cy.get(".error-box")
        .should("have.focus")
        .and("contain.text", "An information is missing");
    });
  });

  describe("missing token", () => {
    beforeEach(() => {
      cy.visit("/reset-password");
    });

    it("shows an error message when the token is missing", () => {
      cy.findByLabelText("New password").type("password1");
      cy.findByLabelText("Confirmation password").type("password1");
      cy.findByRole("button", { name: "Change password" }).click();

      cy.get(".error-box")
        .should("have.focus")
        .and("contain.text", "The token is missing");
    });
  });

  describe("valid token", () => {
    beforeEach(() => {
      cy.visit("/reset-password?token=1");
    });

    it("shows a success message and allows to login when the token is valid", () => {
      cy.findByLabelText("New password").type("password1");
      cy.findByLabelText("Confirmation password").type("password1");
      cy.findByRole("button", { name: "Change password" }).click();

      cy.get(".success-box")
        .should("have.focus")
        .and(
          "contain.text",
          "The password has been successfully reset. You can now connect."
        );

      // Connect the person with a changed password
      cy.visit("/signin");
      cy.findByLabelText("Email").type("john.doe@gmail.com");
      cy.findByLabelText("Password").type("password1");
      cy.findByRole("button", { name: "Sign in" }).click();
      cy.findByText("Project from seeding").should("be.visible");

      // Connect with a user that has NOT changed their password
      cy.visit("/signin");
      cy.findByLabelText("Email").type("marvin.frachet@gmail.com");
      cy.findByLabelText("Password").type("password");
      cy.findByRole("button", { name: "Sign in" }).click();
      cy.findByText("Project from seeding").should("be.visible");
    });
  });
});
