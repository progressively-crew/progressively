import { DashboardLayout } from "~/layouts/DashboardLayout";
import { getStrategies } from "~/modules/strategies/services/getStrategies";
import { getSession } from "~/sessions";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { AdditionalAudienceRetrieveDTO } from "~/modules/strategies/types";
import { Section, SectionHeader } from "~/components/Section";
import { MetaFunction, ActionFunction, LoaderFunction } from "@remix-run/node";
import {
  useLoaderData,
  useActionData,
  useSearchParams,
  Form,
} from "@remix-run/react";
import { Card, CardContent } from "~/components/Card";
import { FlagMenu } from "~/modules/flags/components/FlagMenu";
import { SliderFlag } from "~/modules/flags/components/SliderFlag";
import { changePercentageFlag } from "~/modules/flags/services/changePercentageFlag";
import { useProject } from "~/modules/projects/contexts/useProject";
import { useUser } from "~/modules/user/contexts/useUser";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { getFlagMetaTitle } from "~/modules/flags/services/getFlagMetaTitle";
import { toggleFlagAction } from "~/modules/flags/form-actions/toggleFlagAction";
import { editVariantAction } from "~/modules/variants/form-actions/editVariantAction";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { PageTitle } from "~/components/PageTitle";
import { EmptyState } from "~/components/EmptyState";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { AdditionalAudienceList } from "~/modules/strategies/components/AdditionalAudienceList";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { getEligibilities } from "~/modules/eligibility/services/getEligibilities";
import { Eligibility } from "~/modules/eligibility/types";
import { VariantTable } from "~/modules/variants/components/VariantTable";
import { Spacer } from "~/components/Spacer";
import { FormEligibility } from "~/modules/eligibility/components/FormEligibility";
import { createEligibility } from "~/modules/eligibility/services/createEligibility";
import { updateEligibilityAction } from "~/modules/eligibility/form-actions/updateEligibilityAction";

export const meta: MetaFunction = ({ parentsData, params }) => {
  const projectName = getProjectMetaTitle(parentsData);
  const envName = getEnvMetaTitle(parentsData, params.env);
  const flagName = getFlagMetaTitle(parentsData);

  return {
    title: `Progressively | ${projectName} | ${envName} | Flags | ${flagName}`,
  };
};

type ActionDataType = null | {
  successChangePercentage?: boolean;
  successEdit?: boolean;
  successEligibilityCreated?: boolean;
  successEligibilityUpdated?: boolean;
  errors?: { [key: string]: string | undefined };
  elibilityErrors?: { [key: string]: string | undefined };
};

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<ActionDataType> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");
  const flagId = params.flagId;
  const formData = await request.formData();
  const type = formData.get("_type");

  if (type === "update-eligibility") {
    return updateEligibilityAction(formData, authCookie);
  }

  if (type === "create-eligibility") {
    await createEligibility(params.env!, flagId as string, authCookie);
    return { successEligibilityCreated: true };
  }

  if (type === "percentage") {
    const rolloutPercentage = formData.get("rolloutPercentage");

    if (
      rolloutPercentage !== undefined &&
      rolloutPercentage !== null &&
      flagId
    ) {
      await changePercentageFlag(
        params.env!,
        flagId as string,
        Number(rolloutPercentage),
        authCookie
      );

      return { successChangePercentage: true };
    }
  }

  if (type === "edit-variant") {
    return editVariantAction(formData, params, authCookie);
  }

  if (type === "toggle-flag") {
    return toggleFlagAction(formData, params, authCookie);
  }

  return null;
};

interface LoaderData {
  strategies: Array<AdditionalAudienceRetrieveDTO>;
  eligibilities: Array<Eligibility>;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const strategies = await getStrategies(
    params.env!,
    params.flagId!,
    authCookie
  );

  const eligibilities = await getEligibilities(
    params.env!,
    params.flagId!,
    authCookie
  );

  return {
    strategies,
    eligibilities,
  };
};

/* eslint-disable sonarjs/cognitive-complexity */
export default function FlagById() {
  const actionData = useActionData<ActionDataType>();
  const { project } = useProject();
  const { user } = useUser();
  const { environment } = useEnvironment();
  const { flagEnv } = useFlagEnv();
  const [searchParams] = useSearchParams();

  const { strategies, eligibilities } = useLoaderData<LoaderData>();
  const hasPercentageChanged = Boolean(actionData?.successChangePercentage);

  const currentFlag = flagEnv.flag;

  const hasStrategies = strategies.length > 0;
  const hasEligibility = eligibilities.length > 0;
  const hasErrors = Object.keys(actionData?.errors || {}).length > 0;
  const isMultiVariants = flagEnv.variants.length > 0;

  const isStrategyAdded = searchParams.get("newStrategy") || undefined;
  const isStrategyUpdated = searchParams.get("strategyUpdated") || undefined;
  const isStrategyRemoved = searchParams.get("stratRemoved") || undefined;

  const isEligibilityRemoved =
    searchParams.get("eligibilityRemoved") || undefined;

  return (
    <DashboardLayout
      user={user}
      subNav={
        <FlagMenu
          projectId={project.uuid}
          envId={environment.uuid}
          flagEnv={flagEnv}
        />
      }
    >
      <PageTitle value="Audience" />

      <Section id="rollout-target">
        <Card
          footer={
            isMultiVariants && (
              <div className="flex items-center flex-row h-full">
                <SubmitButton form="edit-variant">Adjust</SubmitButton>
              </div>
            )
          }
        >
          <CardContent>
            <SectionHeader
              title="Percentage of the audience"
              status={
                hasPercentageChanged ? (
                  <SuccessBox id="percentage-changed">
                    Percentage adjusted.
                  </SuccessBox>
                ) : actionData?.successEdit ? (
                  <SuccessBox id="variant-edited">
                    The variants have been successfully edited.
                  </SuccessBox>
                ) : hasErrors ? (
                  <ErrorBox list={actionData?.errors || {}} />
                ) : null
              }
            />

            {!isMultiVariants && (
              <>
                <Spacer size={2} />
                <SliderFlag
                  initialRolloutPercentage={flagEnv.rolloutPercentage}
                />
              </>
            )}
          </CardContent>

          {isMultiVariants && <VariantTable variants={flagEnv.variants} />}
        </Card>
      </Section>

      <Section id="eligibility">
        <Card
          footer={
            hasEligibility && (
              <SubmitButton form="form-update-eligibility" variant="secondary">
                Update
              </SubmitButton>
            )
          }
        >
          <CardContent>
            <SectionHeader
              title="Audience eligibility"
              description={
                "Only people matching at least one of the following rules (and the additional audience) will resolve the flag."
              }
            />

            {actionData?.successEligibilityUpdated ? (
              <>
                <Spacer size={6} />
                <SuccessBox id="eligibility-updated">
                  Eligibility audience updated.
                </SuccessBox>
              </>
            ) : isEligibilityRemoved ? (
              <>
                <Spacer size={6} />
                <SuccessBox id="eligibility-removed">
                  The eligibility audience has been successfully removed.
                </SuccessBox>
              </>
            ) : actionData?.elibilityErrors ? (
              <>
                <Spacer size={6} />
                <ErrorBox list={actionData?.elibilityErrors} />
              </>
            ) : null}

            <Spacer size={6} />

            <FormEligibility
              initialEligibilites={eligibilities}
              projectId={project.uuid}
              envId={environment.uuid}
              flagId={currentFlag.uuid}
            />

            {hasEligibility && <Spacer size={6} />}

            <Form method="post">
              <input type="hidden" name="_type" value="create-eligibility" />

              <button
                type="submit"
                className="p-2 border rounded border-dashed border-gray-300 text-center w-full text-gray-600 active:bg-gray-100 hover:bg-gray-50 dark:text-slate-200 dark:active:bg-slate-600 dark:hover:bg-slate-700"
              >
                Add a new rule
              </button>
            </Form>
          </CardContent>
        </Card>
      </Section>

      <Section id="additional-audience">
        <Card>
          <CardContent>
            <SectionHeader
              title="Additional audience"
              description={
                !hasStrategies &&
                "The users matching at least one of the following condition will resolve the flag even if they are not targeted because of the eligibility restrictions"
              }
              status={
                isStrategyUpdated ? (
                  <SuccessBox id="strategy-updated">
                    The additional audience has been updated.
                  </SuccessBox>
                ) : isStrategyAdded ? (
                  <SuccessBox id="strategy-added">
                    The additional audience has been successfully set.
                  </SuccessBox>
                ) : isStrategyRemoved ? (
                  <SuccessBox id="strategy-removed">
                    The additional audience has been successfully removed.
                  </SuccessBox>
                ) : null
              }
              action={
                hasStrategies && (
                  <CreateButton
                    variant="secondary"
                    to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/strategies/create`}
                  >
                    Create an additional audience
                  </CreateButton>
                )
              }
            />
          </CardContent>

          {!hasStrategies && (
            <CardContent>
              <EmptyState
                titleAs="h2"
                title="No additional audience"
                description={"There are no additional audience for this flag."}
                action={
                  <CreateButton
                    variant="secondary"
                    to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/strategies/create`}
                  >
                    Create an additional audience
                  </CreateButton>
                }
              />
            </CardContent>
          )}

          {hasStrategies && (
            <AdditionalAudienceList
              items={strategies}
              projectId={project.uuid}
              envId={environment.uuid}
              flagId={currentFlag.uuid}
            />
          )}
        </Card>
      </Section>
    </DashboardLayout>
  );
}
