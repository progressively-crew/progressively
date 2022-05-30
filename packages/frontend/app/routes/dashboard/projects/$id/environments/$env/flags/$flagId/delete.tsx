import {
  ActionFunction,
  Form,
  LoaderFunction,
  MetaFunction,
  redirect,
  useActionData,
  useLoaderData,
  useTransition,
} from "remix";
import { Crumbs, BreadCrumbs } from "~/components/AppBreadcrumbs";
import { ErrorBox } from "~/components/ErrorBox";
import { WarningBox } from "~/components/WarningBox";
import { authGuard } from "~/modules/auth/services/auth-guard";
import { Environment } from "~/modules/environments/types";
import { getProject } from "~/modules/projects/services/getProject";
import { Project } from "~/modules/projects/types";
import { User } from "~/modules/user/types";
import { getSession } from "~/sessions";
import { Header } from "~/components/Header";
import { FlagEnv } from "~/modules/flags/types";
import { getFlagsByProjectEnv } from "~/modules/flags/services/getFlagsByProjectEnv";
import { deleteFlag } from "~/modules/flags/services/deleteFlag";
import { Button } from "~/components/Buttons/Button";
import { DeleteEntityLayout } from "~/layouts/DeleteEntityLayout";
import { Typography } from "~/components/Typography";
import { DeleteButton } from "~/components/Buttons/DeleteButton";

interface MetaArgs {
  data?: {
    project?: Project;
    environment?: Environment;
    currentFlagEnv?: FlagEnv;
  };
}

export const meta: MetaFunction = ({ data }: MetaArgs) => {
  const projectName = data?.project?.name || "An error ocurred";
  const envName = data?.environment?.name || "An error ocurred";
  const flagName = data?.currentFlagEnv?.flag?.name || "An error ocurred";

  return {
    title: `Progressively | ${projectName} | ${envName} | ${flagName} | Delete`,
  };
};

interface LoaderData {
  project: Project;
  environment: Environment;
  user: User;
  currentFlagEnv: FlagEnv;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const user = await authGuard(request);
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const project: Project = await getProject(
    params.id!,
    session.get("auth-cookie"),
    true
  );

  const flagsByEnv: Array<FlagEnv> = await getFlagsByProjectEnv(
    params.env!,
    authCookie
  );

  const environment = project.environments.find(
    (env) => env.uuid === params.env
  );

  const currentFlagEnv = flagsByEnv.find(
    (flagEnv) => flagEnv.flagId === params.flagId!
  )!;

  return {
    project,
    environment: environment!,
    user,
    currentFlagEnv,
  };
};

interface ActionData {
  errors?: {
    backendError?: string;
  };
}

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<ActionData | Response> => {
  const session = await getSession(request.headers.get("Cookie"));
  const projectId = params.id!;
  const envId = params.env!;
  const flagId = params.flagId!;

  try {
    await deleteFlag(envId, flagId, session.get("auth-cookie"));
  } catch (e: unknown) {
    if (e instanceof Error) {
      return { errors: { backendError: e.message } };
    }

    return { errors: { backendError: "An error ocurred" } };
  }

  return redirect(
    `/dashboard/projects/${projectId}/environments/${envId}/flags?flagRemoved=true#flag-removed`
  );
};

export default function DeleteFlagPage() {
  const transition = useTransition();

  const { project, environment, user, currentFlagEnv } =
    useLoaderData<LoaderData>();
  const data = useActionData<ActionData>();

  const currentFlag = currentFlagEnv.flag;

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
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}`,
      label: currentFlag.name,
    },
  ];

  const warnings = {
    "turned-off": "All your feature flags will be turned off and removed",
    "stats-deleted": "All the stats related to the flag will be removed",
  };

  return (
    <DeleteEntityLayout
      user={user}
      breadcrumb={<BreadCrumbs crumbs={crumbs} />}
      header={<Header title="Deleting a feature flag" />}
      error={
        data?.errors &&
        data.errors.backendError && <ErrorBox list={data.errors} />
      }
      cancelAction={
        <Button
          variant="ghost"
          to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags/${currentFlag.uuid}/settings`}
        >
          No, {`don't`} delete {currentFlag.name}
        </Button>
      }
      confirmAction={
        <Form method="post">
          <DeleteButton
            type="submit"
            isLoading={transition.state === "submitting"}
            loadingText="Deleting the environment, please wait..."
          >
            Yes, delete the flag
          </DeleteButton>
        </Form>
      }
    >
      <WarningBox
        list={warnings}
        title={
          <>
            We really want to warn you: if you validate the flag suppression,
            you {`won't`} be able to access the{" "}
            <strong>{currentFlag.name}</strong> flag anymore. It includes:
          </>
        }
      />
    </DeleteEntityLayout>
  );
}
