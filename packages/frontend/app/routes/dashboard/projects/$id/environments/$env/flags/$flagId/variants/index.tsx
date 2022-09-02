import { BreadCrumbs } from "~/components/Breadcrumbs";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { FlagStatus } from "~/modules/flags/types";
import { getSession } from "~/sessions";
import { Header } from "~/components/Header";
import { Section, SectionHeader } from "~/components/Section";
import { ToggleFlag } from "~/modules/flags/components/ToggleFlag";
import { Crumbs } from "~/components/Breadcrumbs/types";
import { MetaFunction, ActionFunction } from "@remix-run/node";
import { TagLine } from "~/components/Tagline";
import { FiFlag } from "react-icons/fi";
import { FlagMenu } from "~/modules/flags/components/FlagMenu";
import { changePercentageFlag } from "~/modules/flags/services/changePercentageFlag";
import { activateFlag } from "~/modules/flags/services/activateFlag";
import { AiOutlineAppstore } from "react-icons/ai";
import { Typography } from "~/components/Typography";
import { EmptyState } from "~/components/EmptyState";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { useUser } from "~/modules/user/contexts/useUser";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { getFlagMetaTitle } from "~/modules/flags/services/getFlagMetaTitle";

export const meta: MetaFunction = ({ parentsData, params }) => {
  const projectName = getProjectMetaTitle(parentsData);
  const envName = getEnvMetaTitle(parentsData, params.env);
  const flagName = getFlagMetaTitle(parentsData);

  return {
    title: `Progressively | ${projectName} | ${envName} | Flags | ${flagName} | Variants`,
  };
};

type ActionDataType = null | { successChangePercentage: boolean };

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<ActionDataType> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");
  const flagId = params.flagId;
  const formData = await request.formData();
  const type = formData.get("_type");

  if (type === "percentage") {
    const rolloutPercentage = formData.get("rolloutPercentage");

    if (
      rolloutPercentage !== undefined &&
      rolloutPercentage !== null &&
      flagId
    ) {
      await changePercentageFlag(
        params.env!,
        flagId as string,
        Number(rolloutPercentage),
        authCookie
      );

      return { successChangePercentage: true };
    }
  }

  const nextStatus = formData.get("nextStatus");

  if (nextStatus && flagId) {
    await activateFlag(
      params.env!,
      flagId as string,
      nextStatus as FlagStatus,
      authCookie
    );
  }

  return null;
};

export default function VariantsOfFlag() {
  const { user } = useUser();
  const { project } = useProject();
  const { environment } = useEnvironment();
  const { flagEnv } = useFlagEnv();

  const currentFlag = flagEnv.flag;

  const isFlagActivated = flagEnv.status === FlagStatus.ACTIVATED;

  const crumbs: Crumbs = [
    {
      link: "/dashboard",
      label: "Projects",
    },
    {
      link: `/dashboard/projects/${project.uuid}`,
      label: project.name,
    },
    {
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags`,
      label: environment.name,
    },
    {
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/variants`,
      label: currentFlag.name,
    },
  ];

  return (
    <DashboardLayout
      user={user}
      breadcrumb={<BreadCrumbs crumbs={crumbs} />}
      header={
        <Header
          tagline={<TagLine icon={<FiFlag />}>FEATURE FLAG</TagLine>}
          title={currentFlag.name}
          startAction={<ToggleFlag isFlagActivated={isFlagActivated} />}
        />
      }
      subNav={
        <FlagMenu
          projectId={project.uuid}
          envId={environment.uuid}
          flagId={currentFlag.uuid}
        />
      }
    >
      <Section id="variants">
        <SectionHeader
          title="Variants"
          icon={<AiOutlineAppstore />}
          description={
            <Typography>The variants of the feature flag.</Typography>
          }
        />

        <EmptyState
          title="No variants found"
          description={
            <Typography>There are no variants found for this flag.</Typography>
          }
          action={
            <CreateButton
              to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/variants/create`}
            >
              Create a variant
            </CreateButton>
          }
        />
      </Section>
    </DashboardLayout>
  );
}
