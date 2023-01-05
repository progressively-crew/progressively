import { defineConfig } from "cypress";
import { tasks } from "@progressively/cypress-helpers/tasks";

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      on("task", tasks());
    },
  },
});
