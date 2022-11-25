import { DashboardLayout } from "~/layouts/DashboardLayout";
import { getSession } from "~/sessions";
import { Header } from "~/components/Header";
import { AiOutlineBarChart } from "react-icons/ai";
import { getFlagHits } from "~/modules/flags/services/getFlagHits";
import { MetaFunction, LoaderFunction } from "@remix-run/node";
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
import { Card, CardContent } from "~/components/Card";
import { TextInput } from "~/components/Fields/TextInput";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { Typography } from "~/components/Typography";
import { PageTitle } from "~/components/PageTitle";
import { FlagIcon } from "~/components/Icons/FlagIcon";
import { MetricPerVariantList } from "~/modules/flags/MetricPerVariantList";
import { Section, SectionHeader } from "~/components/Section";
import { BarChart } from "~/components/BarChart";
import { Spacer } from "~/components/Spacer";
import { PieChart } from "~/components/PieChart";
import { Tag } from "~/components/Tag";
import { FlagEvalList } from "~/modules/flags/FlagEvalList";
import { stringToColor } from "~/modules/misc/utils/stringToColor";

export const meta: MetaFunction = ({ parentsData, params }) => {
  const projectName = getProjectMetaTitle(parentsData);
  const envName = getEnvMetaTitle(parentsData, params.env);
  const flagName = getFlagMetaTitle(parentsData);

  return {
    title: `Progressively | ${projectName} | ${envName} | ${flagName} | Insights`,
  };
};

interface FlagHit {
  variant: string;
  count: number;
}

interface MetricHit {
  metric: string;
  variant: string;
  variantCount?: number;
  count: number;
}

interface LoaderData {
  flagEvaluationsCount: number;
  startDate: string;
  endDate: string;
  metricsByVariantCount: Array<MetricHit>;
  barChartData: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  pieChartData: Array<{
    name: string;
    value: number;
  }>;
  hitsPerVariant: Array<FlagHit>;
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

  const end = new Date();
  end.setDate(end.getDate() + 1);

  const startDate = startDateForm ? new Date(startDateForm) : start;
  const endDate = endDateForm ? new Date(endDateForm) : end;

  const authCookie = session.get("auth-cookie");
  const {
    hitsPerVariant,
    flagEvaluationsCount,
    metricsByVariantCount,
  }: {
    hitsPerVariant: Array<FlagHit>;
    flagEvaluationsCount: number;
    metricsByVariantCount: Array<Omit<MetricHit, "variantCount">>;
  } = await getFlagHits(
    params.env!,
    params.flagId!,
    startDate,
    endDate,
    authCookie
  );

  const computedMetricsByVariantCout = metricsByVariantCount.map((nbv) => ({
    count: nbv.count,
    metric: nbv.metric,
    variant: nbv.variant,
    variantCount: hitsPerVariant.find((hpv) => hpv.variant === nbv.variant)
      ?.count,
  }));

  const barChartData = computedMetricsByVariantCout
    .filter((mbv) => Boolean(mbv.variantCount))
    .map((mbv) => ({
      name: `${mbv.metric} (${mbv.variant})`,
      value:
        Math.round((mbv.count / Number(mbv.variantCount)) * 100 * 100) / 100,
      color: stringToColor(mbv.variant),
    }));

  const pieChartData = hitsPerVariant.map((hpv) => ({
    name: hpv.variant,
    value: hpv.count,
  }));

  return {
    hitsPerVariant,
    pieChartData,
    barChartData,
    flagEvaluationsCount,
    metricsByVariantCount: computedMetricsByVariantCout,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  };
};

const formatDefaultDate = (isoDate: string) => {
  return isoDate.slice(0, 10);
};

export default function FlagInsights() {
  const {
    startDate,
    endDate,
    metricsByVariantCount,
    flagEvaluationsCount,
    barChartData,
    pieChartData,
    hitsPerVariant,
  } = useLoaderData<LoaderData>();
  const { flagEnv } = useFlagEnv();
  const { user } = useUser();
  const { project } = useProject();
  const { environment } = useEnvironment();

  const currentFlag = flagEnv.flag;

  return (
    <DashboardLayout
      user={user}
      header={
        <Header
          tagline={<TagLine icon={<FlagIcon />}>FEATURE FLAG</TagLine>}
          title={currentFlag.name}
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
        action={
          <Form action=".">
            <div className="flex flex-col md:flex-row gap-3 md:items-end">
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
              <SubmitButton>Filter</SubmitButton>
            </div>
          </Form>
        }
        description={
          <Typography>
            Information about variants hits per date on the feature flag.
          </Typography>
        }
      />

      <Stack spacing={8}>
        <Section id="all-evalutations">
          <Card>
            <CardContent>
              <SectionHeader
                title="Flag evaluations"
                description="Repartition of the flag evaluations."
                action={
                  <Tag variant="PRIMARY">
                    Flag evaluated <strong>{flagEvaluationsCount}</strong> times
                  </Tag>
                }
              />
            </CardContent>

            <Spacer size={8} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div style={{ height: 260 }}>
                <PieChart data={pieChartData} />
              </div>

              <div className="border-l border-t border-l-gray-200 border-t-gray-200">
                <FlagEvalList
                  evalCount={flagEvaluationsCount}
                  items={hitsPerVariant}
                />
              </div>
            </div>
          </Card>
        </Section>

        <Section id="metrics-variant">
          <Card>
            <CardContent>
              <SectionHeader
                title="Hit on metrics"
                description="These are the number of hit on each metrics and the associated variant (if applicable). The chart shows the ratio between the variant evaluation and the metric hit."
              />
            </CardContent>

            <div className="w-full" style={{ height: 200 }}>
              <BarChart data={barChartData} yLabel="Percentage" />
            </div>

            <Spacer size={4} />

            <MetricPerVariantList items={metricsByVariantCount} />
          </Card>
        </Section>
      </Stack>
    </DashboardLayout>
  );
}
