import { getSession } from "~/sessions";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { ActionFunction, redirect, MetaFunction } from "@remix-run/node";
import { useActionData, Form, useNavigation } from "@remix-run/react";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { TextInput } from "~/components/Fields/TextInput";
import { CreateEntityLayout } from "~/layouts/CreateEntityLayout";
import { CreateEntityTitle } from "~/layouts/CreateEntityTitle";
import { addVariantAction } from "~/modules/variants/form-actions/addVariantAction";
import { DialogCloseBtn } from "~/components/Dialog/Dialog";
import { useFlag } from "~/modules/flags/contexts/useFlag";
import { getFlagMetaTitle } from "~/modules/flags/services/getFlagMetaTitle";

export const meta: MetaFunction = ({ matches }) => {
  const projectName = getProjectMetaTitle(matches);
  const flagName = getFlagMetaTitle(matches);

  return [
    {
      title: `Progressively | ${projectName} | Flags | ${flagName} | Variants | Create`,
    },
  ];
};

interface ActionData {
  successCreated?: boolean;
  errors?: { [key: string]: string | undefined };
}

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<ActionData | Response> => {
  const formData = await request.formData();
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const variantCreated = await addVariantAction(formData, params, authCookie);

  if (Object.keys(variantCreated.errors || {}).length > 0) {
    return { errors: variantCreated.errors };
  }

  return redirect(
    `/dashboard/projects/${params.id}/flags/${params.flagId}/audience?newVariant=true#variant-added`
  );
};

export default function CteateVariantPage() {
  const { project } = useProject();
  const { flag } = useFlag();
  const navigation = useNavigation();
  const actionData = useActionData<ActionData>();

  const errors = actionData?.errors;

  return (
    <Form method="post" className="flex flex-col flex-1">
      <CreateEntityLayout
        status={actionData?.errors && <ErrorBox list={actionData.errors} />}
        titleSlot={<CreateEntityTitle>Create a variant</CreateEntityTitle>}
        submitSlot={
          <SubmitButton
            type="submit"
            isLoading={navigation.state === "submitting"}
            loadingText="Creating the variant, please wait..."
          >
            Create the variant
          </SubmitButton>
        }
        closeSlot={
          <DialogCloseBtn
            to={`/dashboard/projects/${project.uuid}/flags/${flag.uuid}/audience`}
            label={`Back to variants`}
          />
        }
      >
        <TextInput
          isInvalid={Boolean(errors?.name)}
          label="Variant name"
          name="value"
          placeholder="e.g: My super variant"
        />
      </CreateEntityLayout>
    </Form>
  );
}
