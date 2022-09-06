import { BreadCrumbs } from "~/components/Breadcrumbs";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { FlagStatus } from "~/modules/flags/types";
import { getStrategies } from "~/modules/strategies/services/getStrategies";
import { getSession } from "~/sessions";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { StrategyRetrieveDTO } from "~/modules/strategies/types";
import { Header } from "~/components/Header";
import { Section, SectionHeader } from "~/components/Section";
import { EmptyState } from "~/components/EmptyState";
import { FaPowerOff } from "react-icons/fa";
import { ToggleFlag } from "~/modules/flags/components/ToggleFlag";
import { Typography } from "~/components/Typography";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { Crumbs } from "~/components/Breadcrumbs/types";
import { MetaFunction, ActionFunction, LoaderFunction } from "@remix-run/node";
import { useSearchParams, useLoaderData, useActionData } from "@remix-run/react";
import { TagLine } from "~/components/Tagline";
import { FiFlag } from "react-icons/fi";
import { StrategyList } from "~/modules/strategies/components/StrategyList";
import { Card, CardContent } from "~/components/Card";
import { Stack } from "~/components/Stack";
import { FlagMenu } from "~/modules/flags/components/FlagMenu";
import { StrategyDescription } from "~/modules/strategies/components/StrategyDescription";
import { SliderFlag } from "~/modules/flags/components/SliderFlag";
import { changePercentageFlag } from "~/modules/flags/services/changePercentageFlag";
import { useProject } from "~/modules/projects/contexts/useProject";
import { useUser } from "~/modules/user/contexts/useUser";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { getFlagMetaTitle } from "~/modules/flags/services/getFlagMetaTitle";
import { Heading } from "~/components/Heading";
import { Tag } from "~/components/Tag";
import { toggleFlagAction } from "~/modules/flags/form-actions/toggleFlagAction";
import { VariantList, VariantListModes } from "~/modules/variants/components/VariantList";
import { editVariantAction } from "~/modules/variants/form-actions/editVariantAction";

export const meta: MetaFunction = ({ parentsData, params }) => {
  const projectName = getProjectMetaTitle(parentsData);
  const envName = getEnvMetaTitle(parentsData, params.env);
  const flagName = getFlagMetaTitle(parentsData);

  return {
    title: `Progressively | ${projectName} | ${envName} | Flags | ${flagName}`,
  };
};

type ActionDataType = null | { successChangePercentage: boolean; successEdit?: boolean };

export const action: ActionFunction = async ({ request, params }): Promise<ActionDataType> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");
  const flagId = params.flagId;
  const formData = await request.formData();
  const type = formData.get("_type");

  if (type === "percentage") {
    const rolloutPercentage = formData.get("rolloutPercentage");

    if (rolloutPercentage !== undefined && rolloutPercentage !== null && flagId) {
      await changePercentageFlag(
        params.env!,
        flagId as string,
        Number(rolloutPercentage),
        authCookie
      );

      return { successChangePercentage: true };
    }
  }

  if (type === "edit-variant") {
    return editVariantAction(formData, params, authCookie);
  }

  if (type === "toggle-flag") {
    return toggleFlagAction(formData, params, authCookie);
  }

  return null;
};

interface LoaderData {
  strategies: Array<StrategyRetrieveDTO>;
}

export const loader: LoaderFunction = async ({ request, params }): Promise<LoaderData> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const strategies = await getStrategies(params.env!, params.flagId!, authCookie);

  return {
    strategies,
  };
};

export default function FlagById() {
  const [searchParams] = useSearchParams();
  const actionData = useActionData<ActionDataType>();
  const { project } = useProject();
  const { user } = useUser();
  const { environment } = useEnvironment();
  const { flagEnv } = useFlagEnv();

  const { strategies } = useLoaderData<LoaderData>();

  const isStrategyAdded = searchParams.get("newStrategy") || undefined;
  const isStrategyUpdated = searchParams.get("strategyUpdated") || undefined;
  const isStrategyRemoved = searchParams.get("stratRemoved") || undefined;
  const hasPercentageChanged = Boolean(actionData?.successChangePercentage);

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
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}`,
      label: currentFlag.name,
    },
  ];

  const hasStrategies = strategies.length > 0;
  const isMultiVariants = flagEnv.variants.length > 0;

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
        <FlagMenu projectId={project.uuid} envId={environment.uuid} flagId={currentFlag.uuid} />
      }
      status={
        isStrategyUpdated ? (
          <SuccessBox id="strategy-updated">The strategy has been successfully updated.</SuccessBox>
        ) : isStrategyAdded ? (
          <SuccessBox id="strategy-added">The strategy has been successfully created.</SuccessBox>
        ) : isStrategyRemoved ? (
          <SuccessBox id="strategy-removed">The strategy has been successfully removed.</SuccessBox>
        ) : hasPercentageChanged ? (
          <SuccessBox id="percentage-changed">Percentage adjusted.</SuccessBox>
        ) : actionData?.successEdit ? (
          <SuccessBox id="variant-edited">The variants have been edited created.</SuccessBox>
        ) : null
      }
    >
      <Stack spacing={8}>
        <Heading as={"h2"} fontSize="earth" icon={<FaPowerOff />}>
          Rollout details
        </Heading>

        <Section id="summup">
          <Card>
            <CardContent>
              <SectionHeader
                title="Sum-up"
                description={
                  <StrategyDescription
                    isFlagActivated={isFlagActivated}
                    hasStrategies={hasStrategies}
                    rolloutPercentage={flagEnv.rolloutPercentage}
                  />
                }
              />
            </CardContent>
          </Card>
        </Section>

        <Section id="rollout-target">
          <Card>
            <CardContent noBottom>
              <SectionHeader
                title="Percentage of the audience"
                description={
                  isMultiVariants ? (
                    <Typography>
                      These are the variants and their rollout percentage served to your users when
                      the flag is activated.
                    </Typography>
                  ) : (
                    <Typography>
                      This is the percentage of people that will receive the variant <Tag>true</Tag>{" "}
                      when the flag is activated.
                    </Typography>
                  )
                }
              />
            </CardContent>

            {isMultiVariants ? (
              <VariantList variants={flagEnv.variants} mode={VariantListModes.Operational} />
            ) : (
              <CardContent>
                <SliderFlag
                  labelledBy="rollout-target"
                  initialRolloutPercentage={flagEnv.rolloutPercentage}
                />
              </CardContent>
            )}
          </Card>
        </Section>

        <Section id="concerned-audience">
          <Card>
            <CardContent noBottom>
              <SectionHeader
                title="Strategies"
                action={
                  hasStrategies && (
                    <CreateButton
                      variant="secondary"
                      small
                      to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/strategies/create`}
                    >
                      Create a strategy
                    </CreateButton>
                  )
                }
              />
            </CardContent>

            {hasStrategies ? (
              <StrategyList
                strategies={strategies}
                projectId={project.uuid}
                envId={environment.uuid}
                flagId={currentFlag.uuid}
              />
            ) : (
              <EmptyState
                title="No strategy found"
                description={
                  <Typography>
                    There are no strategies bound to this flag yet. In this case, when the flag is
                    activated, every user will receive the {`"true"`} variant.
                  </Typography>
                }
                action={
                  <CreateButton
                    variant="secondary"
                    to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/strategies/create`}
                  >
                    Create a strategy
                  </CreateButton>
                }
              />
            )}
          </Card>
        </Section>
      </Stack>
    </DashboardLayout>
  );
}
