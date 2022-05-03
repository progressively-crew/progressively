describe("/welcome", () => {
  before(cy.seed);
  after(cy.cleanup);

  beforeEach(() => {
    cy.visit("/welcome");
    cy.injectAxe();
  });

  it("gives feedbacks when the email is invalid (formatting level)", () => {
    cy.findByLabelText("Email").type("invalid@email");
    cy.findByRole("button", { name: "Create an account" }).click();

    cy.get(".error-box")
      .should("have.focus")
      .and(
        "contain.text",
        'The provided email address is not valid. It should look like "jane.doe@domain.com".'
      );
  });

  it("gives feedbacks when the password is not long enough", () => {
    cy.findByLabelText("Password").type("1");
    cy.findByRole("button", { name: "Create an account" }).click();

    cy.get(".error-box")
      .should("have.focus")
      .and(
        "contain.text",
        "The provided password is too short. It should be at least 8 characters."
      );
  });

  it("gives feedbacks when the required fields are not filled", () => {
    cy.findByRole("button", { name: "Create an account" }).click();

    cy.get(".error-box")
      .should("have.focus")
      .and("contain.text", "The email field is required.")
      .and("contain.text", "The password field is required.")
      .and("contain.text", "The fullname field is required.")
      .and("contain.text", "The confirm password field is required.");

    // Testing the contrast of the FieldError color
    cy.checkA11y();
  });

  it("gives feedbacks when the two passwords are not identical", () => {
    cy.findByLabelText("Password").type("12345678901112");
    cy.findByLabelText("Confirm your password").type("aabcd");
    cy.findByRole("button", { name: "Create an account" }).click();

    cy.get(".error-box")
      .should("have.focus")
      .and("contain.text", "The two passwords are not the same.");

    // Testing the contrast of the FieldError color
    cy.checkA11y();
  });

  it("gives a visual feedback when the email is already taken", () => {
    cy.findByLabelText("Fullname").type("John Duff");
    cy.findByLabelText("Email").type("marvin.frachet@gmail.com");
    cy.findByLabelText("Password").type("12345678901112");
    cy.findByLabelText("Confirm your password").type("12345678901112");
    cy.findByRole("button", { name: "Create an account" }).click();

    cy.get(".error-box")
      .should("have.focus")
      .and("contain.text", "This email is already used.");

    // Verifying the contrast of the error content
    cy.checkA11y();
  });

  it("checks the page title", () => {
    cy.title().then((el) => {
      expect(el).to.eq("Progressively | Welcome");
    });
  });
});
