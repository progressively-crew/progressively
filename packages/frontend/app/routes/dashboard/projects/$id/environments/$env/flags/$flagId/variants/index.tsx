import { ActionFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
import { useState } from "react";
import { AiOutlineAppstore } from "react-icons/ai";
import { FiFlag } from "react-icons/fi";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { BreadCrumbs } from "~/components/Breadcrumbs";
import { Crumbs } from "~/components/Breadcrumbs/types";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { Card, CardContent } from "~/components/Card";
import { EmptyState } from "~/components/EmptyState";
import { SliderInput } from "~/components/Fields/SliderInput";
import { TextInput } from "~/components/Fields/TextInput";
import { Header } from "~/components/Header";
import { Heading } from "~/components/Heading";
import { HStack } from "~/components/HStack";
import { Section, SectionHeader } from "~/components/Section";
import { Spacer } from "~/components/Spacer";
import { Stack } from "~/components/Stack";
import { TagLine } from "~/components/Tagline";
import { Typography } from "~/components/Typography";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { FlagMenu } from "~/modules/flags/components/FlagMenu";
import { ToggleFlag } from "~/modules/flags/components/ToggleFlag";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { activateFlag } from "~/modules/flags/services/activateFlag";
import { getFlagMetaTitle } from "~/modules/flags/services/getFlagMetaTitle";
import { FlagStatus } from "~/modules/flags/types";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useUser } from "~/modules/user/contexts/useUser";
import { VariantList } from "~/modules/variants/components/VariantList";
import { createVariant } from "~/modules/variants/services/createVariant";
import { deleteVariant } from "~/modules/variants/services/deleteVariant";
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
  errors?: { [key: string]: string };
};

/* eslint-disable sonarjs/cognitive-complexity */
export const action: ActionFunction = async ({
  request,
  params,
}): Promise<ActionDataType> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");
  const flagId = params.flagId;
  const formData = await request.formData();
  const type = formData.get("_type");

  if (type === "delete-variant") {
    const uuid = formData.get("variantId");
    try {
      await deleteVariant(
        params.env!,
        flagId as string,
        String(uuid),
        authCookie
      );

      return { successDelete: true };
    } catch (e: unknown) {
      if (e instanceof Error) {
        return { errors: { backendError: e.message } };
      }

      return { errors: { backendError: "An error ocurred" } };
    }
  }

  if (type === "add-variant") {
    const remainingPercent = Number(formData.get("remainingPercent"));
    const rolloutPercentage = Number(formData.get("rolloutPercentage"));
    const value = String(formData.get("value"));
    const isControl = Boolean(formData.get("isControl"));

    if (!value) {
      return {
        errors: {
          invalidValue:
            "The variant value is not valid. Make sure to fill one.",
        },
      };
    }

    if (remainingPercent - rolloutPercentage < 0) {
      return {
        errors: {
          invalidPercentage:
            "The sum of all the variant targets is over 100%. You should adjust them",
        },
      };
    }

    try {
      const variant: VariantCreateDTO = {
        isControl,
        rolloutPercentage,
        value,
      };

      await createVariant(params.env!, flagId as string, variant, authCookie);
    } catch (e: unknown) {
      if (e instanceof Error) {
        return { errors: { backendError: e.message } };
      }

      return { errors: { backendError: "An error ocurred" } };
    }

    return null;
  }

  const nextStatus = formData.get("nextStatus");

  if (nextStatus && flagId) {
    await activateFlag(
      params.env!,
      flagId as string,
      nextStatus as FlagStatus,
      authCookie
    );
  }

  return null;
};

interface FormSliderInputProps {
  initialPercentage: number;
}
const FormSliderInput = ({ initialPercentage }: FormSliderInputProps) => {
  const [percentage, setPercentage] = useState(initialPercentage);

  return (
    <SliderInput
      onChange={setPercentage}
      percentageValue={percentage}
      name="rolloutPercentage"
      label="Rollout percentage"
    />
  );
};

export default function VariantsOfFlag() {
  const { user } = useUser();
  const { project } = useProject();
  const { environment } = useEnvironment();
  const { flagEnv } = useFlagEnv();
  const { variants } = useLoaderData<LoaderData>();
  const transition = useTransition();
  const actionData = useActionData<ActionDataType>();

  const currentFlag = flagEnv.flag;

  const isFlagActivated = flagEnv.status === FlagStatus.ACTIVATED;

  const crumbs: Crumbs = [
    {
      link: "/dashboard",
      label: "Projects",
    },
    {
      link: `/dashboard/projects/${project.uuid}`,
      label: project.name,
    },
    {
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags`,
      label: environment.name,
    },
    {
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/variants`,
      label: currentFlag.name,
    },
  ];

  const hasVariants = variants.length > 0;
  const remainingPercentage = getRemainingPercentage(variants);

  return (
    <DashboardLayout
      user={user}
      breadcrumb={<BreadCrumbs crumbs={crumbs} />}
      header={
        <Header
          tagline={<TagLine icon={<FiFlag />}>FEATURE FLAG</TagLine>}
          title={currentFlag.name}
          startAction={<ToggleFlag isFlagActivated={isFlagActivated} />}
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
        <>
          {actionData?.errors ? (
            <ErrorBox list={actionData?.errors} />
          ) : actionData?.successDelete ? (
            <SuccessBox id="variant-deleted">
              The variant has been successfully deleted
            </SuccessBox>
          ) : null}
        </>
      }
    >
      <Stack spacing={8}>
        <Heading as={"h2"} fontSize="earth" icon={<AiOutlineAppstore />}>
          Variants
        </Heading>

        <Section id="list">
          <Card>
            <CardContent noBottom>
              <SectionHeader title="List of variants" />
            </CardContent>

            {!hasVariants && (
              <EmptyState
                title="No variants found"
                description={
                  <Typography>
                    There are no variants found for this flag.
                  </Typography>
                }
              />
            )}

            {hasVariants && (
              <VariantList
                variants={variants}
                projectId={project.uuid}
                envId={environment.uuid}
                flagId={currentFlag.uuid}
              />
            )}
          </Card>
        </Section>

        <Section id="add-variant">
          <Card>
            <CardContent>
              <SectionHeader title="Add a variant" />

              <Spacer size={4} />

              <Form method="post" aria-label="Add a new variant">
                <input type="hidden" value="add-variant" name="_type" />
                <input
                  type="hidden"
                  value={remainingPercentage}
                  name="remainingPercent"
                />
                <Stack spacing={6}>
                  <HStack spacing={6}>
                    <TextInput
                      name={"value"}
                      label={"Variant value"}
                      placeholder="e.g: Alternative"
                    />

                    <FormSliderInput initialPercentage={remainingPercentage} />
                  </HStack>

                  <div>
                    <SubmitButton
                      isLoading={transition.state === "submitting"}
                      loadingText="Saving the variant, please wait..."
                    >
                      Add variant
                    </SubmitButton>
                  </div>
                </Stack>
              </Form>
            </CardContent>
          </Card>
        </Section>
      </Stack>
    </DashboardLayout>
  );
}
