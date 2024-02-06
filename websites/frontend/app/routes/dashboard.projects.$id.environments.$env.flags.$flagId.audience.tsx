import { DashboardLayout } from "~/layouts/DashboardLayout";
import { getSession } from "~/sessions";
import { Section } from "~/components/Section";
import {
  ActionFunction,
  LoaderFunction,
  V2_MetaFunction,
} from "@remix-run/node";
import {
  Form,
  Outlet,
  useActionData,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "@remix-run/react";
import { FlagEnvMenu } from "~/modules/flags/components/FlagEnvMenu";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { useFlagEnv } from "~/modules/flags/contexts/useFlagEnv";
import { getFlagEnvMetaTitle } from "~/modules/flags/services/getFlagEnvMetaTitle";
import { toggleFlagAction } from "~/modules/flags/form-actions/toggleFlagAction";
import { PageTitle } from "~/components/PageTitle";
import { Strategy } from "~/modules/strategy/types";
import { getStrategies } from "~/modules/strategy/services/getStrategies";
import { StrategyList } from "~/modules/strategy/components/StrategyList/StrategyList";
import { createStrategy } from "~/modules/strategy/services/createStrategy";
import { deleteStrategy } from "~/modules/strategy/services/deleteStrategy";
import { editStrategyAction } from "~/modules/strategy/form-actions/editStrategyAction";
import { Variant } from "~/modules/variants/types";
import { getVariants } from "~/modules/variants/services/getVariants";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { Typography } from "~/components/Typography";
import qs from "qs";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { TipBox } from "~/components/Boxes/TipBox";
import { FlagStatus } from "~/modules/flags/types";

export const meta: V2_MetaFunction = ({ matches, params }) => {
  const projectName = getProjectMetaTitle(matches);
  const envName = getEnvMetaTitle(matches, params.env!);
  const flagName = getFlagEnvMetaTitle(matches);

  return [
    {
      title: `Progressively | ${projectName} | ${envName} | Flags | ${flagName}`,
    },
  ];
};

type ActionDataType = null | {
  successChangePercentage?: boolean;
  successEdit?: boolean;
  errors?: { [key: string]: string | undefined };
  successStrategyEdited?: boolean;
  successStrategyDeleted?: boolean;
};

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<ActionDataType> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const clonedRequest = request.clone();

  const formData = await request.formData();
  const type = formData.get("_type");

  if (type === "add-strategy") {
    return await createStrategy(params.env!, params.flagId!, authCookie);
  }

  if (type === "delete-strategy") {
    const strategyId = formData.get("uuid")?.toString();
    if (strategyId) {
      await deleteStrategy(strategyId, authCookie);

      return {
        successStrategyDeleted: true,
      };
    }
  }

  if (type === "toggle-flag") {
    return toggleFlagAction(formData, params, authCookie);
  }

  if (type === "edit-strategy") {
    const formQueryString = await clonedRequest.text();
    const formObject = qs.parse(formQueryString, { depth: 4 });

    return editStrategyAction(
      params.env!,
      params.flagId!,
      formObject,
      authCookie
    );
  }

  return null;
};

interface LoaderData {
  strategies: Array<Strategy>;
  variants: Array<Variant>;
}

export const loader: LoaderFunction = async ({
  params,
  request,
}): Promise<LoaderData> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const strategies: Array<Strategy> = await getStrategies(
    params.env!,
    params.flagId!,
    authCookie
  );

  const variants: Array<Variant> = await getVariants(
    params.env!,
    params.flagId!,
    authCookie
  );

  return { strategies, variants };
};

export default function FlagById() {
  const actionData = useActionData<ActionDataType>();
  const [searchParams] = useSearchParams();
  const { project } = useProject();
  const { environment } = useEnvironment();
  const { flagEnv } = useFlagEnv();
  const { strategies, variants } = useLoaderData<LoaderData>();
  const navigation = useNavigation();

  const type = navigation?.formData?.get("_type");
  const isCreatingStrategy = type === "add-strategy";

  const isVariantRemoved = searchParams.get("variantRemoved") || undefined;
  const isVariantAdded = searchParams.get("newVariant") || undefined;

  return (
    <>
      <DashboardLayout
        subNav={
          <FlagEnvMenu
            projectId={project.uuid}
            envId={environment.uuid}
            flagEnv={flagEnv}
          />
        }
        status={
          actionData?.successStrategyEdited ? (
            <SuccessBox id={"strategy-edited"}>
              The strategy has been successfully edited.
            </SuccessBox>
          ) : actionData?.successStrategyDeleted ? (
            <SuccessBox id="strategy-deleted">
              The strategy has been removed.
            </SuccessBox>
          ) : isVariantRemoved ? (
            <SuccessBox id="variant-removed">
              The variant has been successfully removed.
            </SuccessBox>
          ) : isVariantAdded ? (
            <SuccessBox id="variant-added">
              The variant has been successfully created.
            </SuccessBox>
          ) : null
        }
      >
        {flagEnv.status === FlagStatus.NOT_ACTIVATED ? (
          <TipBox title="Flag is not activated">
            Your flag is not actived. Every user will resolve the{" "}
            <strong>false</strong> variation of the feature flag.
          </TipBox>
        ) : null}

        <PageTitle
          value="Audience"
          description={
            <Typography>
              When one user requests flags evaluations from an SDK, if they
              match <strong>at least one of the following strategies</strong>,
              they will resolve an activated flag with the associated value
              (variant value or "true").
            </Typography>
          }
          action={
            strategies.length > 0 && (
              <SubmitButton type="submit" form="save-strategies">
                Save strategies
              </SubmitButton>
            )
          }
        />

        <Section id="rollout-target">
          {strategies.length > 0 ? (
            <StrategyList items={strategies} variants={variants} />
          ) : null}

          <Form method="post" className="pt-2">
            <input type="hidden" name="_type" value="add-strategy" />
            <button
              aria-busy={isCreatingStrategy}
              type="submit"
              className="relative border border-dashed border-slate-300 w-full py-4 rounded text-slate-600 hover:bg-slate-100 active:bg-slate-200"
            >
              Add a strategy
            </button>
          </Form>
        </Section>
      </DashboardLayout>
      <Outlet />
    </>
  );
}
