import { DashboardLayout } from "~/layouts/DashboardLayout";
import { LoaderFunction, V2_MetaFunction } from "@remix-run/node";
import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { getFlagEnvMetaTitle } from "~/modules/flags/services/getFlagEnvMetaTitle";
import { Card, CardContent } from "~/components/Card";
import { PageTitle } from "~/components/PageTitle";
import { Section, SectionHeader } from "~/components/Section";
import { EmptyState } from "~/components/EmptyState";
import { LineChart } from "~/components/LineChart";
import { BigStat } from "~/components/BigStat";
import { EnvNavBar } from "~/modules/environments/components/EnvNavBar";
import { getEventsForEnv } from "~/modules/environments/services/getEventsForEnv";
import { getSession } from "~/sessions";

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

type EventHit = {
  [key: string]: number;
} & { date: string };

interface LoaderData {
  eventsPerDate: number;
  metricsHitsPerDate: Array<EventHit>;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const session = await getSession(request.headers.get("Cookie"));
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);

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
  const eventsPerDate = await getEventsForEnv(
    params.env!,
    start,
    end,
    authCookie
  );

  return {
    eventsPerDate,
    metricsHitsPerDate: [],
  };
};

export default function EnvInsights() {
  const { eventsPerDate, metricsHitsPerDate } = useLoaderData<LoaderData>();
  const { project } = useProject();
  const { environment } = useEnvironment();
  const [searchParams] = useSearchParams();

  const days = searchParams.get("days") || "7";

  const shareButtonClass =
    "h-10 px-4 gap-4 bg-transparent hover:bg-slate-100 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-600 relative whitespace-nowrap inline-flex items-center justify-center rounded-sm text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900";

  const activeClass = `!bg-slate-100`;

  return (
    <DashboardLayout
      subNav={<EnvNavBar project={project} environment={environment} />}
    >
      <PageTitle value="Insights" />

      <div className="inline-flex">
        <Card>
          <div className="inline-flex flex-row gap-1 p-1">
            <Link
              to="?days=7"
              className={`${shareButtonClass} ${
                days === "7" ? activeClass : ""
              }`}
            >
              7 days
            </Link>

            <Link
              to="?days=30"
              className={`${shareButtonClass} ${
                days === "30" ? activeClass : ""
              }`}
            >
              30 days
            </Link>

            <Link
              to="?days=90"
              className={`${shareButtonClass} ${
                days === "90" ? activeClass : ""
              }`}
            >
              90 days
            </Link>
          </div>
        </Card>
      </div>

      <Section>
        <div className="inline-flex flex-row gap-6">
          <BigStat
            label={"Total metric hits"}
            value={eventsPerDate}
            unit={"hits."}
            icon={<div />}
          />
        </div>
      </Section>

      <Section id="metric-hits">
        <Card>
          <CardContent>
            <SectionHeader title={"Metric hits."} />
          </CardContent>

          {metricsHitsPerDate.length > 0 ? (
            <LineChart data={metricsHitsPerDate} />
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
