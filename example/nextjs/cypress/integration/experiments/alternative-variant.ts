describe("/experiments/alternative-variant", () => {
  beforeEach(cy.seed);
  afterEach(cy.cleanup);

  beforeEach(() => {
    cy.visit("/experiments/alternative-variant");
  });

  it("shows the alternative A/B experiment for newHomepageExperiment", () => {
    cy.findByText("newHomepageExperiment: alternative").should("be.visible");

    cy.changeExperimentStatus("1", "1", "NOT_ACTIVATED");

    // Verify the activation using sockets
    cy.findByText("newHomepageExperiment: control").should("be.visible");

    // Verify the activation using SSR
    cy.reload();
    cy.findByText("newHomepageExperiment: control").should("be.visible");
  });
});
