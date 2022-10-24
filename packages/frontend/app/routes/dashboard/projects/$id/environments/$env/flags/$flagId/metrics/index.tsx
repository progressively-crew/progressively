import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { MdBubbleChart } from "react-icons/md";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { Card, CardContent } from "~/components/Card";
import { EmptyState } from "~/components/EmptyState";
import { Header } from "~/components/Header";
import { FlagIcon } from "~/components/Icons/FlagIcon";
import { PageTitle } from "~/components/PageTitle";
import { Section } from "~/components/Section";
import { TagLine } from "~/components/Tagline";
import { Typography } from "~/components/Typography";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { FlagMenu } from "~/modules/flags/components/FlagMenu";
import { MetricList } from "~/modules/flags/components/MetricList";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { getFlagMetaTitle } from "~/modules/flags/services/getFlagMetaTitle";
import { getMetrics } from "~/modules/flags/services/getMetrics";
import { Metric } from "~/modules/flags/types";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useUser } from "~/modules/user/contexts/useUser";
import { getSession } from "~/sessions";

export const meta: MetaFunction = ({ parentsData, params }) => {
  const projectName = getProjectMetaTitle(parentsData);
  const envName = getEnvMetaTitle(parentsData, params.env);
  const flagName = getFlagMetaTitle(parentsData);

  return {
    title: `Progressively | ${projectName} | ${envName} | Flags | ${flagName} | Metrics`,
  };
};

interface LoaderData {
  metrics: Array<Metric>;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const metrics: Array<Metric> = await getMetrics(
    params.env!,
    params.flagId!,
    authCookie
  );

  return {
    metrics,
  };
};

export default function Metrics() {
  const [searchParams] = useSearchParams();
  const { user } = useUser();
  const { project } = useProject();
  const { environment } = useEnvironment();
  const { flagEnv } = useFlagEnv();

  const isMetricRemoved = searchParams.get("metricRemoved") || undefined;
  const isMetricAdded = searchParams.get("newMetric") || undefined;
  const { metrics } = useLoaderData<LoaderData>();

  const currentFlag = flagEnv.flag;

  const hasMetrics = metrics.length > 0;

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
      status={
        isMetricRemoved ? (
          <SuccessBox id="metric-removed">
            The metric has been successfully removed.
          </SuccessBox>
        ) : isMetricAdded ? (
          <SuccessBox id="metric-added">
            The metric has been successfully added.
          </SuccessBox>
        ) : null
      }
    >
      <PageTitle
        value="Metrics"
        icon={<MdBubbleChart />}
        description={
          <Typography>
            The metrics that you have to measure the impact of your flags.
          </Typography>
        }
        action={
          hasMetrics && (
            <CreateButton
              to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/metrics/create`}
            >
              Create a metric
            </CreateButton>
          )
        }
      />

      <Section aria-label="List of metrics">
        {!hasMetrics && (
          <Card>
            <CardContent>
              <EmptyState
                titleAs="h2"
                title="No metrics found"
                description={
                  <Typography>There are no metrics for this flag.</Typography>
                }
                action={
                  <CreateButton
                    to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/metrics/create`}
                  >
                    Create a metric
                  </CreateButton>
                }
              />
            </CardContent>
          </Card>
        )}

        {hasMetrics && (
          <Card>
            <MetricList
              metrics={metrics}
              projectId={project.uuid}
              envId={environment.uuid}
              flagId={currentFlag.uuid}
            />
          </Card>
        )}
      </Section>
    </DashboardLayout>
  );
}
