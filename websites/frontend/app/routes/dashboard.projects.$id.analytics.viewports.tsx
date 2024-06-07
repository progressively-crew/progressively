import {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { getSession } from "~/sessions";
import { useEffect } from "react";
import { DialogCloseBtn } from "~/components/Dialog/Dialog";
import { CreateEntityLayout } from "~/layouts/CreateEntityLayout";
import { CreateEntityTitle } from "~/layouts/CreateEntityTitle";
import { getDistinctViewport } from "~/modules/projects/services/getDistinctViewport";
import { Device } from "~/components/Device";

export const meta: MetaFunction = ({ matches }) => {
  const projectName = getProjectMetaTitle(matches);

  return [
    {
      title: `Progressively | ${projectName} | Analytics | Viewports`,
    },
  ];
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const viewportWidth = formData.get("viewport-width")?.toString();

  if (!viewportWidth) {
    throw redirect("..");
  }

  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  return {
    accessToken: authCookie,
    viewportWidth,
    time: Date.now(),
  };
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);

  const websiteUrl = search.get("url");

  if (!websiteUrl) {
    throw redirect("..");
  }

  const strDays = search.get("days");
  let day = Number(strDays);
  if (!day || Number.isNaN(day)) {
    day = 7;
  }

  const projectId = params.id!;
  const authCookie = session.get("auth-cookie");

  const viewports = await getDistinctViewport(
    projectId,
    websiteUrl,
    day,
    authCookie
  );

  return {
    websiteUrl,
    viewports,
  };
};

export default function ProjectInsights() {
  const { project } = useProject();
  const { viewports, websiteUrl } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const { accessToken, viewportWidth } = actionData || {};

  useEffect(() => {
    if (!accessToken) return;
    if (!websiteUrl) return;
    if (!viewportWidth) return;

    window.open(
      `${websiteUrl}?__progressivelyProjectId=${project.uuid}&viewportWidth=${viewportWidth}#__progressively=${accessToken}`,
      "Quantitive analytics details",
      `width=${viewportWidth},height=600`
    );
  }, [accessToken, websiteUrl, project.uuid, viewportWidth]);

  return (
    <CreateEntityLayout
      titleSlot={<CreateEntityTitle>Available viewports</CreateEntityTitle>}
      closeSlot={
        <DialogCloseBtn
          to={`/dashboard/projects/${project.uuid}/analytics`}
          label={`Back to analytics`}
        />
      }
    >
      <div className="grid grid-cols-4 gap-2">
        {viewports.map(({ viewportWidth }: any) => (
          <Form
            method="post"
            className="flex flex-col flex-1"
            key={viewportWidth}
          >
            <button
              type="submit"
              className="bg-gray-50 p-4 rounded-lg flex items-center justify-center flex-col gap-2 hover:bg-gray-100 active:bg-gray-100"
            >
              <input type="hidden" name="time" value={Date.now()} />
              <input
                type="hidden"
                name="viewport-width"
                value={viewportWidth}
              />
              <Device width={viewportWidth} />
            </button>
          </Form>
        ))}
      </div>
    </CreateEntityLayout>
  );
}
