import nock from "nock";
import { progressivelyApiMocks } from "./data";

export const startServer = () => {
  progressivelyApiMocks.forEach((route) => {
    nock(route.host).get(route.path).reply(200, route.body);
  });

  console.info("[Server] Mock initialized");
};
