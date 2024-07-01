import { DashboardLayout } from "~/layouts/DashboardLayout";
import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { Card, CardContent } from "~/components/Card";
import { PageTitle } from "~/components/PageTitle";
import { Section, SectionHeader } from "~/components/Section";
import { EmptyState } from "~/components/EmptyState";
import { BigStat } from "~/components/BigStat";
import { getEventsForFields } from "~/modules/projects/services/getEventsForFields";
import { getSession } from "~/sessions";
import { ProjectNavBar } from "~/modules/projects/components/ProjectNavBar";
import { InsightsFilters } from "~/modules/projects/components/InsightsFilters";
import { getGlobalMetric } from "~/modules/projects/services/getGlobalMetric";
import { getPageViewsGroupedByDate } from "~/modules/projects/services/getPageViewsGroupedByDate";
import { calculateGrowthRate } from "~/modules/misc/utils/calculateGrowthRate";
import { LineChart } from "~/components/LineChart/LineChart";
import { stringToColor } from "~/modules/misc/utils/stringToColor";
import { SearchableCountTable } from "~/modules/analytics/components/SearchableCountTable";
import { getBrowserIcon } from "~/modules/analytics/helpers/getBrowserIcon";
import { getOSIcon } from "~/modules/analytics/helpers/getOSIcon";

export const meta: MetaFunction = ({ matches }) => {
  const projectName = getProjectMetaTitle(matches);

  return [
    {
      title: `Progressively | ${projectName} | Analytics | Page views`,
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

  const [globalMetrics, eventsForFields, pagesViewsGroupedByDateData] =
    await Promise.all([
      getGlobalMetric(projectId, day, authCookie),
      getEventsForFields(projectId, day, authCookie),
      getPageViewsGroupedByDate(projectId, day, authCookie),
    ]);

  const pagesViewsGroupedByDate = [
    {
      id: "Page View",
      color: stringToColor("Page View"),
      data: pagesViewsGroupedByDateData.map((ev) => ({
        x: ev.date,
        y: ev.count,
      })),
    },
  ];

  return {
    globalMetrics,
    eventsForFields,
    pagesViewsGroupedByDate,
  };
};

export default function ProjectInsights() {
  const { globalMetrics, eventsForFields, pagesViewsGroupedByDate } =
    useLoaderData<typeof loader>();

  const { project } = useProject();

  const pageViewCountEvolution = calculateGrowthRate(
    globalMetrics.prevPageViews,
    globalMetrics.pageViews
  );

  const uniqueVisitorEvolution = calculateGrowthRate(
    globalMetrics.prevUniqueVisitors,
    globalMetrics.uniqueVisitors
  );

  const bounceRateEvolution = calculateGrowthRate(
    globalMetrics.prevBounceRate,
    globalMetrics.bounceRate
  );

  return (
    <>
      <DashboardLayout subNav={<ProjectNavBar project={project} />}>
        <PageTitle value="Page Views" action={<InsightsFilters />} />

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
              evolution={uniqueVisitorEvolution}
            />

            <BigStat
              label={"Bounce Rate"}
              value={globalMetrics.bounceRate}
              unit={"%"}
              icon={<div />}
              evolution={bounceRateEvolution}
              inverse
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

        <div className="grid md:grid-cols-2 gap-6">
          <Section>
            <SearchableCountTable
              title="Pages"
              shouldLink
              data={eventsForFields.url}
              caption="Page views / URL"
              cellName={"Page URL"}
              cellKey="url"
              renderLabel={(d) => String(d.url)}
            />
          </Section>

          <Section>
            <SearchableCountTable
              title="Referrers"
              data={eventsForFields.referer}
              caption="Page views / referer"
              cellName={"Referer"}
              cellKey="referer"
              renderLabel={(d) => String(d.referer)}
            />
          </Section>

          <Section>
            <SearchableCountTable
              title="Browsers"
              data={eventsForFields.browser}
              caption="Page views / browser"
              cellName={"Browser"}
              cellKey="browser"
              renderLabel={(d) => String(d.browser)}
              renderIcon={(d) => getBrowserIcon(String(d.browser))}
            />
          </Section>

          <Section>
            <SearchableCountTable
              title="Operating systems"
              data={eventsForFields.os}
              caption="Page views / Os"
              cellName={"Os"}
              cellKey="os"
              renderLabel={(d) => String(d.os)}
              renderIcon={(d) => getOSIcon(String(d.os))}
            />
          </Section>

          <Section>
            <SearchableCountTable
              title="Viewport (w x h)"
              data={eventsForFields.viewport}
              caption="Page views / Viewport (Width x Height)"
              cellName={"Viewport"}
              cellKey="viewport"
              renderLabel={(d) => `${d.viewportWidth} / ${d.viewportHeight}`}
            />
          </Section>
        </div>
      </DashboardLayout>
      <Outlet />
    </>
  );
}
