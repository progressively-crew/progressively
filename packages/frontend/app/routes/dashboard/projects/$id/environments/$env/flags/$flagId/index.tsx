import {
  useLoaderData,
  LoaderFunction,
  MetaFunction,
  ActionFunction,
  useSearchParams,
} from "remix";
import { Crumbs, BreadCrumbs } from "~/components/AppBreadcrumbs";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { authGuard } from "~/modules/auth/services/auth-guard";
import { Environment } from "~/modules/environments/types";
import { getFlagsByProjectEnv } from "~/modules/flags/services/getFlagsByProjectEnv";
import { FlagEnv, FlagStatus } from "~/modules/flags/types";
import { getProject } from "~/modules/projects/services/getProject";
import { Project } from "~/modules/projects/types";
import { getStrategies } from "~/modules/strategies/services/getStrategies";
import { StrategyCard } from "~/modules/strategies/components/StrategyCard";
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
import {
  toggleAction,
  ToggleFlag,
} from "~/modules/flags/components/ToggleFlag";
import { ButtonCopy } from "~/components/ButtonCopy";
import { Typography } from "~/components/Typography";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { CardGroup } from "~/components/CardGroup";
import { CreationCard } from "~/components/CreationCard";

interface MetaArgs {
  data?: {
    project?: Project;
    environment?: Environment;
    currentFlagEnv?: FlagEnv;
  };
}

export const meta: MetaFunction = ({ data }: MetaArgs) => {
  const projectName = data?.project?.name || "An error ocurred";
  const envName = data?.environment?.name || "An error ocurred";
  const flagName = data?.currentFlagEnv?.flag?.name || "An error ocurred";

  return {
    title: `Progressively | ${projectName} | ${envName} | Flags | ${flagName}`,
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
            <>
              <ToggleFlag isFlagActivated={isFlagActivated} />
              <ButtonCopy toCopy={currentFlag.key}>
                {currentFlag.key}
              </ButtonCopy>
            </>
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
      status={
        isStrategyAdded ? (
          <SuccessBox id="strategy-added">
            The strategy has been successfully created.
          </SuccessBox>
        ) : isStrategyRemoved ? (
          <SuccessBox id="strategy-removed">
            The strategy has been successfully removed.
          </SuccessBox>
        ) : strategies.length === 0 ? (
          <WarningBox title="You don't have strategies yet. When activating the flag, every user will receive the activated variant." />
        ) : null
      }
    >
      <Section id="concerned-audience">
        <SectionHeader title="Strategies" hiddenTitle />

        {strategies.length > 0 ? (
          <CardGroup cols={2}>
            <CreationCard
              to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/strategies/create`}
            >
              Add a strategy
            </CreationCard>

            {strategies.map((strat) => (
              <StrategyCard
                key={`${strat.uuid}`}
                projectId={project.uuid}
                envId={environment.uuid}
                flagId={currentFlag.uuid}
                strat={strat}
              />
            ))}
          </CardGroup>
        ) : null}

        {strategies.length === 0 ? (
          <EmptyState
            title="No strategy found"
            description={
              <Typography>
                There are no strategies bound to this flag yet.
              </Typography>
            }
            action={
              <CreateButton
                to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/strategies/create`}
              >
                Add a strategy
              </CreateButton>
            }
          />
        ) : null}
      </Section>
    </DashboardLayout>
  );
}
