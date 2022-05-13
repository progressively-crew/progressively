import { FlagStatus } from "../../../../packages/backend/src/flags/flags.status";

describe("/", () => {
  beforeEach(cy.seed);
  afterEach(cy.cleanup);

  beforeEach(() => {
    cy.visit("/");
  });

  it("shows the new variant when the flag is activated", () => {
    cy.changeFlagStatus("1", "1", FlagStatus.ACTIVATED);

    // Verify the activation using sockets
    cy.findByText("Old variant").should("not.exist");
    cy.findByText("New variant").should("be.visible");

    // Verify the activation using SSR
    cy.reload();
    cy.findByText("Old variant").should("not.exist");
    cy.findByText("New variant").should("be.visible");
  });

  it("shows the old variant when the flag is not activated", () => {
    cy.findByText("Old variant").should("be.visible");
    cy.findByText("New variant").should("not.exist");
  });
});
