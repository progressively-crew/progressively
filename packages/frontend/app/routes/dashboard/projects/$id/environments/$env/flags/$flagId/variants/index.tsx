import { ActionFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
import { useEffect, useRef } from "react";
import { AiOutlineAppstore } from "react-icons/ai";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { Card, CardContent } from "~/components/Card";
import { EmptyState } from "~/components/EmptyState";
import { TextInput } from "~/components/Fields/TextInput";
import { Header } from "~/components/Header";
import { FlagIcon } from "~/components/Icons/FlagIcon";
import { PageTitle } from "~/components/PageTitle";
import { Section, SectionHeader } from "~/components/Section";
import { Spacer } from "~/components/Spacer";
import { Stack } from "~/components/Stack";
import { TagLine } from "~/components/Tagline";
import { Typography } from "~/components/Typography";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { FlagMenu } from "~/modules/flags/components/FlagMenu";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { getFlagMetaTitle } from "~/modules/flags/services/getFlagMetaTitle";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useUser } from "~/modules/user/contexts/useUser";
import { VariantList } from "~/modules/variants/components/VariantList";
import { addVariantAction } from "~/modules/variants/form-actions/addVariantAction";
import { deleteVariantAction } from "~/modules/variants/form-actions/deleteVariantAction";
import { editVariantAction } from "~/modules/variants/form-actions/editVariantAction";

import { getVariants } from "~/modules/variants/services/getVariants";
import { Variant, VariantCreateDTO } from "~/modules/variants/types";
import { getSession } from "~/sessions";

export const meta: MetaFunction = ({ parentsData, params }) => {
  const projectName = getProjectMetaTitle(parentsData);
  const envName = getEnvMetaTitle(parentsData, params.env);
  const flagName = getFlagMetaTitle(parentsData);

  return {
    title: `Progressively | ${projectName} | ${envName} | Flags | ${flagName} | Multi-Variants`,
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

const getRemainingPercentage = (variants: Array<VariantCreateDTO>) => {
  let cumulative = 0;

  for (const variant of variants) {
    cumulative += variant.rolloutPercentage;
  }

  return Math.max(100 - cumulative, 0);
};

type ActionDataType = null | {
  successChangePercentage?: boolean;
  successDelete?: boolean;
  successCreated?: boolean;
  successEdit?: boolean;
  errors?: { [key: string]: string | undefined };
};

/* eslint-disable sonarjs/cognitive-complexity */
export const action: ActionFunction = async ({
  request,
  params,
}): Promise<ActionDataType> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");
  const formData = await request.formData();
  const type = formData.get("_type");

  if (type === "edit-variant") {
    return editVariantAction(formData, params, authCookie);
  }

  if (type === "delete-variant") {
    return deleteVariantAction(formData, params, authCookie);
  }

  if (type === "add-variant") {
    return addVariantAction(formData, params, authCookie);
  }

  return null;
};

export default function VariantsOfFlag() {
  const formRef = useRef<HTMLFormElement>(null);
  const { user } = useUser();
  const { project } = useProject();
  const { environment } = useEnvironment();
  const { flagEnv } = useFlagEnv();
  const { variants } = useLoaderData<LoaderData>();
  const transition = useTransition();
  const isAdding =
    transition.state === "submitting" &&
    transition.submission?.formData.get("_type") === "add-variant";

  const actionData = useActionData<ActionDataType>();

  const currentFlag = flagEnv.flag;

  const hasVariants = variants.length > 0;
  const remainingPercentage = getRemainingPercentage(variants);

  useEffect(() => {
    if (!isAdding) {
      formRef?.current?.reset();
    }
  }, [isAdding]);

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
      <PageTitle value="Multi-Variants" icon={<AiOutlineAppstore />} />

      <Section id="variant-list">
        <Card>
          <CardContent>
            <SectionHeader
              title="Variants list"
              action={
                hasVariants && (
                  <div className="flex items-center flex-row h-full">
                    <SubmitButton form="edit-variant">
                      Edit variants
                    </SubmitButton>
                  </div>
                )
              }
              description={
                <Typography>
                  The variants that will be shown to a portion of your
                  population.
                </Typography>
              }
              status={
                actionData?.errors ? (
                  <ErrorBox list={actionData?.errors} />
                ) : actionData?.successDelete ? (
                  <SuccessBox id="variant-deleted">
                    The variant has been successfully deleted.
                  </SuccessBox>
                ) : actionData?.successCreated ? (
                  <SuccessBox id="variant-deleted">
                    The variant has been successfully created.
                  </SuccessBox>
                ) : actionData?.successEdit ? (
                  <SuccessBox id="variant-edited">
                    The variants have been successfully edited.
                  </SuccessBox>
                ) : null
              }
            />
          </CardContent>

          {!hasVariants && (
            <CardContent>
              <EmptyState
                titleAs="h2"
                title="No variants found"
                description={
                  <div>
                    <Typography>
                      There are no variants found for this flag.
                    </Typography>
                    <Spacer size={4} />
                    <Form
                      method="post"
                      aria-label="Add a new variant"
                      ref={formRef}
                    >
                      <input type="hidden" value="add-variant" name="_type" />
                      <input
                        type="hidden"
                        value={remainingPercentage}
                        name="remainingPercent"
                      />
                      <Stack spacing={6}>
                        <div className="flex flex-col md:flex-row gap-3 md:items-end">
                          <TextInput
                            name={"value"}
                            label={"New variant"}
                            placeholder="e.g: Alternative"
                            isInvalid={Boolean(actionData?.errors?.value)}
                            hiddenLabel
                          />

                          <SubmitButton
                            variant={hasVariants ? "secondary" : "primary"}
                            isLoading={isAdding}
                            loadingText="Saving the variant, please wait..."
                          >
                            Add variant
                          </SubmitButton>
                        </div>
                      </Stack>
                    </Form>
                  </div>
                }
              />
            </CardContent>
          )}

          {hasVariants && (
            <VariantList
              variants={variants}
              errors={actionData?.errors}
              action={
                <Form
                  method="post"
                  aria-label="Add a new variant"
                  ref={formRef}
                >
                  <input type="hidden" value="add-variant" name="_type" />
                  <input
                    type="hidden"
                    value={remainingPercentage}
                    name="remainingPercent"
                  />
                  <Stack spacing={6}>
                    <div className="flex flex-col md:flex-row gap-3 md:items-end">
                      <TextInput
                        name={"value"}
                        label={"New variant"}
                        placeholder="e.g: Alternative"
                        isInvalid={Boolean(actionData?.errors?.value)}
                      />

                      <SubmitButton
                        variant={hasVariants ? "secondary" : "primary"}
                        isLoading={isAdding}
                        loadingText="Saving the variant, please wait..."
                      >
                        Add variant
                      </SubmitButton>
                    </div>
                  </Stack>
                </Form>
              }
            />
          )}
        </Card>
      </Section>
    </DashboardLayout>
  );
}
