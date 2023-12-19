import { DashboardLayout } from "~/layouts/DashboardLayout";
import { LoaderFunction, V2_MetaFunction, redirect } from "@remix-run/node";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { getFlagEnvMetaTitle } from "~/modules/flags/services/getFlagEnvMetaTitle";
import { Card, CardContent } from "~/components/Card";
import { PageTitle } from "~/components/PageTitle";
import { Section } from "~/components/Section";
import { ProjectNavBar } from "~/modules/projects/components/ProjectNavBar";
import { InsightsFilters } from "~/modules/projects/components/InsightsFilters";
import { BarChart } from "~/components/BarChart";
import { Typography } from "~/components/Typography";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { Outlet, useLoaderData, useSearchParams } from "@remix-run/react";
import { getFunnels } from "~/modules/environments/services/getFunnels";
import { Funnel } from "~/modules/environments/types";
import { getSession } from "~/sessions";

export const meta: V2_MetaFunction = ({ matches, params }) => {
  const projectName = getProjectMetaTitle(matches);
  const envName = getEnvMetaTitle(matches, params.env!);
  const flagName = getFlagEnvMetaTitle(matches);

  return [
    {
      title: `Progressively | ${projectName} | ${envName} | ${flagName} | Funnels`,
    },
  ];
};

export interface LoaderData {
  funnels: Array<Funnel>;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const session = await getSession(request.headers.get("Cookie"));
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  const envId = params.env || search.get("envId");

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

  const funnels: Array<Funnel> = await getFunnels(
    envId,
    start,
    end,
    authCookie
  );

  return { funnels };
};

export default function FunnelsPage() {
  const { project } = useProject();
  const { funnels } = useLoaderData<LoaderData>();
  const [searchParams] = useSearchParams();
  const chartData = [
    {
      name: "New homepage",
      value: 122,
    },
    {
      name: "New homepage track cta",
      value: 145,
    },
  ];

  const envId = searchParams.get("envId") || project.environments[0] || "";

  return (
    <>
      <DashboardLayout subNav={<ProjectNavBar project={project} />}>
        <PageTitle
          value="Funnels"
          action={
            <div className="flex flex-row items-center gap-8">
              <CreateButton to={`./${envId}/create`}>
                Create a funnel
              </CreateButton>
              <InsightsFilters
                projectId={project.uuid}
                environments={project.environments}
              />
            </div>
          }
        />
        <Section>
          <div className="grid grid-cols-2 gap-8">
            {funnels.map((funnel) => (
              <Card key={funnel.uuid}>
                <CardContent>
                  <div className="flex flex-row justify-between">
                    <div>
                      <Typography
                        as="h2"
                        className="font-semibold text-xl pb-4"
                      >
                        {funnel.name}
                      </Typography>
                      <Typography className="text-6xl font-extrabold">
                        5%
                      </Typography>
                    </div>
                    <div className="flex flex-row gap-4 items-center">
                      <BarChart data={chartData} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>
      </DashboardLayout>

      <Outlet />
    </>
  );
}