import { BreadCrumbs } from "~/components/Breadcrumbs";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { FlagStatus } from "~/modules/flags/types";
import { getSession } from "~/sessions";
import { Header } from "~/components/Header";
import { AiOutlineBarChart } from "react-icons/ai";
import { getFlagHits } from "~/modules/flags/services/getFlagHits";
import { ToggleFlag } from "~/modules/flags/components/ToggleFlag";
import { BigStat } from "~/components/BigStat";
import { styled } from "~/stitches.config";
import { Crumbs } from "~/components/Breadcrumbs/types";
import { MetaFunction, ActionFunction, LoaderFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { TagLine } from "~/components/Tagline";
import { FlagMenu } from "~/modules/flags/components/FlagMenu";
import { useUser } from "~/modules/user/contexts/useUser";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { getFlagMetaTitle } from "~/modules/flags/services/getFlagMetaTitle";
import { Stack } from "~/components/Stack";
import { toggleFlagAction } from "~/modules/flags/form-actions/toggleFlagAction";
import { BarChart } from "~/components/Charts/BarChart";
import { Card, CardContent } from "~/components/Card";
import { TextInput } from "~/components/Fields/TextInput";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { HStack } from "~/components/HStack";
import { EmptyState } from "~/components/EmptyState";
import { Typography } from "~/components/Typography";
import { PageTitle } from "~/components/PageTitle";
import { FlagIcon } from "~/components/Icons/FlagIcon";

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
  startDate: string;
  endDate: string;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const session = await getSession(request.headers.get("Cookie"));
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);

  const startDateForm = search.get("startDate");
  const endDateForm = search.get("endDate");

  const start = new Date();
  start.setDate(start.getDate() - 7);

  const startDate = startDateForm ? new Date(startDateForm) : start;
  const endDate = endDateForm ? new Date(endDateForm) : new Date();

  const authCookie = session.get("auth-cookie");
  const hitsPerFlags: Array<{ name: string; hits: Array<FlagHit> }> =
    await getFlagHits(
      params.env!,
      params.flagId!,
      startDate,
      endDate,
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

  const organizedHits = Array.from(mapOfHits).sort(([d1], [d2]) =>
    d1 > d2 ? 1 : -1
  );

  return {
    hits: hitsPerFlags,
    organizedHits,
    max,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  };
};

const InsightsGrid = styled("div", {
  display: "grid",
  gap: "$spacing$8",
  gridTemplateColumns: "1fr 1fr",

  "@tablet": {
    gridTemplateColumns: "1fr",
  },
});

const formatDefaultDate = (isoDate: string) => {
  return isoDate.substr(0, 10);
};

export default function FlagInsights() {
  const { hits, organizedHits, max, startDate, endDate } =
    useLoaderData<LoaderData>();
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
      isRoot: true,
    },
    {
      link: `/dashboard/projects/${project.uuid}`,
      label: project.name,
      isProject: true,
    },
    {
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}`,
      label: environment.name,
      isEnv: true,
    },
    {
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}`,
      label: currentFlag.name,
      isFlag: true,
      forceNotCurrent: true,
    },
  ];

  let allCount = 0;
  const hitNode = hits.map((hit) => {
    const count = hit.hits.reduce((acc, curr) => acc + curr._count, 0);
    allCount += count;

    return (
      <BigStat
        name={`Variant ${hit.name}`}
        key={`variant-insight-${hit.name}`}
        unit="hits"
        count={count}
      />
    );
  });

  return (
    <DashboardLayout
      user={user}
      breadcrumb={<BreadCrumbs crumbs={crumbs} />}
      header={
        <Header
          tagline={<TagLine icon={<FlagIcon />}>FEATURE FLAG</TagLine>}
          title={currentFlag.name}
          startAction={
            <Form method="post" id={`form-${currentFlag.uuid}`}>
              <ToggleFlag
                isFlagActivated={isFlagActivated}
                flagId={currentFlag.uuid}
              />
            </Form>
          }
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
      <PageTitle
        value="Insights"
        icon={<AiOutlineBarChart />}
        description={
          <Typography>
            Information about variants hits per date on the feature flag.
          </Typography>
        }
      />

      <Stack spacing={8}>
        <Form action=".">
          <HStack spacing={4} alignItems="flex-end">
            <TextInput
              type="date"
              name={"startDate"}
              label={"Start date"}
              defaultValue={formatDefaultDate(startDate)}
            />
            <TextInput
              type="date"
              name={"endDate"}
              label={"End date"}
              defaultValue={formatDefaultDate(endDate)}
            />
            <SubmitButton>Filter on date</SubmitButton>
          </HStack>
        </Form>

        <InsightsGrid>{hitNode}</InsightsGrid>

        <Card>
          {allCount > 0 ? (
            <BarChart data={organizedHits} max={max} />
          ) : (
            <CardContent>
              <EmptyState
                title="No hits found"
                description={
                  <Typography>There is no flag hit for this period.</Typography>
                }
              />
            </CardContent>
          )}
        </Card>
      </Stack>
    </DashboardLayout>
  );
}
