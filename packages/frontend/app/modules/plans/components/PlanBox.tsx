import { PlanType } from "@progressively/shared";
import { TipBox } from "~/components/Boxes/TipBox";

export interface PlanBoxProps {
  plan: PlanType;
}

export const PlanBox = ({ plan }: PlanBoxProps) => {
  if (plan === "Trialing") {
    return (
      <TipBox title={"Free trial"}>
        You've chose to start with the free trial. You'll have a 14 days free
        period. Enjoy!
      </TipBox>
    );
  }

  if (plan === "Pro") {
    return <TipBox title={"Starting your free trial"}>Hello world</TipBox>;
  }

  if (plan === "Standard") {
    return <TipBox title={"Starting your free trial"}>Hello world</TipBox>;
  }

  return null;
};
