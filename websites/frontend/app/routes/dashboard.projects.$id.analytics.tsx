import { DashboardLayout } from "~/layouts/DashboardLayout";
import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { Card, CardContent } from "~/components/Card";
import { PageTitle } from "~/components/PageTitle";
import { Section, SectionHeader } from "~/components/Section";
import { EmptyState } from "~/components/EmptyState";
import { LineChart } from "~/components/LineChart";
import { BigStat } from "~/components/BigStat";
import { getEventsForFields } from "~/modules/projects/services/getEventsForFields";
import { getSession } from "~/sessions";
import { CountTable } from "~/modules/projects/components/CountTable";
import { ProjectNavBar } from "~/modules/projects/components/ProjectNavBar";
import { InsightsFilters } from "~/modules/projects/components/InsightsFilters";
import { getGlobalMetric } from "~/modules/projects/services/getGlobalMetric";
import { getPageViewsGroupedByDate } from "~/modules/projects/services/getPageViewsGroupedByDate";
import { getEventsGroupedByDate } from "~/modules/projects/services/getEventsGroupedByDate";

export const meta: MetaFunction = ({ matches }) => {
  const projectName = getProjectMetaTitle(matches);

  return [
    {
      title: `Progressively | ${projectName} | Analytics`,
    },
  ];
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);

  const strDays = search.get("days");
  let day = Number(strDays);
  if (!day || Number.isNaN(day)) {
    day = 7;
  }

  const projectId = params.id!;

  const authCookie = session.get("auth-cookie");

  const [
    globalMetrics,
    eventsForFields,
    pagesViewsGroupedByDate,
    eventsGroupedByDateData,
  ] = await Promise.all([
    getGlobalMetric(projectId, day, authCookie),
    getEventsForFields(projectId, day, authCookie),
    getPageViewsGroupedByDate(projectId, day, authCookie),
    getEventsGroupedByDate(projectId, day, authCookie),
  ]);

  const dateDict: Record<any, any> = {};
  const eventDict: Record<string, number> = {};
  let metricTotalCount: number = 0;

  for (const ev of eventsGroupedByDateData) {
    // Helps filling the missing values in the linechart. The idea is to make the line drop to 0
    // when it should. This dictionnary will basically fill 0 for every available events
    eventDict[ev.name] = 0;

    if (!dateDict[ev.date]) {
      dateDict[ev.date] = {};
    }

    metricTotalCount += ev.count;
    dateDict[ev.date][ev.name] = ev.count;
  }

  const eventsGroupedByDate = Object.keys(dateDict).map((date) => ({
    date,
    ...eventDict,
    ...dateDict[date],
  }));

  return {
    metricTotalCount,
    globalMetrics,
    eventsForFields,
    pagesViewsGroupedByDate,
    eventsGroupedByDate,
  };
};

export default function ProjectInsights() {
  const {
    metricTotalCount,
    globalMetrics,
    eventsForFields,
    pagesViewsGroupedByDate,
    eventsGroupedByDate,
  } = useLoaderData<typeof loader>();
  const { project } = useProject();
  const pageViewCountEvolution = 0;
  const metricCountViewEvolution = 0;

  return (
    <DashboardLayout subNav={<ProjectNavBar project={project} />}>
      <PageTitle value="Analytics" action={<InsightsFilters />} />

      <Section>
        <h2 className="sr-only">Global metrics</h2>
        <div className="grid grid-cols-2 md:inline-flex flex-row gap-6">
          <BigStat
            label={"Page views"}
            value={globalMetrics.pageViews}
            unit={"visits."}
            icon={<div />}
            evolution={pageViewCountEvolution}
          />

          <BigStat
            label={"Unique visitors"}
            value={globalMetrics.uniqueVisitors}
            unit={"users."}
            icon={<div />}
          />

          <BigStat
            label={"Bounce Rate"}
            value={globalMetrics.bounceRate}
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

          {pagesViewsGroupedByDate.length > 0 ? (
            <LineChart data={pagesViewsGroupedByDate} />
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

      <div className="grid md:grid-cols-3 gap-6">
        <Section>
          <Card>
            <CardContent>
              <SectionHeader title="Page views / browser" />
            </CardContent>
            <CountTable
              data={eventsForFields.browser}
              caption="Page views / browser"
              cellName={"Browser"}
              cellKey="browser"
              renderLabel={(d) => String(d.browser)}
            />
          </Card>
        </Section>

        <Section>
          <Card>
            <CardContent>
              <SectionHeader title="Page views / Os" />
            </CardContent>
            <CountTable
              data={eventsForFields.os}
              caption="Page views / Os"
              cellName={"Os"}
              cellKey="os"
              renderLabel={(d) => String(d.os)}
            />
          </Card>
        </Section>

        <Section>
          <Card>
            <CardContent>
              <SectionHeader title="Page views / Viewport (Width x Height)" />
            </CardContent>
            <CountTable
              data={eventsForFields.viewport}
              caption="Page views / Viewport (Width x Height)"
              cellName={"Viewport"}
              cellKey="viewport"
              renderLabel={(d) => `${d.viewportWidth} / ${d.viewportHeight}`}
            />
          </Card>
        </Section>

        <Section>
          <Card>
            <CardContent>
              <SectionHeader title="Page views / referer" />
            </CardContent>
            <CountTable
              data={eventsForFields.referer}
              caption="Page views / referer"
              cellName={"Referer"}
              cellKey="referer"
              renderLabel={(d) => String(d.referer)}
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
              data={eventsForFields.url}
              caption="Page views / URL"
              cellName={"Page URL"}
              cellKey="url"
              renderLabel={(d) => String(d.url)}
            />
          </Card>
        </Section>
      </div>

      <Section>
        <div className="inline-flex flex-row gap-6">
          <BigStat
            label={"Total metric hits"}
            value={metricTotalCount}
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

          {eventsGroupedByDate.length > 0 ? (
            <LineChart data={eventsGroupedByDate} />
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
