import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
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
      });
    },
  },
});
