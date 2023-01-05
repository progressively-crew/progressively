import { FlagStatus } from "../../../packages/backend/src/flags/flags.status";

describe("/anonymous", () => {
  beforeEach(cy.seed);

  afterEach(() => {
    cy.wait(500);
    cy.cleanup();
  });

  beforeEach(() => {
    cy.visit("/anonymous");
  });

  it("shows the old variant when the flag is not activated", () => {
    // The footer flag is activated by default in the seeding data
    // but only for users with 'id' 1 which is
    // marvin.frachet@something.com in the seeding data
    cy.findByText("Old variant").should("be.visible");
    cy.findByText("Old footer").should("be.visible");
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

  it("uses the same cookie for anonymous users after page reload", () => {
    // Refreshing 3 times to "make sure" it's consistent
    cy.getCookie("progressively-id").then((previousCookie) => {
      cy.reload();

      cy.getCookie("progressively-id").then((nextCookie) => {
        expect(previousCookie.value).to.equal(nextCookie.value);
      });

      cy.reload();

      cy.getCookie("progressively-id").then((nextCookie) => {
        expect(previousCookie.value).to.equal(nextCookie.value);
      });

      cy.reload();

      cy.getCookie("progressively-id").then((nextCookie) => {
        expect(previousCookie.value).to.equal(nextCookie.value);
      });
    });
  });
});
