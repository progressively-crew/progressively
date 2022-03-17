describe("/signin", () => {
  before(cy.seed);
  after(cy.cleanup);

  beforeEach(() => {
    cy.visit("/signin");
    cy.injectAxe();
  });

  it("checks the page title", () => {
    cy.title().should("eq", "Rollout | Sign in");
  });

  it("gives feedbacks when the email is invalid (formatting level)", () => {
    cy.findByLabelText("Email").type("invalid@email");
    cy.contains("Sign in").click();

    cy.findByText(
      'The provided email address is not valid. It should look like "jane.doe@domain.com".'
    );
  });

  it("gives feedbacks when the password is not long enough", () => {
    cy.findByLabelText("Password").type("1");
    cy.contains("Sign in").click();

    cy.findByText(
      "The provided password is too short. It should be at least 8 characters."
    );
  });

  it("gives feedbacks when the required fields are not filled", () => {
    cy.contains("Sign in").click();

    cy.findByText("The email field is required.").should("be.visible");

    cy.findByText("The password field is required.").should("be.visible");

    cy.findByRole("button", { name: "Sign in" }).should("be.visible");
    // Testing the contrast of the FieldError color
    cy.checkA11y();
  });

  it("gives a visual feedback indicating the request is pending and an error feedback when something went wrong", () => {
    cy.findByLabelText("Email").type("a-valid-email@domain.com");
    cy.findByLabelText("Password").type("12345678901112");

    cy.contains("Sign in").click();

    cy.findByText("Woops! Looks the credentials are not valid.")
      .parent()
      .parent()
      .should("have.focus");

    cy.findByRole("button", { name: "Sign in" })
      .should("be.visible")
      .and("not.have.property", "disabled");

    // Verifying the contrast of the error content
    cy.checkA11y();
  });

  it("redirects to the /dashboard page when authentication succeeds", () => {
    cy.signIn("Marvin");
    cy.visit("dashboard");
    cy.url().should("contain", "/dashboard");
  });
});
