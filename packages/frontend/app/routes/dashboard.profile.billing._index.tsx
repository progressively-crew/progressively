import { V2_MetaFunction } from "@remix-run/node";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { PageTitle } from "~/components/PageTitle";
import { UserMenu } from "~/modules/user/components/UserMenu";
import { useUser } from "~/modules/user/contexts/useUser";
import { useSearchParams } from "@remix-run/react";
import { Section, SectionHeader } from "~/components/Section";
import { Card, CardContent } from "~/components/Card";
import { PricingCalculator } from "~/modules/plans/components/PricingCalculator";
import { PlanHistory } from "~/modules/plans/components/PlanHistory";
import { TipBox } from "~/components/Boxes/TipBox";
import { Button } from "~/components/Buttons/Button";
import { useState } from "react";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { useBillingInfo } from "~/modules/plans/hooks/useBillingInfo";

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "Progressively | Profile | Billing",
    },
  ];
};

export default function BillingPage() {
  const { user } = useUser();
  const [searchParams] = useSearchParams();
  const { plans, activePlan, remainingTrialingDays } = useBillingInfo();

  const [projectValue, setProjectValue] = useState(
    activePlan?.projectCount || 1
  );
  const [envValue, setEnvValue] = useState(activePlan?.environmentCount || 1);
  const [evaluationCount, setEvaluationCount] = useState(
    activePlan?.evaluationCount || 10_000
  );

  const isSuccessPlanCreate = searchParams.get("planCreated");

  return (
    <DashboardLayout
      user={user}
      subNav={<UserMenu />}
      status={
        isSuccessPlanCreate ? (
          <SuccessBox id={"plan-add-success"}>
            The plan has been successfully added.
          </SuccessBox>
        ) : null
      }
    >
      <PageTitle value="Billing" />

      <Card
        footer={
          <Button
            href={`/dashboard/profile/billing/upgrade?projectCount=${projectValue}&envCount=${envValue}&evalCount=${evaluationCount}`}
          >
            {activePlan ? "Adjust plan" : "Use this plan"}
          </Button>
        }
      >
        <CardContent>
          <Section id="active-plan">
            <SectionHeader
              title={"Active plan"}
              description={
                activePlan
                  ? "This is what you are actually paying per month. You can quickly adjust using the sliders below to fit your audience needs."
                  : "You don't seem to have a subscription yet. Use the calculator below to subscribe with a plan that fits your needs."
              }
            />

            {!activePlan && user.trialEnd && (
              <div className="pt-4">
                <TipBox title={"You are in a trialing period"}>
                  After{" "}
                  <strong>the remaining {remainingTrialingDays} days</strong> of
                  this trialing period, you will have to subscribe and use this
                  calculator.
                </TipBox>
              </div>
            )}

            <div className="pt-8">
              <PricingCalculator
                projectCount={projectValue}
                envCount={envValue}
                evaluationCount={evaluationCount}
                onProjectCountChange={setProjectValue}
                onEnvCountChange={setEnvValue}
                onEvalCountChange={setEvaluationCount}
              />
            </div>
          </Section>
        </CardContent>
      </Card>

      {activePlan && (
        <Card>
          <CardContent>
            <Section id="passed-plan">
              <SectionHeader
                title={"Passed plans"}
                description="These are the plans you used to subscribe to in the past."
              />

              <PlanHistory plans={plans} activePlan={activePlan} />
            </Section>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
}
