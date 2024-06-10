describe("/dashboard/projects/all", () => {
  before(cy.seed);
  after(cy.cleanupDb);

  describe("not authenticated", () => {
    beforeEach(() => {
      cy.visit("/dashboard/projects/all");
    });

    describe("not authenticated", () => {
      it("checks that the route is protected", () => {
        cy.checkUnauthenticatedRoute();
      });
    });
  });

  describe("authenticated", () => {
    describe("user: Marvin", () => {
      beforeEach(() => {
        cy.signIn("Marvin");
        cy.visit("/dashboard/projects/all");
        cy.injectAxe();
      });

      it("shows a list of project", () => {
        cy.title().should("eq", "Progressively | Projects list");
        cy.findByRole("heading", { name: "Projects" }).should("be.visible");

        cy.get("main").within(() => {
          cy.findByRole("link", { name: "Project from seeding" })
            .should("be.visible")
            .and("have.attr", "href", "/dashboard/projects/1/home");
        });

        cy.findByRole("link", { name: "Create a project" }).should(
          "have.attr",
          "href",
          "/dashboard/projects/all/create"
        );

        cy.contains("admin").should("be.visible");

        cy.checkA11y();
      });
    });

    describe("user: Joe", () => {
      beforeEach(() => {
        cy.signIn("Joe");
        cy.visit("/dashboard/projects/all");
      });

      it("shows the onboarding page", () => {
        cy.url().should("include", "/onboarding");
      });
    });
  });
});
