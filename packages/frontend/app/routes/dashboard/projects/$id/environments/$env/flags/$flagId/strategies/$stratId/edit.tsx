import { useTransition } from "react";
import { getSession } from "~/sessions";
import { validateStrategyForm } from "~/modules/strategies/validators/validateStrategyForm";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { AdditionalAudienceCreateDTO } from "~/modules/strategies/types";
import { editStrategy } from "~/modules/strategies/services/editStrategy";
import { StrategyAudience } from "~/modules/strategies/components/StrategyAudience";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { MetaFunction, ActionFunction, redirect } from "@remix-run/node";
import { useActionData, Form } from "@remix-run/react";
import { FormGroup } from "~/components/Fields/FormGroup";
import { useUser } from "~/modules/user/contexts/useUser";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { getFlagMetaTitle } from "~/modules/flags/services/getFlagMetaTitle";
import { useStrategy } from "~/modules/strategies/contexts/useStrategy";
import { PageTitle } from "~/components/PageTitle";
import { Header } from "~/components/Header";
import { FlagIcon } from "~/components/Icons/FlagIcon";
import { TagLine } from "~/components/Tagline";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";

export const handle = {
  breadcrumb: (match: any) => {
    return {
      link: `/dashboard/projects/${match.params.id}/environments/${match.params.env}/flags/${match.params.flagId}/strategies/${match.params.stratId}/edit`,
      label: `Edit additional audience`,
    };
  },
};

export const meta: MetaFunction = ({ parentsData, params }) => {
  const projectName = getProjectMetaTitle(parentsData);
  const envName = getEnvMetaTitle(parentsData, params.env);
  const flagName = getFlagMetaTitle(parentsData);

  return {
    title: `Progressively | ${projectName} | ${envName} | Flags | ${flagName} | Additional audience | Edit`,
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

  const errors = validateStrategyForm(formData);

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const fieldName = (formData.get("field-name") as string) || undefined;
  const fieldValue = (formData.get("field-value") as string) || undefined;

  const fieldComparator =
    (formData.get(
      "field-comparator"
    ) as AdditionalAudienceCreateDTO["fieldComparator"]) || undefined;

  const strategy: AdditionalAudienceCreateDTO = {
    fieldComparator: fieldComparator,
    fieldName,
    fieldValue,
  };

  try {
    await editStrategy(params.stratId!, strategy, session.get("auth-cookie"));

    return redirect(
      `/dashboard/projects/${params.id}/environments/${params.env}/flags/${params.flagId}?strategyUpdated=true#strategy-updated`
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { backendError: error.message } };
    }

    return { errors: { backendError: "An error ocurred" } };
  }
};

export default function StrategyEditPage() {
  const transition = useTransition();
  const { user } = useUser();
  const { strategy } = useStrategy();
  const { flagEnv } = useFlagEnv();
  const actionData = useActionData<ActionData>();

  const errors = actionData?.errors || {};

  return (
    <DashboardLayout
      user={user}
      header={
        <Header
          tagline={<TagLine icon={<FlagIcon />}>FEATURE FLAG</TagLine>}
          title={flagEnv.flag.name}
        />
      }
      status={actionData?.errors && <ErrorBox list={actionData.errors} />}
    >
      <PageTitle value={`Edit additional audience`} />
      <Form method="post">
        <FormGroup>
          <StrategyAudience
            errors={errors}
            initialFieldName={strategy.fieldName}
            initialFieldValue={strategy.fieldValue}
            initialFieldComparator={strategy.fieldComparator}
          />

          <div>
            <SubmitButton
              tabIndex={-1}
              isLoading={transition.state === "submitting"}
              loadingText="Saving the strategy, please wait..."
            >
              Save the additional audience
            </SubmitButton>
          </div>
        </FormGroup>
      </Form>
    </DashboardLayout>
  );
}
