import { useTransition } from "react";
import { getSession } from "~/sessions";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { MetaFunction, ActionFunction, redirect } from "@remix-run/node";
import { useActionData, Form } from "@remix-run/react";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { getFlagMetaTitle } from "~/modules/flags/services/getFlagMetaTitle";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { EligibilityCreateDTO } from "~/modules/eligibility/types";
import { createEligibility } from "~/modules/eligibility/services/createEligibility";
import { EligibilityForm } from "~/modules/eligibility/components/EligibilityForm";
import { validateEligibilityForm } from "~/modules/eligibility/validators/validateEligibilityForm";
import { CreateEntityLayout } from "~/layouts/CreateEntityLayout";
import { BackLink } from "~/components/BackLink";
import { CreateEntityTitle } from "~/layouts/CreateEntityTitle";

export const meta: MetaFunction = ({ parentsData, params }) => {
  const projectName = getProjectMetaTitle(parentsData);
  const envName = getEnvMetaTitle(parentsData, params.env);
  const flagName = getFlagMetaTitle(parentsData);

  return {
    title: `Progressively | ${projectName} | ${envName} | Flags | ${flagName} | Eligibility | Create`,
  };
};

interface ActionData {
  errors?: { [key: string]: string };
}

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<ActionData | Response> => {
  const formData = await request.formData();
  const session = await getSession(request.headers.get("Cookie"));
  const fieldValues = formData.getAll("field-value");
  const fieldValue = fieldValues.join("\n");

  const errors = validateEligibilityForm(formData);

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const fieldName = formData.get("field-name")?.toString() || "";

  const fieldComparator =
    (formData.get(
      "field-comparator"
    ) as EligibilityCreateDTO["fieldComparator"]) || undefined;

  const eligibility: EligibilityCreateDTO = {
    fieldComparator: fieldComparator,
    fieldName,
    fieldValue,
  };

  try {
    await createEligibility(
      params.env!,
      params.flagId!,
      eligibility,
      session.get("auth-cookie")
    );

    return redirect(
      `/dashboard/projects/${params.id}/environments/${params.env}/flags/${params.flagId}?newEligibility=true#eligibility-added`
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { backendError: error.message } };
    }

    return { errors: { backendError: "An error ocurred" } };
  }
};

export default function StrategyCreatePage() {
  const transition = useTransition();
  const { flagEnv } = useFlagEnv();
  const { project } = useProject();
  const { environment } = useEnvironment();
  const actionData = useActionData<ActionData>();

  const currentFlag = flagEnv.flag;

  const errors = actionData?.errors || {};

  return (
    <CreateEntityLayout
      backLinkSlot={
        <BackLink
          to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}`}
        >
          Back to flag
        </BackLink>
      }
      status={actionData?.errors && <ErrorBox list={actionData.errors} />}
      titleSlot={
        <CreateEntityTitle>Create an eligibility restriction</CreateEntityTitle>
      }
      submitSlot={
        <SubmitButton
          form="eligibility-form"
          isLoading={transition.state === "submitting"}
          loadingText="Saving the eligibility restriction, please wait..."
        >
          Save the restriction
        </SubmitButton>
      }
    >
      <Form method="post" id="eligibility-form"></Form>

      <EligibilityForm errors={errors} />
    </CreateEntityLayout>
  );
}
