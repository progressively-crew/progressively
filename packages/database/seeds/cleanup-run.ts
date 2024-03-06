import { cleanupDb } from "./seed";

cleanupDb().then(() => {
  console.log("[Postgres] Cleanup finished");
});
