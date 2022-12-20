import { DashboardLayout } from "~/layouts/DashboardLayout";
import { FlagStatus } from "~/modules/flags/types";
import { getStrategies } from "~/modules/strategies/services/getStrategies";
import { getSession } from "~/sessions";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { AdditionalAudienceRetrieveDTO } from "~/modules/strategies/types";
import { Header } from "~/components/Header";
import { Section, SectionHeader } from "~/components/Section";
import { ToggleFlag } from "~/modules/flags/components/ToggleFlag";
import { Typography } from "~/components/Typography";
import { MetaFunction, ActionFunction, LoaderFunction } from "@remix-run/node";
import {
  useLoaderData,
  useActionData,
  Form,
  useSearchParams,
} from "@remix-run/react";
import { TagLine } from "~/components/Tagline";
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
import { FlagIcon } from "~/components/Icons/FlagIcon";
import { EmptyState } from "~/components/EmptyState";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { AdditionalAudienceList } from "~/modules/strategies/components/AdditionalAudienceList";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { getEligibilities } from "~/modules/eligibility/services/getEligibilities";
import { Eligibility } from "~/modules/eligibility/types";
import { EligibilityList } from "~/modules/eligibility/components/EligibilityList";
import { VariantTable } from "~/modules/variants/components/VariantTable";
import { Spacer } from "~/components/Spacer";

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
  errors?: { [key: string]: string | undefined };
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
  const isFlagActivated = flagEnv.status === FlagStatus.ACTIVATED;

  const hasStrategies = strategies.length > 0;
  const hasEligibility = eligibilities.length > 0;
  const hasErrors = Object.keys(actionData?.errors || {}).length > 0;
  const isMultiVariants = flagEnv.variants.length > 0;

  const isStrategyAdded = searchParams.get("newStrategy") || undefined;
  const isStrategyUpdated = searchParams.get("strategyUpdated") || undefined;
  const isStrategyRemoved = searchParams.get("stratRemoved") || undefined;

  const isEligibilityAdded = searchParams.get("newEligibility") || undefined;
  const isEligibilityRemoved =
    searchParams.get("eligibilityRemoved") || undefined;

  return (
    <DashboardLayout
      user={user}
      header={
        <Header
          tagline={<TagLine icon={<FlagIcon />}>FEATURE FLAG</TagLine>}
          title={currentFlag.name}
        />
      }
      subNav={
        <FlagMenu
          projectId={project.uuid}
          envId={environment.uuid}
          flagId={currentFlag.uuid}
        />
      }
    >
      <PageTitle
        value="Overview"
        endAction={
          <Form
            method="post"
            id={`form-${currentFlag.uuid}`}
            style={{ marginTop: 12 }}
          >
            <ToggleFlag
              isFlagActivated={isFlagActivated}
              flagId={currentFlag.uuid}
              flagName={currentFlag.name}
            />
          </Form>
        }
      />

      <Section id="rollout-target">
        <Card>
          <CardContent>
            <SectionHeader
              title="Percentage of the audience"
              action={
                isMultiVariants && (
                  <div className="flex items-center flex-row h-full">
                    <SubmitButton form="edit-variant">Adjust</SubmitButton>
                  </div>
                )
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
        <Card>
          <CardContent>
            <SectionHeader
              title="Audience eligibility"
              description={
                !hasEligibility && (
                  <Typography>
                    Only people matching at least one of the following rules
                    (and the additional audience) will resolve the flag.
                  </Typography>
                )
              }
              status={
                isEligibilityAdded ? (
                  <SuccessBox id="eligibility-added">
                    The eligibility audience has been successfully set.
                  </SuccessBox>
                ) : isEligibilityRemoved ? (
                  <SuccessBox id="eligibility-removed">
                    The eligibility audience has been successfully removed.
                  </SuccessBox>
                ) : null
              }
              action={
                hasEligibility && (
                  <CreateButton
                    variant="secondary"
                    to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/eligibilities/create`}
                  >
                    Create an eligibility restriction
                  </CreateButton>
                )
              }
            />
          </CardContent>

          {!hasEligibility && (
            <CardContent>
              <EmptyState
                titleAs="h2"
                title="No restrictions"
                description={
                  <Typography>
                    There are no eligibility restrictions. Every users will
                    resolve the flag.
                  </Typography>
                }
                action={
                  <CreateButton
                    to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/eligibilities/create`}
                    variant="secondary"
                  >
                    Create an eligibility restriction
                  </CreateButton>
                }
              />
            </CardContent>
          )}

          {hasEligibility && (
            <EligibilityList
              items={eligibilities}
              projectId={project.uuid}
              envId={environment.uuid}
              flagId={currentFlag.uuid}
            />
          )}
        </Card>
      </Section>

      <Section id="additional-audience">
        <Card>
          <CardContent>
            <SectionHeader
              title="Additional audience"
              description={
                !hasStrategies && (
                  <Typography>
                    The users matching at least one of the following condition
                    will resolve the flag even if they are not targeted because
                    of the eligibility restrictions
                  </Typography>
                )
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
                description={
                  <Typography>
                    There are no additional audience for this flag.
                  </Typography>
                }
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
