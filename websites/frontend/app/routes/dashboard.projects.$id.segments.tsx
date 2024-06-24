import { DashboardLayout } from "~/layouts/DashboardLayout";
import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { Card, CardContent } from "~/components/Card";
import { PageTitle } from "~/components/PageTitle";
import { Section } from "~/components/Section";
import { ProjectNavBar } from "~/modules/projects/components/ProjectNavBar";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { useLoaderData } from "@remix-run/react";
import { getSession } from "~/sessions";
import { EmptyState } from "~/components/EmptyState";
import { getSegments } from "~/modules/segments/services/getSegments";
import { Segment } from "~/modules/segments/types";
import { SegmentItem } from "~/modules/segments/components/SegmentItem";

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

export default function FunnelsPage() {
  const { project } = useProject();
  const { segments } = useLoaderData<{ segments: Array<Segment> }>();

  return (
    <DashboardLayout subNav={<ProjectNavBar project={project} />}>
      <PageTitle value="Segments" />

      <Section>
        {segments.map((segment) => (
          <SegmentItem key={segment.uuid} segment={segment} />
        ))}
      </Section>
    </DashboardLayout>
  );
}
