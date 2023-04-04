import { DashboardLayout } from "~/layouts/DashboardLayout";
import { getSession } from "~/sessions";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { Section, SectionHeader } from "~/components/Section";
import { MetaFunction, ActionFunction } from "@remix-run/node";
import { useActionData, useSearchParams } from "@remix-run/react";
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
import { VariantTable } from "~/modules/variants/components/VariantTable";
import { MdOutlineTune } from "react-icons/md";
import { MenuButton } from "~/components/MenuButton";
import { Separator } from "~/components/Separator";
import { Typography } from "~/components/Typography";

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

/* eslint-disable sonarjs/cognitive-complexity */
export default function FlagById() {
  const actionData = useActionData<ActionDataType>();
  const { project } = useProject();
  const { user } = useUser();
  const { environment } = useEnvironment();
  const { flagEnv } = useFlagEnv();
  const [searchParams] = useSearchParams();

  const hasPercentageChanged = Boolean(actionData?.successChangePercentage);

  const hasErrors = Object.keys(actionData?.errors || {}).length > 0;
  const isMultiVariants = flagEnv.variants.length > 0;

  const isVariantCreated = searchParams.get("newVariant") || undefined;
  const isVariantRemoved = searchParams.get("variantRemoved") || undefined;

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
        <Card>
          <CardContent>
            <SectionHeader
              title="Using percentage range"
              description={`Only people in the percentage range matching the eventual rules will be eligible to flag evaluation.`}
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
          </CardContent>

          <Separator className="border-dashed" />

          <div className="py-6">
            <div>
              {isMultiVariants ? (
                <div>
                  <div className="flex flex-row justify-between px-6 items-center">
                    <Typography as="h3" className="font-semibold text-xl">
                      Variants
                    </Typography>

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
                  </div>

                  <VariantTable variants={flagEnv.variants} />

                  <div className="px-6">
                    <SubmitButton
                      form={"edit-variant"}
                      icon={<MdOutlineTune />}
                    >
                      Adjust
                    </SubmitButton>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex flex-row justify-between items-center px-6">
                    <div className="flex flex-row  gap-6 items-center">
                      <Typography as="h3" className="font-semibold text-xl">
                        Audience range
                      </Typography>

                      <SliderFlag
                        formId="update-single-variant-percentage"
                        initialRolloutPercentage={flagEnv.rolloutPercentage}
                      />

                      <SubmitButton
                        form={"update-single-variant-percentage"}
                        icon={<MdOutlineTune />}
                      >
                        Adjust
                      </SubmitButton>
                    </div>
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
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </Section>
    </DashboardLayout>
  );
}
