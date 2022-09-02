import { BreadCrumbs } from "~/components/Breadcrumbs";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { FlagStatus } from "~/modules/flags/types";
import { getSession } from "~/sessions";
import { Header } from "~/components/Header";
import { AiOutlineBarChart } from "react-icons/ai";
import { getFlagHits } from "~/modules/flags/services/getFlagHits";
import { ToggleFlag } from "~/modules/flags/components/ToggleFlag";
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
import { TagLine } from "~/components/Tagline";
import { FiFlag } from "react-icons/fi";
import { FlagMenu } from "~/modules/flags/components/FlagMenu";
import { activateFlag } from "~/modules/flags/services/activateFlag";
import { useUser } from "~/modules/user/contexts/useUser";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { getFlagMetaTitle } from "~/modules/flags/services/getFlagMetaTitle";
import { Heading } from "~/components/Heading";
import { Stack } from "~/components/Stack";

export const meta: MetaFunction = ({ parentsData, params }) => {
  const projectName = getProjectMetaTitle(parentsData);
  const envName = getEnvMetaTitle(parentsData, params.env);
  const flagName = getFlagMetaTitle(parentsData);

  return {
    title: `Progressively | ${projectName} | ${envName} | ${flagName} | Insights`,
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
interface FlagHit {
  date: string;
  activated: number;
  notactivated: number;
}

interface LoaderData {
  hits: Array<FlagHit>;
  activatedCount: number;
  notActivatedCount: number;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const session = await getSession(request.headers.get("Cookie"));

  const authCookie = session.get("auth-cookie");

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

  return {
    hits,
    activatedCount,
    notActivatedCount,
  };
};

const InsightsGrid = styled("div", {
  display: "grid",
  gap: "$spacing$4",
  gridTemplateColumns: "auto 1fr",

  "@tablet": {
    gridTemplateColumns: "1fr",
  },
});

export default function FlagInsights() {
  const { hits, activatedCount, notActivatedCount } =
    useLoaderData<LoaderData>();
  const { flagEnv } = useFlagEnv();
  const { user } = useUser();
  const { project } = useProject();
  const { environment } = useEnvironment();
  const [chartVariant, setChartVariant] = useState<ChartVariant>("chart");

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
      forceNotCurrent: true,
    },
  ];

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
      <Stack spacing={8}>
        <Heading as={"h2"} fontSize="earth" icon={<AiOutlineBarChart />}>
          Insights
        </Heading>

        <div>
          {hits.length === 0 && (
            <EmptyState
              title="No hits found"
              description={
                <Typography>
                  There are no hits for this flag. Make sure to activate the
                  flag in order to collect hits.
                </Typography>
              }
            />
          )}

          {hits.length > 0 && (
            <InsightsGrid>
              <div>
                <BigStat name="Evaluated as activated">
                  <p>{activatedCount}</p>
                </BigStat>

                <Spacer size={4} />

                <BigStat name="Evaluated as NOT activated" secondary>
                  <p>{notActivatedCount}</p>
                </BigStat>
              </div>

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
              </BigStat>
            </InsightsGrid>
          )}
        </div>
      </Stack>
    </DashboardLayout>
  );
}
