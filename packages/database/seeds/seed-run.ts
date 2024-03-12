import { seedDb } from "./seed";

seedDb().then(() => console.log("[Postgres] Seeded"));
