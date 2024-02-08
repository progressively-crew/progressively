import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { getSession } from "~/sessions";
import { Button } from "~/components/Buttons/Button";
import { DeleteEntityLayout } from "~/layouts/DeleteEntityLayout";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { ActionFunction, redirect, MetaFunction } from "@remix-run/node";
import { useActionData, Form, useNavigation } from "@remix-run/react";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { getFlagEnvMetaTitle } from "~/modules/flags/services/getFlagEnvMetaTitle";
import { Stack } from "~/components/Stack";
import { Typography } from "~/components/Typography";
import { DeleteEntityTitle } from "~/layouts/DeleteEntityTitle";
import { deleteVariant } from "~/modules/variants/services/deleteVariant";
import { DialogCloseBtn } from "~/components/Dialog/Dialog";
import { useFlag } from "~/modules/flags/contexts/useFlag";

export const meta: MetaFunction = ({ matches }) => {
  const projectName = getProjectMetaTitle(matches);
  const flagName = getFlagEnvMetaTitle(matches);

  return [
    {
      title: `Progressively | ${projectName} | ${flagName} | Variants | Delete`,
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
  const flagId = params.flagId!;
  const variantId = params.variantId!;

  try {
    await deleteVariant(flagId, variantId, session.get("auth-cookie"));
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { backendError: error.message } };
    }

    return { errors: { backendError: "An error ocurred" } };
  }

  return redirect(
    `/dashboard/projects/${projectId}/flags/${flagId}/audience?variantRemoved=true#variant-removed`
  );
};

export default function DeleteVariantPage() {
  const navigation = useNavigation();
  const { project } = useProject();
  const { flag } = useFlag();
  const data = useActionData<ActionData>();

  return (
    <DeleteEntityLayout
      titleSlot={<DeleteEntityTitle>Deleting a variant</DeleteEntityTitle>}
      error={
        data?.errors &&
        data.errors.backendError && <ErrorBox list={data.errors} />
      }
      cancelAction={
        <Button
          variant="tertiary"
          scheme="danger"
          to={`/dashboard/projects/${project.uuid}/flags/${flag.uuid}/audience`}
        >
          {`Cancel`}
        </Button>
      }
      confirmAction={
        <Form method="post">
          <DeleteButton
            type="submit"
            isLoading={navigation.state === "submitting"}
            loadingText="Deleting the variant, please wait..."
          >
            Yes, delete the variant
          </DeleteButton>
        </Form>
      }
      closeSlot={
        <DialogCloseBtn
          to={`/dashboard/projects/${project.uuid}/flags/${flag.uuid}/audience`}
          label={`Back to flag`}
        />
      }
    >
      <Stack spacing={4}>
        <Typography>
          The variant will be removed from the{" "}
          <strong>entire feature flag configuration</strong>.
        </Typography>

        <Typography>
          When a user will resolve a feature flag, this variant will not be
          taken into consideration anymore.
        </Typography>
      </Stack>
    </DeleteEntityLayout>
  );
}
