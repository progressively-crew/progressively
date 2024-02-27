import { seedDb } from "./seed";

seedDb({ loadEvents: true }).then(() => {
  console.log("Seed finished");
});
