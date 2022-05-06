import { Box, Flex, HStack, Stack, useTheme } from "@chakra-ui/react";
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
import { BigState } from "~/components/BigStat";

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
    title: `Progressively | ${projectName} | ${envName} | ${flagName} | Insights`,
  };
};

export const action: ActionFunction = ({ request, params }): Promise<null> => {
  return toggleAction({ request, params });
};

interface FlagHit {
  date: string;
  activated: number;
  notactivated: number;
}

interface LoaderData {
  project: Project;
  environment: Environment;
  currentFlagEnv: FlagEnv;
  user: User;
  hits: Array<FlagHit>;
  activatedCount: number;
  notActivatedCount: number;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const user = await authGuard(request);
  const session = await getSession(request.headers.get("Cookie"));

  const authCookie = session.get("auth-cookie");

  const project: Project = await getProject(params.id!, authCookie);
  const hits: Array<FlagHit> = await getFlagHits(
    params.env!,
    params.flagId!,
    authCookie
  );

  let activatedCount = 0;
  let notActivatedCount = 0;

  for (const hit of hits) {
    activatedCount += hit.activated;
    notActivatedCount += hit.notactivated;
  }

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
    activatedCount,
    notActivatedCount,
  };
};

export default function FlagById() {
  const theme = useTheme();

  const {
    project,
    environment,
    currentFlagEnv,
    user,
    hits,
    activatedCount,
    notActivatedCount,
  } = useLoaderData<LoaderData>();

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

          <Flex gap={8} flexDirection={["column", "row"]} mt={8} mb={8}>
            <BigState
              name="Hits on activated variant"
              value={activatedCount}
              color={theme.colors.brand["500"]}
            />
            <BigState
              name="Hits on not activated variant"
              value={notActivatedCount}
              color={theme.colors.error["500"]}
              dotted
            />
          </Flex>

          {hits.length > 0 && (
            <Box ml={-9}>
              <ResponsiveContainer width="100%" aspect={16.0 / 9.0}>
                <LineChart data={hits}>
                  <Line
                    isAnimationActive={false}
                    type="monotone"
                    dataKey="activated"
                    stroke={theme.colors.brand["500"]}
                    strokeWidth={3}
                  />
                  <Line
                    isAnimationActive={false}
                    type="monotone"
                    dataKey="notactivated"
                    stroke={theme.colors.error["500"]}
                    strokeDasharray="3 3"
                    strokeWidth={3}
                  />
                  <CartesianGrid stroke="#f1f1f1" vertical={false} />
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
