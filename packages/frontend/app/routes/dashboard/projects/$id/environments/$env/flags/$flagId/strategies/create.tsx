import { useTransition } from "react";
import { getSession } from "~/sessions";
import { validateStrategyForm } from "~/modules/strategies/validators/validateStrategyForm";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import {
  AdditionalAudienceCreateDTO,
  StrategyValueToServe,
} from "~/modules/strategies/types";
import { createStrategy } from "~/modules/strategies/services/createStrategy";
import { AudienceFields } from "~/modules/strategies/components/AudienceFields";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import {
  MetaFunction,
  ActionFunction,
  redirect,
  LoaderFunction,
} from "@remix-run/node";
import { useActionData, Form, useLoaderData } from "@remix-run/react";
import { FormGroup } from "~/components/Fields/FormGroup";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { getFlagMetaTitle } from "~/modules/flags/services/getFlagMetaTitle";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { CreateEntityLayout } from "~/layouts/CreateEntityLayout";
import { getVariants } from "~/modules/variants/services/getVariants";
import { Variant } from "~/modules/variants/types";
import { BackLink } from "~/components/BackLink";
import { CreateEntityTitle } from "~/layouts/CreateEntityTitle";

export const meta: MetaFunction = ({ parentsData, params }) => {
  const projectName = getProjectMetaTitle(parentsData);
  const envName = getEnvMetaTitle(parentsData, params.env);
  const flagName = getFlagMetaTitle(parentsData);

  return {
    title: `Progressively | ${projectName} | ${envName} | Flags | ${flagName} | Strategies | Create`,
  };
};

interface LoaderData {
  variants: Array<Variant>;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const variants: Array<Variant> = await getVariants(
    params.env!,
    params.flagId!,
    authCookie
  );

  return {
    variants,
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

  const fieldName = (formData.get("field-name") as string) || "";
  const fieldValue = (formData.get("field-value") as string) || "";
  const valueToServeType =
    formData.get("value-to-serve-type")?.toString() ===
    StrategyValueToServe.Boolean
      ? StrategyValueToServe.Boolean
      : StrategyValueToServe.String;

  const valueToServe = (formData.get("value-to-serve") as string) || "false"; // keep it as a string, it will be stored in DB like this

  const fieldComparator =
    (formData.get(
      "field-comparator"
    ) as AdditionalAudienceCreateDTO["fieldComparator"]) || undefined;

  const strategy: AdditionalAudienceCreateDTO = {
    fieldComparator: fieldComparator,
    fieldName,
    fieldValue,
    valueToServeType,
    valueToServe,
  };

  try {
    await createStrategy(
      params.env!,
      params.flagId!,
      strategy,
      session.get("auth-cookie")
    );

    return redirect(
      `/dashboard/projects/${params.id}/environments/${params.env}/flags/${params.flagId}?newStrategy=true#strategy-added`
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { backendError: error.message } };
    }

    return { errors: { backendError: "An error ocurred" } };
  }
};

export default function StrategyCreatePage() {
  const { variants } = useLoaderData<LoaderData>();
  const transition = useTransition();
  const { flagEnv } = useFlagEnv();
  const { project } = useProject();
  const { environment } = useEnvironment();
  const actionData = useActionData<ActionData>();

  const currentFlag = flagEnv.flag;

  const errors = actionData?.errors || {};

  return (
    <Form method="post">
      <CreateEntityLayout
        status={actionData?.errors && <ErrorBox list={actionData.errors} />}
        titleSlot={
          <CreateEntityTitle>Create an additional audience</CreateEntityTitle>
        }
        submitSlot={
          <SubmitButton
            isLoading={transition.state === "submitting"}
            loadingText="Saving the strategy, please wait..."
          >
            Save the additional audience
          </SubmitButton>
        }
        backLinkSlot={
          <BackLink
            to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}`}
          >
            Back to flag
          </BackLink>
        }
      >
        <FormGroup>
          <AudienceFields errors={errors} variants={variants} />
        </FormGroup>
      </CreateEntityLayout>
    </Form>
  );
}
