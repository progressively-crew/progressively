import { Box, Stack } from "@chakra-ui/react";
import {
  useLoaderData,
  LoaderFunction,
  MetaFunction,
  ActionFunction,
} from "remix";
import { Crumbs, BreadCrumbs } from "~/components/AppBreadcrumbs";
import { ButtonCopy } from "~/components/ButtonCopy";
import { Main } from "~/components/Main";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { authGuard } from "~/modules/auth/auth-guard";
import { Environment } from "~/modules/environments/types";
import { activateFlag } from "~/modules/flags/activateFlag";
import { getFlagsByProjectEnv } from "~/modules/flags/getFlagsByProjectEnv";
import { FlagEnv, FlagStatus } from "~/modules/flags/types";
import { getProject } from "~/modules/projects/getProject";
import { Project } from "~/modules/projects/types";
import { User } from "~/modules/user/types";
import { getSession } from "~/sessions";
import { IoIosFlag } from "react-icons/io";
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
import { getFlagHits } from "~/modules/flags/getFlagHits";

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
    title: `Rollout | ${project.name} | ${environment.name} | ${currentFlag.name} | Insights`,
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
  user: User;
  hits: any;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const user = await authGuard(request);
  const session = await getSession(request.headers.get("Cookie"));

  const authCookie = session.get("auth-cookie");

  const project: Project = await getProject(params.id!, authCookie);
  const hits = await getFlagHits(
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
    user,
    hits,
  };
};

export default function FlagById() {
  const { project, environment, currentFlagEnv, user, hits } =
    useLoaderData<LoaderData>();

  const currentFlag = currentFlagEnv.flag;

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

  const formatX = (item: any) => new Intl.DateTimeFormat().format(item.date);

  return (
    <DashboardLayout user={user}>
      <BreadCrumbs crumbs={crumbs} />

      <Main>
        <Box pb={8}>
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
        </Box>

        <Box pb={6}>
          <HorizontalNav label={`Flag related navigation`}>
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
        </Box>

        <Stack spacing={4}>
          <Section as="section" id="flag-status">
            <SectionHeader
              title="Insights"
              description="Number of hits per date"
            />

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
          </Section>
        </Stack>
      </Main>
    </DashboardLayout>
  );
}
