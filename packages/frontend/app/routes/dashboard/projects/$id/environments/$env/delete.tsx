import { MdOutlineEmail } from "react-icons/md";
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
import { ButtonCopy } from "~/components/ButtonCopy";
import { ErrorBox } from "~/components/ErrorBox";
import { FaTrash } from "react-icons/fa";
import { WarningBox } from "~/components/WarningBox";
import { authGuard } from "~/modules/auth/services/auth-guard";
import { deleteEnvironment } from "~/modules/environments/services/deleteEnvironment";
import { Environment } from "~/modules/environments/types";
import { getProject } from "~/modules/projects/services/getProject";
import { Project, UserProject, UserRoles } from "~/modules/projects/types";
import { User } from "~/modules/user/types";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { getSession } from "~/sessions";
import { Header } from "~/components/Header";
import { Section } from "~/components/Section";
import { Button } from "~/components/Button";
import { DeleteEntityLayout } from "~/layouts/DeleteEntityLayout";
import { Typography } from "~/components/Typography";
import { Li, Ul } from "~/components/Ul";

interface MetaArgs {
  data?: {
    project?: Project;
    environment?: Environment;
  };
}

export const meta: MetaFunction = ({ data }: MetaArgs) => {
  const projectName = data?.project?.name || "An error ocurred";
  const envName = data?.environment?.name || "An error ocurred";

  return {
    title: `Progressively | ${projectName} | ${envName} | Settings | Delete`,
  };
};

interface LoaderData {
  project: Project;
  adminOfProject: Array<User>;
  environment: Environment;
  userRole?: UserRoles;
  user: User;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const user = await authGuard(request);
  const session = await getSession(request.headers.get("Cookie"));

  const project: Project = await getProject(
    params.id!,
    session.get("auth-cookie"),
    true
  );

  const environment = project.environments.find(
    (env) => env.uuid === params.env
  );

  const userProject: UserProject | undefined = project.userProject?.find(
    (userProject) => userProject.userId === user.uuid
  );

  const adminOfProject = (project?.userProject || [])
    ?.filter((up) => up.role === UserRoles.Admin)
    .map((up) => up.user) as Array<User>;

  return {
    project,
    environment: environment!,
    userRole: userProject?.role,
    adminOfProject,
    user,
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

  try {
    await deleteEnvironment(envId, session.get("auth-cookie"));
  } catch (e: unknown) {
    if (e instanceof Error) {
      return { errors: { backendError: e.message } };
    }

    return { errors: { backendError: "An error ocurred" } };
  }

  return redirect(
    `/dashboard/projects/${projectId}?envRemoved=true#env-removed`
  );
};

export default function DeleteEnvPage() {
  const transition = useTransition();

  const { project, userRole, adminOfProject, environment, user } =
    useLoaderData<LoaderData>();
  const data = useActionData<ActionData>();

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
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/delete`,
      label: "Delete the environment",
    },
  ];

  if (userRole !== UserRoles.Admin) {
    return (
      <DashboardLayout
        user={user}
        breadcrumb={<BreadCrumbs crumbs={crumbs} />}
        header={<Header title="You are not allowed to delete environments." />}
      >
        <Section>
          <figure>
            <Typography as="figcaption">
              If you think this is an error, make sure to contact one of the
              project administrators:
            </Typography>

            <Ul>
              {adminOfProject.map((user) => (
                <Li key={user.uuid}>
                  <Typography>{user.fullname}</Typography>

                  <ButtonCopy
                    toCopy={user.email}
                    icon={<MdOutlineEmail aria-hidden />}
                  >
                    {user.email}
                  </ButtonCopy>
                </Li>
              ))}
            </Ul>
          </figure>
        </Section>
      </DashboardLayout>
    );
  }

  const warnings = {
    "turned-off": "All your feature flags will be turned off and removed",
    "stats-deleted": "All the stats related to the environment will be removed",
  };

  return (
    <DeleteEntityLayout
      user={user}
      breadcrumb={<BreadCrumbs crumbs={crumbs} />}
      header={<Header title="Deleting an environment" />}
      error={
        data?.errors &&
        data.errors.backendError && <ErrorBox list={data.errors} />
      }
      cancelAction={
        <Button
          to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/settings`}
          variant="outline"
          colorScheme="error"
        >
          No, {`don't`} delete <strong>{environment.name}</strong>
        </Button>
      }
      confirmAction={
        <Form method="post">
          <Button
            type="submit"
            colorScheme="error"
            leftIcon={<FaTrash aria-hidden />}
            isLoading={transition.state === "submitting"}
            loadingText="Deleting the environment, please wait..."
            disabled={false}
          >
            Yes, delete the environment
          </Button>
        </Form>
      }
    >
      <WarningBox
        list={warnings}
        title={
          <Typography>
            We really want to warn you: if you validate the environment
            suppression, you {`won't`} be able to access the{" "}
            <strong>{environment.name}</strong> environment anymore. It
            includes:
          </Typography>
        }
      />
    </DeleteEntityLayout>
  );
}
