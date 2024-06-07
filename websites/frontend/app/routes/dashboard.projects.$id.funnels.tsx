import { DashboardLayout } from "~/layouts/DashboardLayout";
import { ActionFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { Card, CardContent } from "~/components/Card";
import { PageTitle } from "~/components/PageTitle";
import { Section } from "~/components/Section";
import { ProjectNavBar } from "~/modules/projects/components/ProjectNavBar";
import { InsightsFilters } from "~/modules/projects/components/InsightsFilters";
import { Typography } from "~/components/Typography";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { Form, Outlet, useActionData, useLoaderData } from "@remix-run/react";
import { getFunnels } from "~/modules/projects/services/getFunnels";
import { getSession } from "~/sessions";
import { FunnelChart as FunnelChartType } from "~/modules/funnels/types";
import { EmptyState } from "~/components/EmptyState";
import { IconButton } from "~/components/Buttons/IconButton";
import { IoMdClose } from "react-icons/io";
import { deleteFunnel } from "~/modules/projects/services/deleteFunnel";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { UserRoles } from "~/modules/projects/types";
import { FunnelChart } from "~/components/FunnelChart/FunnelChart";
import { stringToColor } from "~/modules/misc/utils/stringToColor";

export const meta: MetaFunction = ({ matches }) => {
  const projectName = getProjectMetaTitle(matches);

  return [
    {
      title: `Progressively | ${projectName} | Funnels`,
    },
  ];
};

export const action: ActionFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");
  const formData = await request.formData();
  const funnelId = formData.get("funnelId")?.toString();

  if (!funnelId) {
    return null;
  }

  await deleteFunnel(params.id!, funnelId, authCookie);

  return {
    successfullyDeleted: true,
  };
};

type FunnelData = {
  funnel: FunnelChartType;
  data: {
    id: string;
    value: number;
    label: string;
  }[];
}[];

export const loader: LoaderFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);

  const strDays = search.get("days");
  let day = Number(strDays);
  if (!day || Number.isNaN(day)) {
    day = 7;
  }

  const authCookie = session.get("auth-cookie");

  const funnels: Array<FunnelChart> = await getFunnels(
    params.id!,
    day,
    authCookie
  );

  const funnelsData = funnels.map((funnel) => {
    const data = funnel.funnelsEntries.map((entry) => ({
      id: entry.name,
      value: entry.count,
      label: entry.name,
      color: stringToColor(entry.name, 75),
    }));

    return { funnel, data };
  });

  return { funnelsData };
};

export default function FunnelsPage() {
  const { project, userRole } = useProject();
  const actionData = useActionData<typeof action>();
  const { funnelsData } = useLoaderData<{ funnelsData: FunnelData }>();

  const hasFunnels = funnelsData.length > 0;

  return (
    <>
      <DashboardLayout
        subNav={<ProjectNavBar project={project} />}
        status={
          actionData?.successfullyDeleted ? (
            <SuccessBox id={"successfullyDeleted"}>
              Funnel succesfully deleted
            </SuccessBox>
          ) : null
        }
      >
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
          description="Funnels uses individual visitor identifiers and not the events themselves. The number may vary between the number of events and the numbers you are seeing here."
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
            {funnelsData.map((funnelData) => {
              const firstChart = funnelData.data[0];
              const lastChart = funnelData.data.at(-1);
              const percentage =
                firstChart?.value && lastChart?.value
                  ? (lastChart.value / firstChart.value) * 100
                  : 0;

              return (
                <Card key={funnelData.funnel.uuid}>
                  <Form method="post">
                    <div className="grid md:grid-cols-[2fr_1fr] overflow-x-scroll">
                      <CardContent>
                        <div>
                          <Typography as="h2" className="font-semibold pb-4">
                            {funnelData.funnel.name}
                          </Typography>

                          <FunnelChart data={funnelData.data} />
                        </div>
                      </CardContent>

                      <div className="bg-gray-50 md:border-l md:border-gray-200 flex flex-col md:justify-center md:items-center md:text-center px-4 rounded-r py-4 md:py-0 relative">
                        {userRole === UserRoles.Admin && (
                          <div className="absolute right-2 top-2">
                            <IconButton
                              type="submit"
                              icon={
                                <IoMdClose className="text-xl text-gray-400" />
                              }
                              tooltip="Remove funnel"
                              name="funnelId"
                              value={funnelData.funnel.uuid}
                            />
                          </div>
                        )}
                        <Typography className="text-6xl font-extrabold">
                          {percentage.toFixed(2)}%
                        </Typography>
                        <Typography className="text-xs">
                          of conversion from the first to the last event.
                        </Typography>
                      </div>
                    </div>
                  </Form>
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
