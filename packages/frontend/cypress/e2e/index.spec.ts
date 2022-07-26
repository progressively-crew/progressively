import { progressivelyApiMocks } from "../../app/mocks/data";

describe("/", () => {
  beforeEach(() => {
    progressivelyApiMocks.forEach((route) => {
      cy.intercept("GET", `${route.host}${route.path}`, {
        statusCode: 200,
        body: route.body,
      });
    });
  });

  beforeEach(() => {
    cy.visit("/");
    cy.injectAxe();
  });

  it("shoots axe on homepage", () => {
    cy.findByText("Documentation").should("not.exist");
    cy.checkA11y();
  });
});
