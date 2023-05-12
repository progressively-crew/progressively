export interface Plan {
  uuid: string;
  createdAt: string;
  evaluationCount: number;
}

export interface BillingInfo {
  plans: Array<Plan>;
  activePlan?: Plan;
  remainingTrialingDays: number;
}
