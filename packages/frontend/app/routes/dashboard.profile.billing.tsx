import { V2_MetaFunction } from "@remix-run/node";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { PageTitle } from "~/components/PageTitle";
import { UserMenu } from "~/modules/user/components/UserMenu";
import { useUser } from "~/modules/user/contexts/useUser";

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "Progressively | Profile | Billing",
    },
  ];
};

export default function ProfilePage() {
  const { user } = useUser();

  return (
    <DashboardLayout user={user} subNav={<UserMenu />}>
      <PageTitle value="Billing" />
    </DashboardLayout>
  );
}
