import { createCookie } from "@remix-run/node";

export const progressivelyCookie = createCookie("progressively-id", {
  maxAge: 31_536_000, // one year
});
