import { Box, Text, Stack, HStack } from "@chakra-ui/react";
import { IoIosCreate } from "react-icons/io";
import {
  useLoaderData,
  LoaderFunction,
  MetaFunction,
  ActionFunction,
  useSearchParams,
} from "remix";
import { Crumbs, BreadCrumbs } from "~/components/AppBreadcrumbs";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { authGuard } from "~/modules/auth/auth-guard";
import { Environment } from "~/modules/environments/types";
import { getFlagsByProjectEnv } from "~/modules/flags/getFlagsByProjectEnv";
import { FlagEnv, FlagStatus } from "~/modules/flags/types";
import { getProject } from "~/modules/projects/getProject";
import { Project } from "~/modules/projects/types";
import { getStrategies } from "~/modules/strategies/getStrategies";
import { StrategyCard } from "~/modules/strategies/StrategyCard";
import { User } from "~/modules/user/types";
import { getSession } from "~/sessions";
import { SuccessBox } from "~/components/SuccessBox";
import { StrategyRetrieveDTO } from "~/modules/strategies/types";
import { WarningBox } from "~/components/WarningBox";
import { Header } from "~/components/Header";
import { Section, SectionHeader } from "~/components/Section";
import { EmptyState } from "~/components/EmptyState";
import { AiOutlineBarChart, AiOutlineSetting } from "react-icons/ai";
import { HorizontalNav, NavItem } from "~/components/HorizontalNav";
import { FaPowerOff } from "react-icons/fa";
import { Button } from "~/components/Button";
import { toggleAction, ToggleFlag } from "~/modules/flags/ToggleFlag";
import { ButtonCopy } from "~/components/ButtonCopy";
import { FiFlag } from "react-icons/fi";

interface MetaArgs {
  data: {
    project: Project;
    environment: Environment;
    currentFlagEnv: FlagEnv;
  };
}

export const meta: MetaFunction = ({ data }: MetaArgs) => {
  const project = data.project;
  const environment = data.environment;
  const currentFlag = data.currentFlagEnv.flag;

  return {
    title: `Progressively | ${project.name} | ${environment.name} | Flags | ${currentFlag.name}`,
  };
};

export const action: ActionFunction = ({ request, params }): Promise<null> => {
  return toggleAction({ request, params });
};

interface LoaderData {
  project: Project;
  environment: Environment;
  currentFlagEnv: FlagEnv;
  strategies: Array<StrategyRetrieveDTO>;
  user: User;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const user = await authGuard(request);

  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const project: Project = await getProject(params.id!, authCookie);

  const strategies = await getStrategies(
    params.env!,
    params.flagId!,
    authCookie
  );

  const flagsByEnv: Array<FlagEnv> = await getFlagsByProjectEnv(
    params.env!,
    authCookie
  );

  const environment = project.environments.find(
    (env) => env.uuid === params.env
  );

  const currentFlagEnv = flagsByEnv.find(
    (flagEnv) => flagEnv.flagId === params.flagId!
  )!;

  return {
    project,
    environment: environment!,
    currentFlagEnv,
    strategies,
    user,
  };
};

export default function FlagById() {
  const [searchParams] = useSearchParams();

  const { project, environment, currentFlagEnv, user, strategies } =
    useLoaderData<LoaderData>();

  const isStrategyAdded = searchParams.get("newStrategy") || undefined;
  const isStrategyRemoved = searchParams.get("stratRemoved") || undefined;

  const currentFlag = currentFlagEnv.flag;

  const isFlagActivated = currentFlagEnv.status === FlagStatus.ACTIVATED;

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

  return (
    <DashboardLayout
      user={user}
      breadcrumb={<BreadCrumbs crumbs={crumbs} />}
      header={
        <Header
          title={currentFlag.name}
          startAction={
            <HStack spacing={4}>
              <ButtonCopy icon={<FiFlag />} toCopy={currentFlag.key}>
                {currentFlag.key}
              </ButtonCopy>
              <ToggleFlag isFlagActivated={isFlagActivated} />
            </HStack>
          }
        />
      }
      subNav={
        <HorizontalNav label={`Flag related`}>
          <NavItem
            to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}`}
            icon={<FaPowerOff />}
          >
            Strategies
          </NavItem>

          <NavItem
            to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/insights`}
            icon={<AiOutlineBarChart />}
          >
            Insights
          </NavItem>

          <NavItem
            to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/settings`}
            icon={<AiOutlineSetting />}
          >
            Settings
          </NavItem>
        </HorizontalNav>
      }
    >
      <Stack spacing={8}>
        <Section id="concerned-audience">
          <SectionHeader
            title="Strategies"
            hiddenTitle
            endAction={
              strategies.length > 0 && (
                <Button
                  to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/strategies/create`}
                  leftIcon={<IoIosCreate aria-hidden />}
                  colorScheme="brand"
                >
                  Add a strategy
                </Button>
              )
            }
          />

          <Stack spacing={2}>
            {isStrategyAdded ? (
              <SuccessBox id="strategy-added" mb={4}>
                The strategy has been successfully created.
              </SuccessBox>
            ) : null}

            {isStrategyRemoved ? (
              <SuccessBox id="strategy-removed" mb={4}>
                The strategy has been successfully removed.
              </SuccessBox>
            ) : null}

            {strategies.length > 0 ? (
              <Box>
                {strategies.map((strat, index) => (
                  <StrategyCard
                    noBorder={index === 0}
                    key={`${strat.uuid}`}
                    projectId={project.uuid}
                    envId={environment.uuid}
                    flagId={currentFlag.uuid}
                    strat={strat}
                  />
                ))}
              </Box>
            ) : null}

            {strategies.length === 0 ? (
              <>
                <Box mb={8}>
                  <WarningBox title="You don't have strategies yet. When activating the flag, every user will receive the activated variant." />
                </Box>
                <EmptyState
                  title="No strategy found"
                  description={
                    <Text>There are no strategies bound to this flag yet.</Text>
                  }
                  action={
                    <Button
                      to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/strategies/create`}
                      leftIcon={<IoIosCreate aria-hidden />}
                      colorScheme="brand"
                    >
                      Add a strategy
                    </Button>
                  }
                />
              </>
            ) : null}
          </Stack>
        </Section>
      </Stack>
    </DashboardLayout>
  );
}
