import { DashboardLayout } from "~/layouts/DashboardLayout";
import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { Card, CardContent } from "~/components/Card";
import { PageTitle } from "~/components/PageTitle";
import { Section, SectionHeader } from "~/components/Section";
import { EmptyState } from "~/components/EmptyState";
import { getSession } from "~/sessions";
import { ProjectNavBar } from "~/modules/projects/components/ProjectNavBar";
import { InsightsFilters } from "~/modules/projects/components/InsightsFilters";
import { getEventsGroupedByDate } from "~/modules/projects/services/getEventsGroupedByDate";
import { LineChart } from "~/components/LineChart/LineChart";
import { stringToColor } from "~/modules/misc/utils/stringToColor";
import { BigStat } from "~/components/BigStat";

export const meta: MetaFunction = ({ matches }) => {
  const projectName = getProjectMetaTitle(matches);

  return [
    {
      title: `Progressively | ${projectName} | Analytics | Custom metrics`,
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

  const [eventsGroupedByDateData] = await Promise.all([
    getEventsGroupedByDate(projectId, day, authCookie),
  ]);

  const entriesDict: Record<any, any> = {};
  let metricTotalCount: number = 0;

  for (const ev of eventsGroupedByDateData) {
    if (!entriesDict[ev.name]) {
      entriesDict[ev.name] = { data: [] };
    }

    metricTotalCount += ev.count;
    entriesDict[ev.name].data.push({ x: ev.date, y: ev.count });
  }

  const eventsGroupedByDate = Object.keys(entriesDict).map((valueResolved) => ({
    id: valueResolved,
    color: stringToColor(valueResolved),
    ...entriesDict[valueResolved],
  }));

  return {
    metricTotalCount,
    eventsGroupedByDate,
  };
};

export default function ProjectAnalyticsCustomMetrics() {
  const { eventsGroupedByDate, metricTotalCount } =
    useLoaderData<typeof loader>();
  const { project } = useProject();

  return (
    <>
      <DashboardLayout subNav={<ProjectNavBar project={project} />}>
        <PageTitle value="Custom events" action={<InsightsFilters />} />

        <Section>
          <div className="inline-flex flex-row gap-6">
            <BigStat
              label={"Total metric hits"}
              value={metricTotalCount}
              unit={"hits."}
              icon={<div />}
            />
          </div>
        </Section>

        <Section id="custom-metric-hits">
          <Card>
            <CardContent>
              <SectionHeader title={"Custom metrics over time."} />
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
      <Outlet />
    </>
  );
}
