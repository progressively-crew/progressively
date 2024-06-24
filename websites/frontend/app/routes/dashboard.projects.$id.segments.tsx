import { DashboardLayout } from "~/layouts/DashboardLayout";
import { ActionFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { PageTitle } from "~/components/PageTitle";
import { Section } from "~/components/Section";
import qs from "qs";
import { ProjectNavBar } from "~/modules/projects/components/ProjectNavBar";
import { Form, useLoaderData } from "@remix-run/react";
import { getSession } from "~/sessions";
import { getSegments } from "~/modules/segments/services/getSegments";
import { Segment } from "~/modules/segments/types";
import { SegmentItem } from "~/modules/segments/components/SegmentItem";
import { BigButton } from "~/components/BigButton";
import { upsertSegments } from "~/modules/segments/services/upsertSegments";
import { deleteSegment } from "~/modules/segments/services/deleteSegment";
import { editSegmentAction } from "~/modules/segments/form-actions/editSegmentAction";
import { SubmitButton } from "~/components/Buttons/SubmitButton";

export const meta: MetaFunction = ({ matches }) => {
  const projectName = getProjectMetaTitle(matches);

  return [
    {
      title: `Progressively | ${projectName} | Segments`,
    },
  ];
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");
  const segments = await getSegments(params.id!, authCookie);

  return { segments };
};

export const action: ActionFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const clonedRequest = request.clone();
  const formData = await request.formData();
  const type = formData.get("_type");

  if (type === "add-segment") {
    return await upsertSegments(
      params.id!,
      [{ name: "New segment", segmentRules: [] }],
      authCookie
    );
  }

  if (type === "delete-segment") {
    const uuid = formData.get("uuid")?.toString();
    if (uuid) {
      await deleteSegment(uuid, authCookie);
    }
  }

  if (type === "update-segment") {
    const formQueryString = await clonedRequest.text();
    const formObject = qs.parse(formQueryString, { depth: 4 });

    return editSegmentAction(params.id!, formObject, authCookie);
  }

  return null;
};

export default function FunnelsPage() {
  const { project } = useProject();
  const { segments } = useLoaderData<{ segments: Array<Segment> }>();

  return (
    <DashboardLayout subNav={<ProjectNavBar project={project} />}>
      <PageTitle
        value="Segments"
        action={
          segments.length > 0 && (
            <SubmitButton type="submit" form="save-segments">
              Save segments
            </SubmitButton>
          )
        }
      />

      <Section>
        {segments.map((segment) => {
          const id = `delete-segment-${segment.uuid}`;

          return (
            <Form method="post" id={id} key={id}>
              <input type="hidden" value="delete-segment" name="_type" />
              <input type="hidden" value={segment.uuid} name="uuid" />
            </Form>
          );
        })}

        <Form method="post" id="save-segments">
          <input type="hidden" name="_type" value="update-segment" />
          <div className="flex flex-col">
            {segments.map((segment, index: number) => (
              <SegmentItem key={segment.uuid} segment={segment} index={index} />
            ))}
          </div>
        </Form>

        <Form method="post" className="pt-4">
          <input type="hidden" name="_type" value="add-segment" />
          <BigButton isLoading={false}>Add a segment</BigButton>
        </Form>
      </Section>
    </DashboardLayout>
  );
}
