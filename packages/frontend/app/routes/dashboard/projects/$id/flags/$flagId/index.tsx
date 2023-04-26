import { DashboardLayout } from "~/layouts/DashboardLayout";
import { MetaFunction } from "@remix-run/node";
import { useProject } from "~/modules/projects/contexts/useProject";
import { useUser } from "~/modules/user/contexts/useUser";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { getFlagMetaTitle } from "~/modules/flags/services/getFlagMetaTitle";
import { PageTitle } from "~/components/PageTitle";
import { FlagMenu } from "~/modules/flags/components/FlagMenu";
import { useFlag } from "~/modules/flags/contexts/useFlag";

export const meta: MetaFunction = ({ parentsData }) => {
  const projectName = getProjectMetaTitle(parentsData);
  const flagName = getFlagMetaTitle(parentsData);

  return {
    title: `Progressively | ${projectName} | ${flagName}`,
  };
};

export default function FlagSettingPage() {
  const { project } = useProject();
  const { user } = useUser();
  const { flag } = useFlag();

  return (
    <DashboardLayout
      user={user}
      subNav={<FlagMenu projectId={project.uuid} flag={flag} />}
    >
      <PageTitle value="Overview" />
    </DashboardLayout>
  );
}
