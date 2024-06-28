import { DashboardLayout } from "~/layouts/DashboardLayout";
import {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { PageTitle } from "~/components/PageTitle";
import { getSession } from "~/sessions";
import { ProjectNavBar } from "~/modules/projects/components/ProjectNavBar";
import { InsightsFilters } from "~/modules/projects/components/InsightsFilters";
import { getEventHotSpots } from "~/modules/projects/services/getEventHotSpots";
import { HotSpotList } from "~/modules/analytics/components/HotSpotsLits";
import { useEffect } from "react";

export const meta: MetaFunction = ({ matches }) => {
  const projectName = getProjectMetaTitle(matches);

  return [
    {
      title: `Progressively | ${projectName} | Analytics | Hot Spots`,
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

  const hotSpots = await getEventHotSpots(projectId, day, authCookie);

  return {
    hotSpots,
  };
};

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();

  const url = formData.get("url")?.toString();
  const projectId = params.id!;

  console.log("yoooooo");

  if (!url) {
    throw redirect(`/dashboard/projects/${projectId}/analytics/hot-spots`);
  }

  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  return {
    url,
    accessToken: authCookie,
    time: Date.now(),
  };
};

export default function HotSpotsInsights() {
  const { hotSpots } = useLoaderData<typeof loader>();
  const { project } = useProject();

  const actionData = useActionData<typeof action>();
  const { accessToken, url, time } = actionData || {};

  useEffect(() => {
    if (!accessToken) return;
    if (!url) return;

    const virtualA = document.createElement("a");
    virtualA.href = `${url}?__progressivelyProjectId=${project.uuid}#__progressively=${accessToken}`;
    virtualA.target = "_blank";
    virtualA.click();
  }, [accessToken, url, project.uuid, time]);

  return (
    <>
      <DashboardLayout subNav={<ProjectNavBar project={project} />}>
        <PageTitle value="Hot spots" action={<InsightsFilters />} />

        <div>
          {hotSpots.map((h) => (
            <Form id={h.url} key={`hot-spot-form-${h.url}`} method="post">
              <input type="hidden" name="url" value={h.url} />
            </Form>
          ))}

          <HotSpotList items={hotSpots} />
        </div>
      </DashboardLayout>
    </>
  );
}
