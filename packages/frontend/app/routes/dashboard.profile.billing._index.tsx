import { LoaderFunction, V2_MetaFunction } from "@remix-run/node";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { PageTitle } from "~/components/PageTitle";
import { UserMenu } from "~/modules/user/components/UserMenu";
import { useUser } from "~/modules/user/contexts/useUser";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { Section, SectionHeader } from "~/components/Section";
import { Card, CardContent } from "~/components/Card";
import { PricingCalculator } from "~/modules/plans/components/PricingCalculator";
import { PlanHistory } from "~/modules/plans/components/PlanHistory";
import { TipBox } from "~/components/Boxes/TipBox";
import { Button } from "~/components/Buttons/Button";
import { useState } from "react";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { useBillingInfo } from "~/modules/plans/hooks/useBillingInfo";
import { Progress } from "~/components/Progress";

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "Progressively | Profile | Billing",
    },
  ];
};

interface LoaderData {
  stripeCustomerPortal: string;
}

export const loader: LoaderFunction = () => {
  const stripeCustomerPortal = process.env.STRIPE_CUSTOMER_PORTAL;

  return {
    stripeCustomerPortal,
  };
};

export default function BillingPage() {
  const { user } = useUser();
  const { stripeCustomerPortal } = useLoaderData<LoaderData>();
  const [searchParams] = useSearchParams();
  const { plans, activePlan, remainingTrialingDays, hitsForMonth } =
    useBillingInfo();

  const [evaluationCount, setEvaluationCount] = useState(
    activePlan?.evaluationCount || 10_000
  );

  const isSuccessPlanCreate = searchParams.get("success") === "true";
  const isTrialing = Boolean(!activePlan && user.trialEnd);

  return (
    <DashboardLayout
      user={user}
      subNav={<UserMenu />}
      status={
        isSuccessPlanCreate ? (
          <SuccessBox id={"plan-add-success"}>
            We are processing your payment, it may take a few minutes.
          </SuccessBox>
        ) : null
      }
    >
      <PageTitle
        value="Billing"
        action={
          activePlan ? (
            <Button href={stripeCustomerPortal} variant="secondary">
              Manage stripe billing
            </Button>
          ) : null
        }
      />
      <Progress
        max={activePlan?.evaluationCount || 1000}
        value={hitsForMonth}
        label={"Evaluation count this month"}
      />

      <Card
        footer={
          <Button
            href={`/dashboard/profile/billing/upgrade?evalCount=${evaluationCount}`}
          >
            {activePlan ? "Adjust plan" : "Use this plan"}
          </Button>
        }
      >
        <CardContent>
          <Section id="active-plan">
            <SectionHeader
              title={isTrialing ? "Upgrading from trial" : "Active plan"}
              description={
                isTrialing
                  ? "You don't seem to have a subscription yet. Use the calculator below to subscribe with a plan that fits your needs."
                  : "This is what you are actually paying per month. You can quickly adjust using the sliders below to fit your audience needs."
              }
            />

            {isTrialing && (
              <div className="pt-4">
                <TipBox title={"You are in a trialing period"}>
                  After{" "}
                  <strong>the remaining {remainingTrialingDays} days</strong> of
                  this trialing period, you will have to subscribe and use this
                  calculator.
                </TipBox>
              </div>
            )}

            <div className="pt-8 pb-6">
              <PricingCalculator
                evaluationCount={evaluationCount}
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
