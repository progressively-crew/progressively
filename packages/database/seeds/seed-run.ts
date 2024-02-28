import { seedEvents } from "../scripts/setup-clickhouse";
import { seedDb } from "./seed";

Promise.all([seedDb({ loadEvents: true }), seedEvents()]).then(() => {
  console.log("Seed finished");
});
