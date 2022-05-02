import { FlagStatus } from "../../../../packages/backend/src/flags/flags.status";

describe("/", () => {
  beforeEach(cy.seed);
  afterEach(cy.cleanup);

  beforeEach(() => {
    cy.visit("/");
  });

  it("forwards the cookie from the backend, to nextjs server, to the client", () => {
    // 1 is the user id set in nextjs getServerSideProps
    cy.getCookie("progressively-id").should("have.property", "value", "1");
  });

  it("shows the old variant when the flag is not activated", () => {
    cy.findByText("Old variant").should("be.visible");
    cy.findByText("New variant").should("not.exist");

    cy.findByText("New footer").should("be.visible");
    cy.findByText("Old footer").should("not.exist");
  });

  it("shows the new variant when the flag is activated for homepage", () => {
    cy.changeFlagStatus("1", "1", FlagStatus.ACTIVATED);

    // Verify the activation using sockets
    cy.findByText("Old variant").should("not.exist");
    cy.findByText("New variant").should("be.visible");

    // Verify the activation using SSR
    cy.reload();
    cy.findByText("Old variant").should("not.exist");
    cy.findByText("New variant").should("be.visible");
  });

  it("shows the old variant when the flag is activated for footer (by default activated)", () => {
    cy.changeFlagStatus("1", "2", FlagStatus.NOT_ACTIVATED);

    // Verify the activation using sockets
    cy.findByText("New variant").should("not.exist");
    cy.findByText("Old variant").should("be.visible");

    // Verify the activation using SSR
    cy.reload();
    cy.findByText("New footer").should("not.exist");
    cy.findByText("Old footer").should("be.visible");
  });
});
