import { cleanupDb, seedDb } from "../../packages/backend/test/helpers/seed";
import { authenticate } from "../../packages/backend/test/helpers/authenticate";

export const tasks = () => ({
  seed: () => {
    return seedDb().then(() => null);
  },
  cleanup: () => {
    return cleanupDb().then(() => null);
  },
  authenticate: () => authenticate().then((x) => x),
});
