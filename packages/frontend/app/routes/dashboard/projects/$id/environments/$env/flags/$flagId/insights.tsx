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
import { styled } from "~/stitches.config";
import { Spacer } from "~/components/Spacer";
import { EmptyState } from "~/components/EmptyState";
import { Crumbs } from "~/components/Breadcrumbs/types";
import { MetaFunction, ActionFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { TagLine } from "~/components/Tagline";
import { FiFlag } from "react-icons/fi";
import { FlagMenu } from "~/modules/flags/components/FlagMenu";
import { useUser } from "~/modules/user/contexts/useUser";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { getFlagMetaTitle } from "~/modules/flags/services/getFlagMetaTitle";
import { Heading } from "~/components/Heading";
import { Stack } from "~/components/Stack";
import { toggleFlagAction } from "~/modules/flags/form-actions/toggleFlagAction";
import { BarChart } from "~/components/Charts/BarChart";
import { Card } from "~/components/Card";

export const meta: MetaFunction = ({ parentsData, params }) => {
  const projectName = getProjectMetaTitle(parentsData);
  const envName = getEnvMetaTitle(parentsData, params.env);
  const flagName = getFlagMetaTitle(parentsData);

  return {
    title: `Progressively | ${projectName} | ${envName} | ${flagName} | Insights`,
  };
};

type ActionDataType = null | { successChangePercentage: boolean };

export const action: ActionFunction = async ({ request, params }): Promise<ActionDataType> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");
  const formData = await request.formData();
  const type = formData.get("_type");

  if (type === "toggle-flag") {
    return toggleFlagAction(formData, params, authCookie);
  }

  return null;
};
interface FlagHit {
  date: string;
  _count: number;
}

interface LoaderData {
  max: number;
  hits: Array<{ name: string; hits: Array<FlagHit> }>;
  organizedHits: Array<[string, Array<{ name: string; value: number }>]>;
}

export const loader: LoaderFunction = async ({ request, params }): Promise<LoaderData> => {
  const session = await getSession(request.headers.get("Cookie"));

  const authCookie = session.get("auth-cookie");
  const hitsPerFlags: Array<{ name: string; hits: Array<FlagHit> }> = await getFlagHits(
    params.env!,
    params.flagId!,
    authCookie
  );

  const mapOfHits = new Map<string, Array<{ name: string; value: number }>>();
  let max = 0;

  for (const hpf of hitsPerFlags) {
    for (const hit of hpf.hits) {
      if (max < hit._count) {
        max = hit._count;
      }

      if (!mapOfHits.has(hit.date)) {
        const points: Array<{ name: string; value: number }> = [];
        mapOfHits.set(hit.date, points);
      }

      mapOfHits.get(hit.date)?.push({ name: hpf.name, value: hit._count });
    }
  }

  const organizedHits = Array.from(mapOfHits).sort(([d1], [d2]) => (d1 > d2 ? 1 : -1));

  return {
    hits: hitsPerFlags,
    organizedHits,
    max,
  };
};

const InsightsGrid = styled("div", {
  display: "grid",
  gap: "$spacing$4",
  gridTemplateColumns: "1fr 1fr 1fr",

  "@tablet": {
    gridTemplateColumns: "1fr",
  },
});

export default function FlagInsights() {
  const { hits, organizedHits, max } = useLoaderData<LoaderData>();
  const { flagEnv } = useFlagEnv();
  const { user } = useUser();
  const { project } = useProject();
  const { environment } = useEnvironment();

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
        <FlagMenu projectId={project.uuid} envId={environment.uuid} flagId={currentFlag.uuid} />
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
                  There are no hits for this flag. Make sure to activate the flag in order to
                  collect hits.
                </Typography>
              }
            />
          )}

          {hits.length > 0 && (
            <InsightsGrid>
              {hits.map((hit) => {
                const count = hit.hits.reduce((acc, curr) => acc + curr._count, 0);

                return (
                  <BigStat name={`Variant ${hit.name}`} key={`variant-insight-${hit.name}`}>
                    <p>{count}</p>
                  </BigStat>
                );
              })}
            </InsightsGrid>
          )}

          <Spacer size={4} />
          <Card>
            <BarChart data={organizedHits} max={max} />
          </Card>
        </div>
      </Stack>
    </DashboardLayout>
  );
}
