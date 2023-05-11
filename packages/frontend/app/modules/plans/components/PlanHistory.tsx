import { Entity } from "~/components/Entity/Entity";
import { EntityField } from "~/components/Entity/EntityField";
import { Plan } from "../types";
import { useEffect, useState } from "react";

export interface PlanHistoryProps {
  plans: Array<Plan>;
}

export interface PlanHistoryEntryProps {
  plan: Plan;
}

const PlanHistoryEntry = ({ plan }: PlanHistoryEntryProps) => {
  const [formatted, setFormatted] = useState("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat();
    const formattedDate = formatter.format(new Date(plan.createdAt));

    setFormatted(formattedDate);
  }, [plan.createdAt]);

  return (
    <Entity title={`Plan started the ${formatted}`}>
      <EntityField
        name="Number of projects"
        value={<strong>{plan.projectCount}</strong>}
      />
      <EntityField
        name="Number of environments/project"
        value={<strong>{plan.environmentCount}</strong>}
      />
      <EntityField
        name="Flag evaluations/month"
        value={<strong>{plan.evaluationCount}</strong>}
      />
    </Entity>
  );
};

export const PlanHistory = ({ plans }: PlanHistoryProps) => {
  return (
    <div>
      {plans.map((plan) => (
        <PlanHistoryEntry key={plan.uuid} plan={plan} />
      ))}
    </div>
  );
};
