import { Box, Text, Badge, Stack } from "@chakra-ui/react";
import { IoIosCreate } from "react-icons/io";
import {
  useLoaderData,
  LoaderFunction,
  MetaFunction,
  ActionFunction,
  Form,
  useSearchParams,
  useTransition,
} from "remix";
import { Crumbs, BreadCrumbs } from "~/components/AppBreadcrumbs";
import { ButtonCopy } from "~/components/ButtonCopy";
import { Switch } from "~/components/Switch";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { authGuard } from "~/modules/auth/auth-guard";
import { Environment } from "~/modules/environments/types";
import { activateFlag } from "~/modules/flags/activateFlag";
import { getFlagsByProjectEnv } from "~/modules/flags/getFlagsByProjectEnv";
import { FlagEnv, FlagStatus } from "~/modules/flags/types";
import { getProject } from "~/modules/projects/getProject";
import { Project } from "~/modules/projects/types";
import { getStrategies } from "~/modules/strategies/getStrategies";
import { StrategyCard } from "~/modules/strategies/StrategyCard";
import { User } from "~/modules/user/types";
import { getSession } from "~/sessions";
import { IoIosFlag } from "react-icons/io";
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
    title: `Rollout | ${project.name} | ${environment.name} | Flags | ${currentFlag.name}`,
  };
};

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<null> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const formData = await request.formData();
  const nextStatus = formData.get("nextStatus");
  const flagId = params.flagId;

  if (nextStatus && flagId) {
    await activateFlag(
      params.id!,
      params.env!,
      flagId as string,
      nextStatus as FlagStatus,
      authCookie
    );
  }

  return null;
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
    params.id!,
    params.env!,
    params.flagId!,
    authCookie
  );

  const flagsByEnv: Array<FlagEnv> = await getFlagsByProjectEnv(
    params.id!,
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
  const transition = useTransition();

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
            <ButtonCopy
              toCopy={currentFlag.key}
              icon={<IoIosFlag aria-hidden />}
              variant="outline"
              colorScheme={"brand"}
            >
              {currentFlag.key}
            </ButtonCopy>
          }
        />
      }
      subNav={
        <HorizontalNav label={`Flag related`}>
          <NavItem
            to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}`}
            icon={<FaPowerOff />}
          >
            Rollout status
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
      <Stack spacing={4}>
        <Section id="flag-status">
          <SectionHeader
            title="Flag status"
            description={
              <div aria-live="polite">
                {isFlagActivated ? (
                  <Text>
                    The feature flag is{" "}
                    <Badge colorScheme="success">active</Badge>. People matching
                    at least one of the following strategies will see the
                    variant.
                  </Text>
                ) : (
                  <Text>
                    The feature flag is <Badge>not active</Badge>. Nobody will
                    see the variant and the following strategies will NOT apply.
                  </Text>
                )}
              </div>
            }
            endAction={
              <Form method="post">
                <input
                  type="hidden"
                  name="nextStatus"
                  value={
                    isFlagActivated
                      ? FlagStatus.NOT_ACTIVATED
                      : FlagStatus.ACTIVATED
                  }
                />

                <Switch
                  optimistic={transition.state === "submitting"}
                  type="submit"
                  checked={isFlagActivated}
                />
              </Form>
            }
          />
        </Section>

        <Section id="concerned-audience">
          <SectionHeader
            title="Rollout strategies"
            description={
              <Text>
                When a user matches at least one of the following strategies,
                they will see the activated variant of the flag.
              </Text>
            }
            endAction={
              <Button
                to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/strategies/create`}
                leftIcon={<IoIosCreate aria-hidden />}
                colorScheme="brand"
              >
                Add a strategy
              </Button>
            }
          />

          <Stack spacing={2}>
            <Box px={4}>
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
                <>
                  {strategies.map((strat) => (
                    <StrategyCard
                      key={`${strat.uuid}`}
                      projectId={project.uuid}
                      envId={environment.uuid}
                      flagId={currentFlag.uuid}
                      strat={strat}
                    />
                  ))}
                </>
              ) : null}
            </Box>

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
                />
              </>
            ) : null}
          </Stack>
        </Section>
      </Stack>
    </DashboardLayout>
  );
}
