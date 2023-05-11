import { LoaderFunction, V2_MetaFunction } from "@remix-run/node";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { PageTitle } from "~/components/PageTitle";
import { UserMenu } from "~/modules/user/components/UserMenu";
import { useUser } from "~/modules/user/contexts/useUser";
import { Plan } from "~/modules/plans/types";
import { getSession } from "~/sessions";
import { getBillingInfo } from "~/modules/plans/services/getBillingInfo";
import { useLoaderData } from "@remix-run/react";
import { Section, SectionHeader } from "~/components/Section";
import { Card, CardContent } from "~/components/Card";
import { PricingCalculator } from "~/modules/plans/components/PricingCalculator";
import { PlanHistory } from "~/modules/plans/components/PlanHistory";
import { TipBox } from "~/components/Boxes/TipBox";
import { Button } from "~/components/Buttons/Button";
import { useIsSaas } from "~/modules/saas/contexts/useIsSaas";

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "Progressively | Profile | Billing",
    },
  ];
};

interface LoaderData {
  plans: Array<Plan>;
  activePlan?: Plan;
  remainingTrialingDays: number;
}

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const billingInfo: LoaderData = await getBillingInfo(authCookie);

  return billingInfo;
};

export default function ProfilePage() {
  const { user } = useUser();
  const { plans, activePlan, remainingTrialingDays } =
    useLoaderData<LoaderData>();

  return (
    <DashboardLayout user={user} subNav={<UserMenu />}>
      <PageTitle value="Billing" />

      <Card footer={<Button href="/">Adjust plan</Button>}>
        <CardContent>
          <Section id="active-plan">
            <SectionHeader
              title={"Active plan"}
              description={
                activePlan &&
                "This is what you are actually paying per month. You can quickly adjust using the sliders below to fit your audience needs."
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
                initialProjectCount={activePlan?.projectCount || 1}
                initialEnvCount={activePlan?.environmentCount || 1}
                initialEvaluationCount={activePlan?.evaluationCount || 10_000}
              />
            </div>
          </Section>
        </CardContent>
      </Card>

      {plans.length > 0 && (
        <Card>
          <CardContent>
            <Section id="passed-plan">
              <SectionHeader
                title={"Passed plans"}
                description="These are the plans you used to subscribe to in the past."
              />

              <PlanHistory plans={plans} />
            </Section>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
}
