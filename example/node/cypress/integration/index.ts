import { FlagStatus } from "../../../../packages/backend/src/flags/flags.status";

describe("/", () => {
  beforeEach(cy.seed);
  afterEach(cy.cleanup);

  beforeEach(() => {
    cy.visit("/");
  });

  it("shows the old variant when the flag is not activated", () => {
    cy.findByText("Old variant").should("be.visible");
    cy.findByText("New variant").should("not.exist");
  });

  it("shows the new variant when the flag is activated for homepage", () => {
    cy.changeFlagStatus("1", "1", FlagStatus.ACTIVATED);

    // Verify the activation using SSR
    cy.reload();
    cy.findByText("Old variant").should("not.exist");
    cy.findByText("New variant").should("be.visible");
  });
});
