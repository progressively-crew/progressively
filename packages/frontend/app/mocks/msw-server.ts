import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);
console.info("[Server] MSW initialised");
