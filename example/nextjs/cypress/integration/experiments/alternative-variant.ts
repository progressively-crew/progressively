describe("/experiments/alternative-variant", () => {
  beforeEach(cy.seed);
  afterEach(cy.cleanup);

  beforeEach(() => {
    cy.visit("/experiments/alternative-variant");
  });

  it("shows the alternative A/B experiment for newHomepageExperiment", () => {
    cy.findByText("newHomepageExperiment: alternative").should("be.visible");
  });
});
