import { ActionFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { AiOutlineAppstore } from "react-icons/ai";
import { FiFlag } from "react-icons/fi";
import { BreadCrumbs } from "~/components/Breadcrumbs";
import { Crumbs } from "~/components/Breadcrumbs/types";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { Card } from "~/components/Card";
import { EmptyState } from "~/components/EmptyState";
import { Header } from "~/components/Header";
import { Section, SectionHeader } from "~/components/Section";
import { TagLine } from "~/components/Tagline";
import { Typography } from "~/components/Typography";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { FlagMenu } from "~/modules/flags/components/FlagMenu";
import { ToggleFlag } from "~/modules/flags/components/ToggleFlag";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { activateFlag } from "~/modules/flags/services/activateFlag";
import { changePercentageFlag } from "~/modules/flags/services/changePercentageFlag";
import { getFlagMetaTitle } from "~/modules/flags/services/getFlagMetaTitle";
import { FlagStatus } from "~/modules/flags/types";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useUser } from "~/modules/user/contexts/useUser";
import { VariantList } from "~/modules/variants/components/VariantList";
import { getVariants } from "~/modules/variants/services/getVariants";
import { Variant } from "~/modules/variants/types";
import { getSession } from "~/sessions";

export const meta: MetaFunction = ({ parentsData, params }) => {
  const projectName = getProjectMetaTitle(parentsData);
  const envName = getEnvMetaTitle(parentsData, params.env);
  const flagName = getFlagMetaTitle(parentsData);

  return {
    title: `Progressively | ${projectName} | ${envName} | Flags | ${flagName} | Variants`,
  };
};

interface LoaderData {
  variants: Array<Variant>;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const variants: Array<Variant> = await getVariants(
    params.env!,
    params.flagId!,
    authCookie
  );

  return {
    variants,
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
  const { variants } = useLoaderData<LoaderData>();

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

  const hasVariants = variants.length > 0;

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
          action={
            hasVariants && (
              <CreateButton
                to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/variants/create`}
              >
                Create a variant
              </CreateButton>
            )
          }
        />

        {!hasVariants && (
          <EmptyState
            title="No variants found"
            description={
              <Typography>
                There are no variants found for this flag.
              </Typography>
            }
            action={
              <CreateButton
                to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/variants/create`}
              >
                Create a variant
              </CreateButton>
            }
          />
        )}

        {hasVariants && (
          <Card>
            <VariantList
              variants={variants}
              projectId={project.uuid}
              envId={environment.uuid}
              flagId={currentFlag.uuid}
            />
          </Card>
        )}
      </Section>
    </DashboardLayout>
  );
}
