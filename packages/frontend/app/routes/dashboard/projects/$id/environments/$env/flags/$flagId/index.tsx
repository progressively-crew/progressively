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
  useTransition,
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
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { getEligibilities } from "~/modules/eligibility/services/getEligibilities";
import { Eligibility } from "~/modules/eligibility/types";
import { VariantTable } from "~/modules/variants/components/VariantTable";
import { Spacer } from "~/components/Spacer";
import { FormEligibility } from "~/modules/eligibility/components/FormEligibility";
import { createEligibility } from "~/modules/eligibility/services/createEligibility";
import { updateEligibilityAction } from "~/modules/eligibility/form-actions/updateEligibilityAction";
import { FormAdditionalAudience } from "~/modules/strategies/components/FormAdditionalAudience";
import { createStrategy } from "~/modules/strategies/services/createStrategy";
import { updateStrategyAction } from "~/modules/strategies/form-actions/updateStrategyAction";
import { Spinner } from "~/components/Spinner";
import { MdOutlineTune } from "react-icons/md";
import { CardEntity } from "~/components/Entity/Entity";
import { MenuButton } from "~/components/MenuButton";

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
  successStrategyUpdated?: boolean;
  successAdditionalAudienceCreated?: boolean;
  errors?: { [key: string]: string | undefined };
  elibilityErrors?: { [key: string]: string | undefined };
  additionalAudienceErrors?: { [key: string]: string | undefined };
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

  if (type === "create-additional-audience") {
    await createStrategy(
      params.env!,
      params.flagId!,
      session.get("auth-cookie")
    );

    return { successAdditionalAudienceCreated: true };
  }

  if (type === "update-strategy") {
    return updateStrategyAction(formData, authCookie);
  }

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

const useFormTransition = () => {
  const transition = useTransition();
  const type = transition.submission?.formData.get("_type");

  const isSubmitting = Boolean(transition.submission);

  return {
    isCreatingEligibility: type === "create-eligibility" && isSubmitting,
    isCreatingAdditionalAudience:
      type === "create-additional-audience" && isSubmitting,
    isUpdatingEligibility: type === "update-eligibility" && isSubmitting,
    isUpdatingAdditionalAudience: type === "update-strategy" && isSubmitting,
  };
};

/* eslint-disable sonarjs/cognitive-complexity */
export default function FlagById() {
  const actionData = useActionData<ActionDataType>();
  const formTransition = useFormTransition();
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

  const isStrategyRemoved = searchParams.get("stratRemoved") || undefined;
  const isVariantCreated = searchParams.get("newVariant") || undefined;
  const isVariantRemoved = searchParams.get("variantRemoved") || undefined;

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
            <div className="flex items-center flex-row h-full">
              <SubmitButton
                form={
                  isMultiVariants
                    ? "edit-variant"
                    : "update-single-variant-percentage"
                }
                icon={<MdOutlineTune />}
              >
                Adjust
              </SubmitButton>
            </div>
          }
        >
          <CardContent>
            <SectionHeader
              title="Range of eligibility"
              description={`Only people in the percentage range will be eligible to flag evaluation.`}
              menu={
                <MenuButton
                  variant="action"
                  items={[
                    {
                      label: "Add a variant",
                      href: `./variants/create`,
                      noInitial: true,
                    },
                  ]}
                  label={"Additional actions"}
                />
              }
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
                ) : isVariantRemoved ? (
                  <SuccessBox id="variant-removed">
                    The variant has been successfully removed.
                  </SuccessBox>
                ) : isVariantCreated ? (
                  <SuccessBox id="variant-added">
                    The variant has been successfully created.
                  </SuccessBox>
                ) : null
              }
            />

            {!isMultiVariants && (
              <>
                <Spacer size={4} />
                <CardEntity
                  title="Percentage range"
                  actions={
                    <SliderFlag
                      formId="update-single-variant-percentage"
                      initialRolloutPercentage={flagEnv.rolloutPercentage}
                    />
                  }
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
              <SubmitButton
                form="form-update-eligibility"
                variant="secondary"
                isLoading={formTransition.isUpdatingEligibility}
                loadingText="Updating the eligibility rules..."
              >
                Update
              </SubmitButton>
            )
          }
        >
          <CardContent>
            <SectionHeader
              title="Eligibility criteria"
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
                aria-disabled={formTransition.isCreatingAdditionalAudience}
                aria-label={
                  formTransition.isCreatingEligibility
                    ? "Creating a new eligibility rule..."
                    : undefined
                }
              >
                <span className="flex flex-row justify-center items-center  gap-4">
                  {formTransition.isCreatingEligibility && (
                    <Spinner className="-ml-8" />
                  )}
                  Add a new rule
                </span>
              </button>
            </Form>
          </CardContent>
        </Card>
      </Section>

      <Section id="additional-audience">
        <Card
          footer={
            hasStrategies && (
              <SubmitButton
                form="form-update-strategy"
                variant="secondary"
                isLoading={formTransition.isUpdatingAdditionalAudience}
                loadingText="Updating the additional audience rules..."
              >
                Update
              </SubmitButton>
            )
          }
        >
          <CardContent>
            <SectionHeader
              title="Additional audience"
              description={
                "The users matching at least one of the following condition will resolve the flag even if they are not targeted because of the eligibility restrictions"
              }
            />

            {actionData?.successStrategyUpdated ? (
              <>
                <Spacer size={6} />
                <SuccessBox id="strategy-updated">
                  The additional audience has been updated.
                </SuccessBox>
              </>
            ) : actionData?.successAdditionalAudienceCreated ? (
              <>
                <Spacer size={6} />
                <SuccessBox id="strategy-added">
                  The additional audience has been successfully set.
                </SuccessBox>
              </>
            ) : isStrategyRemoved ? (
              <>
                <Spacer size={6} />
                <SuccessBox id="strategy-removed">
                  The additional audience has been successfully removed.
                </SuccessBox>
              </>
            ) : actionData?.additionalAudienceErrors ? (
              <>
                <Spacer size={6} />
                <ErrorBox list={actionData?.additionalAudienceErrors} />
              </>
            ) : null}

            <Spacer size={6} />

            <FormAdditionalAudience
              additionalAudiences={strategies}
              projectId={project.uuid}
              envId={environment.uuid}
              flagId={currentFlag.uuid}
              variants={flagEnv.variants}
            />

            {hasStrategies && <Spacer size={6} />}

            <Form method="post">
              <input
                type="hidden"
                name="_type"
                value="create-additional-audience"
              />

              <button
                type="submit"
                className="p-2 border rounded border-dashed border-gray-300 text-center w-full text-gray-600 active:bg-gray-100 hover:bg-gray-50 dark:text-slate-200 dark:active:bg-slate-600 dark:hover:bg-slate-700"
                aria-disabled={formTransition.isCreatingAdditionalAudience}
                aria-label={
                  formTransition.isCreatingAdditionalAudience
                    ? "Creating a new eligibility rule..."
                    : undefined
                }
              >
                <span className="flex flex-row justify-center items-center  gap-4">
                  {formTransition.isCreatingAdditionalAudience && (
                    <Spinner className="-ml-8" />
                  )}
                  Add a new rule
                </span>
              </button>
            </Form>
          </CardContent>
        </Card>
      </Section>
    </DashboardLayout>
  );
}
