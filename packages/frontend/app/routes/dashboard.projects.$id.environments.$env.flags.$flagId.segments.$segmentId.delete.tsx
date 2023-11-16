import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { getSession } from "~/sessions";
import { Button } from "~/components/Buttons/Button";
import { DeleteEntityLayout } from "~/layouts/DeleteEntityLayout";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { ActionFunction, redirect, V2_MetaFunction } from "@remix-run/node";
import { useActionData, Form, useNavigation } from "@remix-run/react";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { getFlagEnvMetaTitle } from "~/modules/flags/services/getFlagEnvMetaTitle";
import { Stack } from "~/components/Stack";
import { Typography } from "~/components/Typography";
import { BackLink } from "~/components/BackLink";
import { DeleteEntityTitle } from "~/layouts/DeleteEntityTitle";
import { deleteSegment } from "~/modules/segments/services/deleteSegment";

export const meta: V2_MetaFunction = ({ matches, params }) => {
  const projectName = getProjectMetaTitle(matches);
  const envName = getEnvMetaTitle(matches, params.env!);
  const flagName = getFlagEnvMetaTitle(matches);

  return [
    {
      title: `Progressively | ${projectName} | ${envName} | ${flagName} | Segments | Delete`,
    },
  ];
};

interface ActionData {
  errors?: {
    backendError?: string;
  };
}

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<ActionData | Response> => {
  const session = await getSession(request.headers.get("Cookie"));
  const projectId = params.id!;
  const envId = params.env!;
  const flagId = params.flagId!;

  try {
    await deleteSegment(
      envId,
      flagId,
      params.segmentId!,
      session.get("auth-cookie")
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { backendError: error.message } };
    }

    return { errors: { backendError: "An error ocurred" } };
  }

  return redirect(
    `/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/segments?segmentRemoved=true#segment-removed`
  );
};

export default function DeleteSegmentPage() {
  const navigation = useNavigation();
  const data = useActionData<ActionData>();
  const { project } = useProject();
  const { environment } = useEnvironment();
  const { flagEnv } = useFlagEnv();

  const currentFlag = flagEnv.flag;

  return (
    <DeleteEntityLayout
      error={
        data?.errors &&
        data.errors.backendError && <ErrorBox list={data.errors} />
      }
      titleSlot={<DeleteEntityTitle>Deleting a segment</DeleteEntityTitle>}
      cancelAction={
        <Button
          variant="tertiary"
          scheme="danger"
          to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/segments`}
        >
          {`Cancel`}
        </Button>
      }
      confirmAction={
        <Form method="post">
          <DeleteButton
            type="submit"
            isLoading={navigation.state === "submitting"}
            loadingText="Deleting the segment, please wait..."
          >
            Yes, delete the segment
          </DeleteButton>
        </Form>
      }
      backLinkSlot={
        <BackLink
          to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/segments`}
        >
          Back to segments
        </BackLink>
      }
    >
      <Stack spacing={4}>
        <Typography>
          The segment will be removed from the <strong>feature flag</strong>.
        </Typography>

        <Typography>
          <strong>All the segment related data (including rules)</strong> will
          be removed and not available anymore.
        </Typography>
      </Stack>
    </DeleteEntityLayout>
  );
}
