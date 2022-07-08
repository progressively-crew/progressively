describe("/experiments/control-variant", () => {
  beforeEach(cy.seed);
  afterEach(cy.cleanup);

  beforeEach(() => {
    cy.visit("/experiments/control-variant");
  });

  it("shows the control A/B experiment for newHomepageExperiment", () => {
    cy.findByText("newHomepageExperiment: control").should("be.visible");
  });
});
