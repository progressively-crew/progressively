import { DashboardLayout } from "~/layouts/DashboardLayout";
import { getSession } from "~/sessions";
import { Header } from "~/components/Header";
import { AiOutlineBarChart } from "react-icons/ai";
import { getFlagHits } from "~/modules/flags/services/getFlagHits";
import { MetaFunction, LoaderFunction, ActionFunction } from "@remix-run/node";
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
import { Tag } from "~/components/Tag";
import { FlagEvalList } from "~/modules/flags/FlagEvalList";
import { stringToColor } from "~/modules/misc/utils/stringToColor";
import { EmptyState } from "~/components/EmptyState";
import { LineChart } from "~/components/LineChart";
import { ToggleFlag } from "~/modules/flags/components/ToggleFlag";
import { FlagStatus } from "~/modules/flags/types";
import { toggleFlagAction } from "~/modules/flags/form-actions/toggleFlagAction";
import { VariantCard } from "~/modules/insights/components/VariantCard";
import { EvalCard } from "~/modules/insights/components/EvalCard";
import { Spacer } from "~/components/Spacer";

export const meta: MetaFunction = ({ parentsData, params }) => {
  const projectName = getProjectMetaTitle(parentsData);
  const envName = getEnvMetaTitle(parentsData, params.env);
  const flagName = getFlagMetaTitle(parentsData);

  return {
    title: `Progressively | ${projectName} | ${envName} | ${flagName} | Insights`,
  };
};

type FlagHit = {
  [key: string]: number;
} & { date: string };

interface MetricHit {
  metric: string;
  variant: string;
  variantCount?: number;
  count: number;
}

interface FlagEvaluation {
  valueResolved: string;
  _count: number;
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
  hitsPerVariantPerDate: Array<FlagHit>;
  flagEvaluations: Array<FlagEvaluation>;
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
    hitsPerVariantPerDate,
    flagEvaluationsCount,
    metricsByVariantCount,
    flagEvaluations,
  }: {
    hitsPerVariantPerDate: Array<FlagHit>;
    flagEvaluationsCount: number;
    metricsByVariantCount: Array<Omit<MetricHit, "variantCount">>;
    flagEvaluations: Array<FlagEvaluation>;
  } = await getFlagHits(
    params.env!,
    params.flagId!,
    startDate,
    endDate,
    authCookie
  );

  const computedMetricsByVariantCount = metricsByVariantCount.map((nbv) => ({
    count: nbv.count,
    metric: nbv.metric,
    variant: nbv.variant,
    // eslint-disable-next-line unicorn/no-array-reduce
    variantCount: flagEvaluations.find((f) => f.valueResolved === nbv.variant)
      ?._count,
  }));

  const barChartData = computedMetricsByVariantCount
    .filter((mbv) => Boolean(mbv.variantCount))
    .map((mbv) => ({
      name: `${mbv.metric} (${mbv.variant})`,
      value:
        Math.round((mbv.count / Number(mbv.variantCount)) * 100 * 100) / 100,
      color: stringToColor(mbv.variant),
    }));

  return {
    flagEvaluations,
    hitsPerVariantPerDate,
    barChartData,
    flagEvaluationsCount,
    metricsByVariantCount: computedMetricsByVariantCount,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  };
};

const formatDefaultDate = (isoDate: string) => {
  return isoDate.slice(0, 10);
};

type ActionDataType = null | {
  errors?: { [key: string]: string | undefined };
};

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

export default function FlagInsights() {
  const {
    startDate,
    endDate,
    metricsByVariantCount,
    flagEvaluationsCount,
    barChartData,
    hitsPerVariantPerDate,
    flagEvaluations,
  } = useLoaderData<LoaderData>();
  const { flagEnv } = useFlagEnv();
  const { user } = useUser();
  const { project } = useProject();
  const { environment } = useEnvironment();

  const currentFlag = flagEnv.flag;

  const isFlagActivated = flagEnv.status === FlagStatus.ACTIVATED;

  return (
    <DashboardLayout
      user={user}
      header={
        <Header
          tagline={<TagLine icon={<FlagIcon />}>Feature flag</TagLine>}
          title={currentFlag.name}
          action={
            <Form
              method="post"
              id={`form-${currentFlag.uuid}`}
              style={{ marginTop: 12 }}
            >
              <ToggleFlag
                isFlagActivated={isFlagActivated}
                flagId={currentFlag.uuid}
                flagName={currentFlag.name}
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
      <div className="sr-only">
        <PageTitle
          value="Insights"
          description={
            <Typography>
              Information about variants hits per date on the feature flag.
            </Typography>
          }
        />
      </div>

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

      <Section id="variants-hits">
        <SectionHeader
          title="Flag evaluations"
          description="These are the number of hit on each metrics and the associated variant (if applicable). The chart shows the ratio between the variant evaluation and the metric hit."
        />

        <Spacer size={4} />

        <div className="grid grid-cols-4 gap-8">
          <EvalCard count={flagEvaluationsCount} />

          <div
            className="w-full col-span-3 border border-gray-100 rounded-md bg-white dark:border-slate-700 dark:bg-slate-800 pr-6"
            style={{ height: 300 }}
          >
            {hitsPerVariantPerDate.length > 0 ? (
              <LineChart data={hitsPerVariantPerDate} />
            ) : (
              <EmptyState
                title="No data"
                description={"There are no flag evaluations for this period."}
              />
            )}
          </div>

          {flagEvaluations.map((fe) => (
            <VariantCard
              key={`variant-card-${fe.valueResolved}`}
              variant={fe.valueResolved}
              hit={fe._count}
              ratio={
                Math.round((fe._count / flagEvaluationsCount) * 10_000) / 100
              }
            />
          ))}
        </div>
      </Section>

      <Section id="metrics-variant">
        <SectionHeader
          title="Hit on metrics"
          description="These are the number of hit on each metrics and the associated variant (if applicable). The chart shows the ratio between the variant evaluation and the metric hit."
        />

        <Spacer size={4} />

        <Card>
          <MetricPerVariantList items={metricsByVariantCount} />

          <div
            className="w-full bg-gray-50 dark:bg-slate-700 pt-8 pb-6"
            style={{ height: 300 }}
          >
            {barChartData.length > 0 ? (
              <BarChart data={barChartData} />
            ) : (
              <EmptyState
                title="No data"
                description={"There are no metric hits for this period."}
              />
            )}
          </div>
        </Card>
      </Section>
    </DashboardLayout>
  );
}
