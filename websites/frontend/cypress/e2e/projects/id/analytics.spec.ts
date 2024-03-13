describe("/dashboard/projects/[id]/analytics", () => {
  before(() => cy.seed({ eventCount: 90 }));
  after(cy.cleanupDb);

  describe("general verifications", () => {
    describe("not authenticated", () => {
      beforeEach(() => {
        cy.visit("/dashboard/projects/1/analytics");
      });

      it("checks that the route is protected", () => {
        cy.checkUnauthenticatedRoute();
      });
    });

    describe("authenticated", () => {
      describe("user: Jane", () => {
        beforeEach(() => {
          cy.signIn("Jane");
          cy.visit("/dashboard/projects/1/analytics", {
            failOnStatusCode: false,
          });
        });

        it("shouldnt show anything when Jane tries to visit Marvin s project", () => {
          cy.checkProtectedRoute();
        });
      });

      describe("user: Marvin", () => {
        beforeEach(() => {
          cy.signIn("Marvin");
          cy.visit("/dashboard/projects/1/analytics");
          cy.injectAxe();
        });

        it("shows the layout of the page", () => {
          cy.title().should(
            "eq",
            "Progressively | Project from seeding | Analytics"
          );

          cy.findByRole("heading", { name: "Analytics" }).should("be.visible");
          cy.findByRole("heading", { name: "Page views over time." }).should(
            "be.visible"
          );
          cy.findByRole("heading", { name: "Page views / browser" }).should(
            "be.visible"
          );
          cy.findByRole("heading", { name: "Page views / Os" }).should(
            "be.visible"
          );
          cy.findByRole("heading", {
            name: "Page views / Viewport (Width x Height)",
          }).should("be.visible");
          cy.findByRole("heading", { name: "Page views / referer" }).should(
            "be.visible"
          );
          cy.findByRole("heading", { name: "Page views / URL" }).should(
            "be.visible"
          );

          cy.findByRole("heading", { name: "Other metrics over time." }).should(
            "be.visible"
          );
        });
      });
    });
  });

  describe.only("general verifications", () => {
    beforeEach(() => {
      cy.signIn("Marvin");
    });

    it("shows the data for the 7 days period", () => {
      cy.visit("/dashboard/projects/1/analytics?days=7");

      cy.get("dl")
        .first()
        .within(() => {
          cy.get("dt").should("contain", "Page views");
          cy.get("dd").should("contain", "462 visits");
        });

      cy.get("dl")
        .eq(1)
        .within(() => {
          cy.get("dt").should("contain", "Unique visitors");
          cy.get("dd").should("contain", "2 users.");
        });

      cy.get("dl")
        .eq(2)
        .within(() => {
          cy.get("dt").should("contain", "Bounce Rate");
          cy.get("dd").should("contain", "50 %");
        });
    });

    it("shows the data for the 30 days period", () => {
      cy.visit("/dashboard/projects/1/analytics?days=30");

      cy.get("dl")
        .first()
        .within(() => {
          cy.get("dt").should("contain", "Page views");
          cy.get("dd").should("contain", "1.7K visits.");
        });

      cy.get("dl")
        .eq(1)
        .within(() => {
          cy.get("dt").should("contain", "Unique visitors");
          cy.get("dd").should("contain", "2 users.");
        });

      cy.get("dl")
        .eq(2)
        .within(() => {
          cy.get("dt").should("contain", "Bounce Rate");
          cy.get("dd").should("contain", "50 %");
        });
    });

    it("shows the data for the 90 days period", () => {
      cy.visit("/dashboard/projects/1/analytics?days=90");

      cy.get("dl")
        .first()
        .within(() => {
          cy.get("dt").should("contain", "Page views");
          cy.get("dd").should("contain", "3.1K visits.");
        });

      cy.get("dl")
        .eq(1)
        .within(() => {
          cy.get("dt").should("contain", "Unique visitors");
          cy.get("dd").should("contain", "2 users.");
        });

      cy.get("dl")
        .eq(2)
        .within(() => {
          cy.get("dt").should("contain", "Bounce Rate");
          cy.get("dd").should("contain", "50 %");
        });
    });
  });
});
