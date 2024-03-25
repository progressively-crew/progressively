import { DashboardLayout } from "~/layouts/DashboardLayout";
import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { Card, CardContent } from "~/components/Card";
import { PageTitle } from "~/components/PageTitle";
import { Section } from "~/components/Section";
import { ProjectNavBar } from "~/modules/projects/components/ProjectNavBar";
import { InsightsFilters } from "~/modules/projects/components/InsightsFilters";
import { BarChart } from "~/components/BarChart";
import { Typography } from "~/components/Typography";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getFunnels } from "~/modules/projects/services/getFunnels";
import { getSession } from "~/sessions";
import { FunnelChart } from "~/modules/funnels/types";
import { EmptyState } from "~/components/EmptyState";

export const meta: MetaFunction = ({ matches }) => {
  const projectName = getProjectMetaTitle(matches);

  return [
    {
      title: `Progressively | ${projectName} | Funnels`,
    },
  ];
};

export interface LoaderData {
  funnels: Array<FunnelChart>;
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

  const funnels: Array<FunnelChart> = await getFunnels(
    params.id!,
    start,
    end,
    authCookie
  );

  return { funnels };
};

export default function FunnelsPage() {
  const { project } = useProject();
  const { funnels } = useLoaderData<LoaderData>();

  const hasFunnels = funnels.length > 0;

  return (
    <>
      <DashboardLayout subNav={<ProjectNavBar project={project} />}>
        <PageTitle
          value="Funnels"
          action={
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              {hasFunnels && (
                <CreateButton to={`./create`}>Create a funnel</CreateButton>
              )}
              <InsightsFilters />
            </div>
          }
        />

        {!hasFunnels && (
          <Card>
            <CardContent>
              <EmptyState
                titleAs="h2"
                title="No funnels found"
                description={"There are no funnels for this project."}
                action={
                  <CreateButton
                    to={`/dashboard/projects/${project.uuid}/funnels/create`}
                  >
                    Create a funnel
                  </CreateButton>
                }
              />
            </CardContent>
          </Card>
        )}

        <Section>
          <div className="flex flex-col gap-4">
            {funnels.map((funnelChart) => {
              const firstChart = funnelChart.funnelStats[0];
              const lastChart = funnelChart.funnelStats.at(-1);
              const percentage =
                firstChart?.count && lastChart?.count
                  ? (lastChart.count / firstChart.count) * 100
                  : 0;

              return (
                <Card key={funnelChart.funnel.uuid}>
                  <div className="grid md:grid-cols-[2fr_1fr] overflow-x-scroll">
                    <CardContent>
                      <div>
                        <Typography as="h2" className="font-semibold pb-4">
                          {funnelChart.funnel.name}
                        </Typography>

                        <div className="flex flex-row gap-4 items-center">
                          <BarChart
                            data={funnelChart.funnelStats.map((stat) => ({
                              name: stat.event,
                              value: stat.count,
                            }))}
                          />
                        </div>
                      </div>
                    </CardContent>

                    <div className="bg-slate-50 md:border-l md:border-slate-200 flex flex-col md:justify-center md:items-center md:text-center px-4 rounded-r py-4 md:py-0">
                      <Typography className="text-6xl font-extrabold">
                        {percentage.toFixed(2)}%
                      </Typography>
                      <Typography className="text-xs">
                        of conversion from the first to the last event.
                      </Typography>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </Section>
      </DashboardLayout>

      <Outlet />
    </>
  );
}
