import { DashboardLayout } from "~/layouts/DashboardLayout";
import { LoaderFunction, MetaFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { Card, CardContent } from "~/components/Card";
import { PageTitle } from "~/components/PageTitle";
import { Section, SectionHeader } from "~/components/Section";
import { EmptyState } from "~/components/EmptyState";
import { LineChart } from "~/components/LineChart";
import { BigStat } from "~/components/BigStat";
import { getEventsForEnv } from "~/modules/environments/services/getEventsForEnv";
import { getSession } from "~/sessions";
import { mapToLocaleCount } from "~/modules/environments/services/mapToLocaleCount";
import { LocalCount } from "~/modules/environments/types";
import { CountTable } from "~/modules/environments/components/CountTable";
import { ProjectNavBar } from "~/modules/projects/components/ProjectNavBar";
import { InsightsFilters } from "~/modules/projects/components/InsightsFilters";
import { getMetricsCount } from "~/modules/environments/services/getMetricsCount";
import { toPercentage } from "~/modules/misc/utils/toPercentage";
import { getFlagMetaTitle } from "~/modules/flags/services/getFlagMetaTitle";

export const meta: MetaFunction = ({ matches, params }) => {
  const projectName = getProjectMetaTitle(matches);
  const flagName = getFlagMetaTitle(matches);

  return [
    {
      title: `Progressively | ${projectName} | ${flagName} | Insights`,
    },
  ];
};

type EventHit = {
  [key: string]: number;
} & { date: string };

interface LoaderData {
  pageViewsPerDate: Array<EventHit>;
  eventsPerDate: Array<EventHit>;
  eventsPerDatePerOs: Array<LocalCount>;
  eventsPerDatePerBrowser: Array<LocalCount>;
  eventsPerDatePerReferer: Array<LocalCount>;
  eventsPerDatePerUrl: Array<LocalCount>;
  metricCount: number;
  prevMetricCount: number;
  pageViewCount: number;
  prevPageViewCount: number;
  uniqueVisitorsCount: number;
  bounceRate: number;
}

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData> => {
  const session = await getSession(request.headers.get("Cookie"));
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  const envId = search.get("envId");

  if (!envId) {
    throw redirect("/401");
  }

  const strDays = search.get("days");
  let day = Number(strDays);
  if (!day || Number.isNaN(day)) {
    day = 7;
  }

  const start = new Date();
  start.setDate(start.getDate() - day);

  const end = new Date();
  end.setDate(end.getDate() + 1);

  const authCookie = session.get("auth-cookie");
  const {
    pageViewsPerDate,
    eventsPerDate,
    eventsPerDatePerOs,
    eventsPerDatePerBrowser,
    eventsPerDatePerUrl,
    uniqueVisitorsCount,
    eventsPerDatePerReferer,
    bounceRate,
  } = await getEventsForEnv(envId, start, end, authCookie);

  const metricForDate = await getMetricsCount(envId, start, end, authCookie);

  start.setDate(start.getDate() - day);
  end.setDate(end.getDate() + 1);

  const prevMetricForDate = await getMetricsCount(
    envId,
    start,
    end,
    authCookie
  );

  return {
    pageViewsPerDate,
    eventsPerDate,
    eventsPerDatePerOs: mapToLocaleCount(eventsPerDatePerOs, "os"),
    eventsPerDatePerBrowser: mapToLocaleCount(
      eventsPerDatePerBrowser,
      "browser"
    ),
    metricCount: metricForDate.metricCount,
    prevMetricCount: prevMetricForDate.metricCount,
    pageViewCount: metricForDate.pageViewCount,
    prevPageViewCount: prevMetricForDate.pageViewCount,
    eventsPerDatePerUrl: mapToLocaleCount(eventsPerDatePerUrl, "url"),
    uniqueVisitorsCount,
    eventsPerDatePerReferer: mapToLocaleCount(
      eventsPerDatePerReferer,
      "referer"
    ),
    bounceRate,
  };
};

export default function EnvInsights() {
  const {
    pageViewsPerDate,
    eventsPerDate,
    eventsPerDatePerOs,
    eventsPerDatePerBrowser,
    eventsPerDatePerUrl,
    metricCount,
    prevMetricCount,
    pageViewCount,
    prevPageViewCount,
    uniqueVisitorsCount,
    eventsPerDatePerReferer,
    bounceRate,
  } = useLoaderData<LoaderData>();
  const { project } = useProject();

  const pageViewCountEvolution =
    prevPageViewCount > 0
      ? toPercentage((pageViewCount - prevPageViewCount) / prevPageViewCount)
      : 0;

  const metricCountViewEvolution =
    prevMetricCount > 0
      ? toPercentage((metricCount - prevMetricCount) / prevMetricCount)
      : 0;

  return (
    <DashboardLayout subNav={<ProjectNavBar project={project} />}>
      <PageTitle
        value="Analytics"
        action={
          <InsightsFilters
            projectId={project.uuid}
            environments={project.environments}
          />
        }
      />

      <Section>
        <div className="inline-flex flex-row gap-6">
          <BigStat
            label={"Page views"}
            value={pageViewCount}
            unit={"visits."}
            icon={<div />}
            evolution={pageViewCountEvolution}
          />

          <BigStat
            label={"Unique visitors"}
            value={uniqueVisitorsCount}
            unit={"users."}
            icon={<div />}
          />

          <BigStat
            label={"Bounce Rate"}
            value={bounceRate}
            unit={"%"}
            icon={<div />}
          />
        </div>
      </Section>

      <Section id="pageview-hits">
        <Card>
          <CardContent>
            <SectionHeader title={"Page views over time."} />
          </CardContent>

          {pageViewsPerDate.length > 0 ? (
            <LineChart data={pageViewsPerDate} />
          ) : (
            <CardContent>
              <EmptyState
                title="No data"
                description={"There are no events hits for this period."}
              />
            </CardContent>
          )}
        </Card>
      </Section>

      <div className="grid grid-cols-2 gap-6">
        <Section>
          <Card>
            <CardContent>
              <SectionHeader title="Page views / browser" />
            </CardContent>
            <CountTable
              data={eventsPerDatePerBrowser}
              caption="Page views / browser"
              cellName={"Browser"}
            />
          </Card>
        </Section>

        <Section>
          <Card>
            <CardContent>
              <SectionHeader title="Page views / Os" />
            </CardContent>
            <CountTable
              data={eventsPerDatePerOs}
              caption="Page views / Os"
              cellName={"Os"}
            />
          </Card>
        </Section>

        <Section>
          <Card>
            <CardContent>
              <SectionHeader title="Page views / referer" />
            </CardContent>
            <CountTable
              data={eventsPerDatePerReferer}
              caption="Page views / referer"
              cellName={"Referer"}
            />
          </Card>
        </Section>

        <Section>
          <Card>
            <CardContent>
              <SectionHeader title="Page views / URL" />
            </CardContent>
            <CountTable
              shouldLink
              data={eventsPerDatePerUrl}
              caption="Page views / URL"
              cellName={"Page URL"}
            />
          </Card>
        </Section>
      </div>

      <Section>
        <div className="inline-flex flex-row gap-6">
          <BigStat
            label={"Total metric hits"}
            value={metricCount}
            unit={"hits."}
            icon={<div />}
            evolution={metricCountViewEvolution}
          />
        </div>
      </Section>

      <Section id="other-metric-hits">
        <Card>
          <CardContent>
            <SectionHeader title={"Other metrics over time."} />
          </CardContent>

          {eventsPerDate.length > 0 ? (
            <LineChart data={eventsPerDate} />
          ) : (
            <CardContent>
              <EmptyState
                title="No data"
                description={"There are no events hits for this period."}
              />
            </CardContent>
          )}
        </Card>
      </Section>
    </DashboardLayout>
  );
}
