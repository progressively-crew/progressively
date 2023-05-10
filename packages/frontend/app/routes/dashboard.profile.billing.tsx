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
}

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const plans: Array<Plan> = await getBillingInfo(authCookie);
  const activePlan = plans.shift();

  return { plans, activePlan };
};

export default function ProfilePage() {
  const { user } = useUser();
  const { plans, activePlan } = useLoaderData<LoaderData>();

  return (
    <DashboardLayout user={user} subNav={<UserMenu />}>
      <PageTitle value="Billing" />

      <Card>
        <CardContent>
          <Section>
            <SectionHeader title={"Active plan"} />
          </Section>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Section>
            <SectionHeader title={"Passed plans"} />
          </Section>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
