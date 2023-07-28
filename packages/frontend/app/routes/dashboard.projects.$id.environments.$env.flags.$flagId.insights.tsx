import { DashboardLayout } from "~/layouts/DashboardLayout";
import { getSession } from "~/sessions";
import { getFlagHits } from "~/modules/flags/services/getFlagHits";
import {
  LoaderFunction,
  ActionFunction,
  V2_MetaFunction,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { FlagEnvMenu } from "~/modules/flags/components/FlagEnvMenu";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { getFlagEnvMetaTitle } from "~/modules/flags/services/getFlagEnvMetaTitle";
import { Card, CardContent } from "~/components/Card";
import { TextInput } from "~/components/Fields/TextInput";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { PageTitle } from "~/components/PageTitle";
import { MetricPerVariantList } from "~/modules/flags/MetricPerVariantList";
import { Section, SectionHeader } from "~/components/Section";
import { stringToColor } from "~/modules/misc/utils/stringToColor";
import { EmptyState } from "~/components/EmptyState";
import { LineChart } from "~/components/LineChart";
import { toggleFlagAction } from "~/modules/flags/form-actions/toggleFlagAction";
import { VariantCard } from "~/modules/insights/components/VariantCard";
import { Typography } from "~/components/Typography";

export const meta: V2_MetaFunction = ({ matches, params }) => {
  const projectName = getProjectMetaTitle(matches);
  const envName = getEnvMetaTitle(matches, params.env!);
  const flagName = getFlagEnvMetaTitle(matches);

  return [
    {
      title: `Progressively | ${projectName} | ${envName} | ${flagName} | Insights`,
    },
  ];
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
    hitsPerVariantPerDate,
    flagEvaluations,
  } = useLoaderData<LoaderData>();
  const { flagEnv } = useFlagEnv();
  const { project } = useProject();
  const { environment } = useEnvironment();

  return (
    <DashboardLayout
      subNav={
        <FlagEnvMenu
          projectId={project.uuid}
          envId={environment.uuid}
          flagEnv={flagEnv}
        />
      }
    >
      <div className="flex flex-row gap-8 justify-between">
        <PageTitle
          value="Insights"
          description={
            <Typography>
              Information related to flag evaluations, variants and metrics.
            </Typography>
          }
        />

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
      </div>

      <Section id="variant-evaluations">
        <Card>
          <CardContent>
            <SectionHeader
              title="Variants evaluations"
              description="Number of times the different variants have been calculated for the users"
            />

            {hitsPerVariantPerDate.length > 0 ? (
              <LineChart data={hitsPerVariantPerDate} />
            ) : (
              <EmptyState
                title="No data"
                description={"There are no flag evaluations for this period."}
              />
            )}

            <div>
              <Typography as="h3" className="text-xl font-semibold pb-4">
                Total for period
                <span className="bg-slate-100 rounded-full px-2 py-1 font-normal text-gray-600 text-xs ml-2">
                  {flagEvaluationsCount} eval.
                </span>
              </Typography>
              <div className="flex flex-row gap-4 flex-wrap">
                {flagEvaluations.map((fe) => (
                  <VariantCard
                    key={`variant-card-${fe.valueResolved}`}
                    variant={fe.valueResolved}
                    hit={fe._count}
                    ratio={
                      Math.round((fe._count / flagEvaluationsCount) * 10_000) /
                      100
                    }
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </Section>

      <Section id="metric-hits">
        <Card>
          <CardContent>
            <SectionHeader
              title="Hits on metrics"
              description="Multiple information regarding metrics that have been tracked."
            />

            <MetricPerVariantList items={metricsByVariantCount} />
          </CardContent>
        </Card>
      </Section>
    </DashboardLayout>
  );
}
