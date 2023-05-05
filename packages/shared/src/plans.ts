export const Plans = {
  OpenSource: "OpenSource",
  Trialing: "Trialing",
  Standard: "Standard",
  Pro: "Pro",
};

export type PlansType = typeof Plans;
export type PlanType = keyof typeof Plans;
