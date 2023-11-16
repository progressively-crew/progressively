const { defineConfig } = require("cypress");
const { cleanupDb, seedDb } = require("@progressively/database/seed");

module.exports = defineConfig({
  viewportWidth: 1400,
  viewportHeight: 800,
  e2e: {
    baseUrl: "http://localhost:3000",
    video: false,
    projectId: "kfytzc",
    specPattern: "cypress/e2e/**/*.spec.{ts,tsx}",

    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser, launchOptions) => {
        const REDUCE = 1;
        if (browser.family === "firefox") {
          launchOptions.preferences["ui.prefersReducedMotion"] = REDUCE;
        }

        if (browser.family === "chromium") {
          launchOptions.args.push("--force-prefers-reduced-motion");
        }

        return launchOptions;
      }),
        on("task", {
          seed: () => {
            return seedDb().then(() => null);
          },
          cleanupDb: () => {
            return cleanupDb().then(() => null);
          },
        });
    },
  },
});
