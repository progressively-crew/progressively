import { ActionFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { Card, CardContent } from "~/components/Card";
import { EmptyState } from "~/components/EmptyState";
import { PageTitle } from "~/components/PageTitle";
import { Typography } from "~/components/Typography";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { FlagEnvMenu } from "~/modules/flags/components/FlagEnvMenu";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { toggleFlagAction } from "~/modules/flags/form-actions/toggleFlagAction";
import { getFlagEnvMetaTitle } from "~/modules/flags/services/getFlagEnvMetaTitle";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { SegmentList } from "~/modules/segments/components/SegmentList";
import { getSegments } from "~/modules/segments/services/getSegments";
import { Segment } from "~/modules/segments/types";
import { getSession } from "~/sessions";

export const meta: MetaFunction = ({ matches, params }) => {
  const projectName = getProjectMetaTitle(matches);
  const envName = getEnvMetaTitle(matches, params.env!);
  const flagName = getFlagEnvMetaTitle(matches);

  return [
    {
      title: `Progressively | ${projectName} | ${envName} | Flags | ${flagName} | Segments`,
    },
  ];
};

interface LoaderData {
  segments: Array<Segment>;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const segments: Array<Segment> = await getSegments(
    params.env!,
    params.flagId!,
    authCookie
  );

  return {
    segments,
  };
};

type ActionDataType = null | {
  errors?: { [key: string]: string | undefined };
};

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<ActionDataType> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");
  const formData = await request.formData();
  const type = formData.get("_type");

  if (type === "toggle-flag") {
    return toggleFlagAction(formData, params, authCookie);
  }

  return null;
};

export default function Segments() {
  const { project } = useProject();
  const { environment } = useEnvironment();
  const { flagEnv } = useFlagEnv();
  const { segments } = useLoaderData<LoaderData>();
  const [searchParams] = useSearchParams();
  const currentFlag = flagEnv.flag;

  const isSegmentRemoved = searchParams.get("segmentRemoved") || undefined;
  const isSegmentAdded = searchParams.get("newSegment") || undefined;

  const hasSegments = segments.length > 0;

  return (
    <DashboardLayout
      subNav={
        <FlagEnvMenu
          projectId={project.uuid}
          envId={environment.uuid}
          flagEnv={flagEnv}
        />
      }
      status={
        isSegmentRemoved ? (
          <SuccessBox id="segment-removed">
            The segment has been successfully removed.
          </SuccessBox>
        ) : isSegmentAdded ? (
          <SuccessBox id="segment-added">
            The segment has been successfully added.
          </SuccessBox>
        ) : null
      }
    >
      <PageTitle
        value="Segments"
        description={
          <Typography>
            Group your users using rules for an easier targeting.
          </Typography>
        }
        action={
          hasSegments && (
            <CreateButton
              to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/segments/create`}
            >
              Create a segment
            </CreateButton>
          )
        }
      />

      {!hasSegments && (
        <Card>
          <CardContent>
            <EmptyState
              titleAs="h2"
              title="No segments found"
              description={"There are no segments for this flag."}
              action={
                <CreateButton
                  to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/segments/create`}
                >
                  Create a segment
                </CreateButton>
              }
            />
          </CardContent>
        </Card>
      )}

      {hasSegments && (
        <Card>
          <SegmentList
            segments={segments}
            projectId={project.uuid}
            envId={environment.uuid}
            flagId={currentFlag.uuid}
          />
        </Card>
      )}
    </DashboardLayout>
  );
}
