import { defineConfig } from "cypress";
import { tasks } from "./tasks";

console.log("lolx", process.env.PROJECT_ROOT);

const specPattern = `${process.env.PROJECT_ROOT}/e2e/**/*.{js,jsx,ts,tsx}`;

module.exports = defineConfig({
  e2e: {
    video: false,
    screenshotOnRunFailure: false,
    baseUrl: "http://localhost:3000",
    specPattern,
    setupNodeEvents(on, config) {
      on("task", tasks());
    },
  },
});
