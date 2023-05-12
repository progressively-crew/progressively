export interface Plan {
  uuid: string;
  createdAt: string;
  environmentCount: number;
  evaluationCount: number;
  projectCount: number;
}

export interface BillingInfo {
  plans: Array<Plan>;
  activePlan?: Plan;
  remainingTrialingDays: number;
}
