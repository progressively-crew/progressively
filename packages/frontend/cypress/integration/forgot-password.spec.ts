describe("/forgot-password", () => {
  before(cy.seed);
  after(cy.cleanup);

  beforeEach(() => {
    cy.visit("/forgot-password");
    cy.injectAxe();
  });

  it("checks the page layout", () => {
    cy.findByRole("heading", { name: "Password forgotten" }).should(
      "be.visible"
    );

    cy.findByText(
      "Enter your email to get a recovery link and reset your password."
    ).should("be.visible");

    cy.findByLabelText("Email").should("be.visible");

    cy.findByRole("button", { name: "Reset password" }).should("be.visible");

    cy.checkA11y();
  });

  it("shows an error message when the email is empty", () => {
    cy.findByRole("button", { name: "Reset password" }).click();

    cy.get(".error-box")
      .should("have.focus")
      .and("contain.text", "The email field is required.");

    cy.checkA11y();
  });
});
