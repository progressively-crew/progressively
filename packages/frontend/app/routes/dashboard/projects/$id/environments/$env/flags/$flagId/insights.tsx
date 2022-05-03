import { Box, HStack, Stack } from "@chakra-ui/react";
import {
  useLoaderData,
  LoaderFunction,
  MetaFunction,
  ActionFunction,
} from "remix";
import { Crumbs, BreadCrumbs } from "~/components/AppBreadcrumbs";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { authGuard } from "~/modules/auth/services/auth-guard";
import { Environment } from "~/modules/environments/types";
import { getFlagsByProjectEnv } from "~/modules/flags/services/getFlagsByProjectEnv";
import { FlagEnv, FlagStatus } from "~/modules/flags/types";
import { getProject } from "~/modules/projects/services/getProject";
import { Project } from "~/modules/projects/types";
import { User } from "~/modules/user/types";
import { getSession } from "~/sessions";
import { Header } from "~/components/Header";
import { Section, SectionHeader } from "~/components/Section";
import { AiOutlineBarChart, AiOutlineSetting } from "react-icons/ai";
import { HorizontalNav, NavItem } from "~/components/HorizontalNav";
import { FaPowerOff } from "react-icons/fa";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { getFlagHits } from "~/modules/flags/services/getFlagHits";
import {
  toggleAction,
  ToggleFlag,
} from "~/modules/flags/components/ToggleFlag";
import { FiFlag } from "react-icons/fi";
import { ButtonCopy } from "~/components/ButtonCopy";

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
    title: `Progressively | ${project.name} | ${environment.name} | ${currentFlag.name} | Insights`,
  };
};

export const action: ActionFunction = ({ request, params }): Promise<null> => {
  return toggleAction({ request, params });
};

interface LoaderData {
  project: Project;
  environment: Environment;
  currentFlagEnv: FlagEnv;
  user: User;
  hits: Array<{ date: Date; count: number }>;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const user = await authGuard(request);
  const session = await getSession(request.headers.get("Cookie"));

  const authCookie = session.get("auth-cookie");

  const project: Project = await getProject(params.id!, authCookie);
  const hits = await getFlagHits(params.env!, params.flagId!, authCookie);

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
    user,
    hits,
  };
};

export default function FlagById() {
  const { project, environment, currentFlagEnv, user, hits } =
    useLoaderData<LoaderData>();

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
      forceNotCurrent: true,
    },
  ];

  const formatX = (item: string) => {
    return new Intl.DateTimeFormat().format(new Date(item));
  };

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
        <Section id="flag-status">
          <SectionHeader
            title="Insights"
            description="Number of hits per date"
          />

          {hits.length > 0 && (
            <Box ml={-4}>
              <ResponsiveContainer width="100%" aspect={16.0 / 9.0}>
                <LineChart data={hits}>
                  <Line
                    isAnimationActive={false}
                    type="monotone"
                    dataKey="count"
                    stroke="#8884d8"
                  />
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="date" tickFormatter={formatX} />
                  <YAxis />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          )}
        </Section>
      </Stack>
    </DashboardLayout>
  );
}
