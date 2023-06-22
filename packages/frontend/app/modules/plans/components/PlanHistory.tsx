import { Entity } from "~/components/Entity/Entity";
import { EntityField } from "~/components/Entity/EntityField";
import { Plan } from "../types";
import { useEffect, useState } from "react";

export interface PlanHistoryProps {
  plans: Array<Plan>;
  activePlan?: Plan;
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
        name="Events/month"
        value={<strong>{plan.evaluationCount}</strong>}
      />
    </Entity>
  );
};

export const PlanHistory = ({ plans, activePlan }: PlanHistoryProps) => {
  return (
    <div>
      {activePlan && (
        <div className="bg-gray-100 my-2 border-l-4 border-gray-500 dark:bg-slate-700">
          <PlanHistoryEntry plan={activePlan} />
        </div>
      )}

      {plans.map((plan) => (
        <PlanHistoryEntry key={plan.uuid} plan={plan} />
      ))}
    </div>
  );
};
