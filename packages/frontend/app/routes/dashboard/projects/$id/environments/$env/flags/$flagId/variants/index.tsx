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
import { HStack } from "~/components/HStack";
import { FlagIcon } from "~/components/Icons/FlagIcon";
import { PageTitle } from "~/components/PageTitle";
import { Section } from "~/components/Section";
import { Stack } from "~/components/Stack";
import { TagLine } from "~/components/Tagline";
import { Typography } from "~/components/Typography";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { FlagMenu } from "~/modules/flags/components/FlagMenu";
import { ToggleFlag } from "~/modules/flags/components/ToggleFlag";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { toggleFlagAction } from "~/modules/flags/form-actions/toggleFlagAction";
import { getFlagMetaTitle } from "~/modules/flags/services/getFlagMetaTitle";
import { FlagStatus } from "~/modules/flags/types";
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
    title: `Progressively | ${projectName} | ${envName} | Flags | ${flagName} | Variants`,
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

  if (type === "toggle-flag") {
    return toggleFlagAction(formData, params, authCookie);
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

  const isFlagActivated = flagEnv.status === FlagStatus.ACTIVATED;

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
          startAction={
            <Form method="post">
              <ToggleFlag
                isFlagActivated={isFlagActivated}
                flagId={currentFlag.uuid}
                flagName={currentFlag.name}
              />
            </Form>
          }
        />
      }
      subNav={
        <FlagMenu
          projectId={project.uuid}
          envId={environment.uuid}
          flagId={currentFlag.uuid}
        />
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
    >
      <PageTitle
        value="Variants"
        icon={<AiOutlineAppstore />}
        description={
          <Typography>
            The variants that will be shown to a portion of your population.
          </Typography>
        }
      />

      <Form method="post" aria-label="Add a new variant" ref={formRef}>
        <input type="hidden" value="add-variant" name="_type" />
        <input
          type="hidden"
          value={remainingPercentage}
          name="remainingPercent"
        />
        <Stack spacing={6}>
          <HStack
            spacing={4}
            alignItems={{ "@initial": "flex-end", "@mobile": "none" }}
            direction={{ "@mobile": "column" }}
          >
            <TextInput
              name={"value"}
              label={"New variant value"}
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
          </HStack>
        </Stack>
      </Form>

      <Section aria-label="List of variants">
        {!hasVariants && (
          <Card>
            <CardContent>
              <EmptyState
                titleAs="h2"
                title="No variants found"
                description={
                  <Typography>
                    There are no variants found for this flag.
                  </Typography>
                }
              />
            </CardContent>
          </Card>
        )}

        {hasVariants && (
          <Card>
            <VariantList variants={variants} errors={actionData?.errors} />
          </Card>
        )}
      </Section>
    </DashboardLayout>
  );
}
