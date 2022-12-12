import { useTransition } from "react";
import { getSession } from "~/sessions";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { Typography } from "~/components/Typography";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { MetaFunction, ActionFunction, redirect } from "@remix-run/node";
import { useActionData, Form } from "@remix-run/react";
import { FormGroup } from "~/components/Fields/FormGroup";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { getFlagMetaTitle } from "~/modules/flags/services/getFlagMetaTitle";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { PageTitle } from "~/components/PageTitle";
import { Card, CardContent } from "~/components/Card";
import { EligibilityCreateDTO } from "~/modules/eligibility/types";
import { createEligibility } from "~/modules/eligibility/services/createEligibility";
import { EligibilityForm } from "~/modules/eligibility/components/EligibilityForm";
import { validateEligibilityForm } from "~/modules/eligibility/validators/validateEligibilityForm";
import { CreateEntityLayout } from "~/layouts/CreateEntityLayout";
import { Spacer } from "~/components/Spacer";

export const handle = {
  breadcrumb: (match: { params: any }) => {
    return {
      link: `/dashboard/projects/${match.params.id}/environments/${match.params.env}/flags/${match.params.flagId}/eligibilities/create`,
      label: "Create an eligibility restriction",
    };
  },
};

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
      status={actionData?.errors && <ErrorBox list={actionData.errors} />}
    >
      <Card>
        <CardContent>
          <h1 className="text-3xl font-semibold">
            Create an eligibility restriction
          </h1>

          <Spacer size={8} />

          <Form method="post" id="eligibility-form"></Form>
          <FormGroup>
            <EligibilityForm errors={errors} />

            <div>
              <SubmitButton
                form="eligibility-form"
                isLoading={transition.state === "submitting"}
                loadingText="Saving the eligibility restriction, please wait..."
              >
                Save the eligibility restriction
              </SubmitButton>
            </div>
          </FormGroup>
        </CardContent>
      </Card>
    </CreateEntityLayout>
  );
}
