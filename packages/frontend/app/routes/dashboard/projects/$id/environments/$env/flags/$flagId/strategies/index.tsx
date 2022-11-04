import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { MdAppRegistration } from "react-icons/md";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { Card, CardContent } from "~/components/Card";
import { EmptyState } from "~/components/EmptyState";
import { Header } from "~/components/Header";
import { FlagIcon } from "~/components/Icons/FlagIcon";
import { PageTitle } from "~/components/PageTitle";
import { Section } from "~/components/Section";
import { TagLine } from "~/components/Tagline";
import { Typography } from "~/components/Typography";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { FlagMenu } from "~/modules/flags/components/FlagMenu";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { getFlagMetaTitle } from "~/modules/flags/services/getFlagMetaTitle";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { StrategyList } from "~/modules/strategies/components/StrategyList";
import { getStrategies } from "~/modules/strategies/services/getStrategies";
import { StrategyRetrieveDTO } from "~/modules/strategies/types";
import { useUser } from "~/modules/user/contexts/useUser";
import { getSession } from "~/sessions";

export const meta: MetaFunction = ({ parentsData, params }) => {
  const projectName = getProjectMetaTitle(parentsData);
  const envName = getEnvMetaTitle(parentsData, params.env);
  const flagName = getFlagMetaTitle(parentsData);

  return {
    title: `Progressively | ${projectName} | ${envName} | Flags | ${flagName} | Strategies`,
  };
};

interface LoaderData {
  strategies: Array<StrategyRetrieveDTO>;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const strategies: Array<StrategyRetrieveDTO> = await getStrategies(
    params.env!,
    params.flagId!,
    authCookie
  );

  return {
    strategies,
  };
};

export default function Strategies() {
  const [searchParams] = useSearchParams();
  const { user } = useUser();
  const { project } = useProject();
  const { environment } = useEnvironment();
  const { flagEnv } = useFlagEnv();

  const isStrategyAdded = searchParams.get("newStrategy") || undefined;
  const isStrategyUpdated = searchParams.get("strategyUpdated") || undefined;
  const isStrategyRemoved = searchParams.get("stratRemoved") || undefined;

  const { strategies } = useLoaderData<LoaderData>();

  const currentFlag = flagEnv.flag;

  const hasStrategies = strategies.length > 0;

  return (
    <DashboardLayout
      user={user}
      header={
        <Header
          tagline={<TagLine icon={<FlagIcon />}>FEATURE FLAG</TagLine>}
          title={currentFlag.name}
        />
      }
      subNav={
        <FlagMenu
          projectId={project.uuid}
          envId={environment.uuid}
          flagId={currentFlag.uuid}
        />
      }
      status={
        isStrategyUpdated ? (
          <SuccessBox id="strategy-updated">
            The strategy has been successfully updated.
          </SuccessBox>
        ) : isStrategyAdded ? (
          <SuccessBox id="strategy-added">
            The strategy has been successfully created.
          </SuccessBox>
        ) : isStrategyRemoved ? (
          <SuccessBox id="strategy-removed">
            The strategy has been successfully removed.
          </SuccessBox>
        ) : null
      }
    >
      <PageTitle
        value="Strategies"
        icon={<MdAppRegistration />}
        description={
          <Typography>
            The strategies applies to your audience when they request feature
            flags.
          </Typography>
        }
        action={
          hasStrategies && (
            <CreateButton
              to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/strategies/create`}
            >
              Create a strategy
            </CreateButton>
          )
        }
      />

      <Section aria-label="List of strategies">
        {!hasStrategies && (
          <Card>
            <CardContent>
              <EmptyState
                titleAs="h2"
                title="No strategies found"
                description={
                  <Typography>
                    There are no strategies for this flag.
                  </Typography>
                }
                action={
                  <CreateButton
                    to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/strategies/create`}
                  >
                    Create a strategy
                  </CreateButton>
                }
              />
            </CardContent>
          </Card>
        )}

        {hasStrategies && (
          <Card>
            <StrategyList
              strategies={strategies}
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
