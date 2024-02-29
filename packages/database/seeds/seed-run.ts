import { setupClickhouse } from "../scripts/setup-clickhouse";
import { seedEvents } from "./events";
import { seedDb } from "./seed";

const createClickhouseDb = async () => {
  await setupClickhouse();
  await seedEvents();
};

Promise.all([seedDb({ loadEvents: true }), createClickhouseDb()]).then(() => {
  console.log("Seed finished");
});
