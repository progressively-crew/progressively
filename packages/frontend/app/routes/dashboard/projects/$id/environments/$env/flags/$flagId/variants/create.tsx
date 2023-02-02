import { getSession } from "~/sessions";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { MetaFunction, ActionFunction, redirect } from "@remix-run/node";
import { useActionData, Form, useTransition } from "@remix-run/react";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { getFlagMetaTitle } from "~/modules/flags/services/getFlagMetaTitle";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { TextInput } from "~/components/Fields/TextInput";
import { CreateEntityLayout } from "~/layouts/CreateEntityLayout";
import { BackLink } from "~/components/BackLink";
import { CreateEntityTitle } from "~/layouts/CreateEntityTitle";
import { addVariantAction } from "~/modules/variants/form-actions/addVariantAction";

export const meta: MetaFunction = ({ parentsData, params }) => {
  const projectName = getProjectMetaTitle(parentsData);
  const envName = getEnvMetaTitle(parentsData, params.env);
  const flagName = getFlagMetaTitle(parentsData);

  return {
    title: `Progressively | ${projectName} | ${envName} | Flags | ${flagName} | Variants | Create`,
  };
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
    `/dashboard/projects/${params.id}/environments/${params.env}/flags/${params.flagId}?newVariant=true#variant-added`
  );
};

export default function CteateVariantPage() {
  const { project } = useProject();
  const { flagEnv } = useFlagEnv();
  const { environment } = useEnvironment();
  const transition = useTransition();

  const currentFlag = flagEnv.flag;

  const actionData = useActionData<ActionData>();
  const errors = actionData?.errors;

  return (
    <Form method="post">
      <CreateEntityLayout
        status={actionData?.errors && <ErrorBox list={actionData.errors} />}
        titleSlot={<CreateEntityTitle>Create a variant</CreateEntityTitle>}
        submitSlot={
          <SubmitButton
            type="submit"
            isLoading={transition.state === "submitting"}
            loadingText="Creating the variant, please wait..."
          >
            Create the variant
          </SubmitButton>
        }
        backLinkSlot={
          <BackLink
            to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/variants`}
          >
            Back to variants
          </BackLink>
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
