import { BreadCrumbs } from "~/components/Breadcrumbs";
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
import { getFlagHits } from "~/modules/flags/services/getFlagHits";
import { toggleAction } from "~/modules/flags/components/ToggleFlag";
import { BigStat } from "~/components/BigStat";
import { Typography } from "~/components/Typography";
import { styled, theme } from "~/stitches.config";
import { Spacer } from "~/components/Spacer";
import { ChartVariant, LineChart } from "~/components/LineChart";
import { useState } from "react";
import { SwitchButton } from "~/components/Buttons/SwitchButton";
import { EmptyState } from "~/components/EmptyState";
import { Crumbs } from "~/components/Breadcrumbs/types";
import { MetaFunction, ActionFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { FiFlag } from "react-icons/fi";
import { FlagHeaderAction } from "~/modules/flags/components/FlagHeaderAction";

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

const BigStatWrapper = styled("div", {
  display: "flex",
  gap: "$spacing$4",

  "@mobile": {
    flexDirection: "column",
  },
});

export default function FlagById() {
  const {
    project,
    environment,
    currentFlagEnv,
    user,
    hits,
    activatedCount,
    notActivatedCount,
  } = useLoaderData<LoaderData>();
  const [chartVariant, setChartVariant] = useState<ChartVariant>("chart");

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
      icon: <FiFlag aria-hidden />,
    },
  ];

  return (
    <DashboardLayout
      user={user}
      breadcrumb={<BreadCrumbs crumbs={crumbs} />}
      header={
        <Header
          tagline="Feature flag"
          title={currentFlag.name}
          startAction={
            <FlagHeaderAction
              flagKey={currentFlag.key}
              isFlagActivated={isFlagActivated}
            />
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
      <Section id="flag-status">
        <SectionHeader
          title="Insights"
          description={<Typography>Number of hits per date</Typography>}
        />

        <Spacer size={4} />

        {hits.length === 0 && (
          <EmptyState
            title="No hits found"
            description={
              <Typography>
                There are no hits for this flag. Make sure to activate the flag
                in order to collect hits.
              </Typography>
            }
          />
        )}

        {hits.length > 0 && (
          <>
            <BigStatWrapper>
              <BigStat name="Hits on activated variant">
                <p>{activatedCount}</p>
              </BigStat>
              <BigStat name="Hits on not activated variant" secondary>
                <p>{notActivatedCount}</p>
              </BigStat>
            </BigStatWrapper>

            <Spacer size={4} />

            <BigStat name="Flag hits per date" id="count-per-date-chart">
              <SwitchButton
                onClick={() =>
                  setChartVariant((s) => (s === "chart" ? "table" : "chart"))
                }
              >
                Switch to{" "}
                {chartVariant === "chart" ? "table view" : "chart view"}
              </SwitchButton>

              <Spacer size={4} />

              <LineChart
                labelledBy="count-per-date-chart"
                variant={chartVariant}
                items={hits}
                dataKeys={[
                  {
                    name: "activated",
                    color: theme.colors.nemesis.toString(),
                  },
                  {
                    name: "notactivated",
                    color: theme.colors.tyche.toString(),
                    dashed: true,
                  },
                ]}
              />
              <Spacer size={8} />
            </BigStat>
          </>
        )}
      </Section>
    </DashboardLayout>
  );
}
