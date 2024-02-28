import { cleanupEvents } from "../scripts/setup-clickhouse";
import { cleanupDb } from "./seed";

Promise.all([cleanupDb(), cleanupEvents()]).then(() => {
  console.log("Cleanup finished");
});
