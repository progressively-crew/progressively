import { BreadCrumbs } from "~/components/Breadcrumbs";
import { ButtonCopy } from "~/components/ButtonCopy";
import { ErrorBox } from "~/components/ErrorBox";
import { WarningBox } from "~/components/WarningBox";
import { authGuard } from "~/modules/auth/services/auth-guard";
import { Environment } from "~/modules/environments/types";
import { getProject } from "~/modules/projects/services/getProject";
import { Project, UserProject, UserRoles } from "~/modules/projects/types";
import { User } from "~/modules/user/types";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { getSession } from "~/sessions";
import { Header } from "~/components/Header";
import { Section } from "~/components/Section";
import { Button } from "~/components/Buttons/Button";
import { DeleteEntityLayout } from "~/layouts/DeleteEntityLayout";
import { Typography } from "~/components/Typography";
import { Li, Ul } from "~/components/Ul";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { Crumbs } from "~/components/Breadcrumbs/types";
import {
  MetaFunction,
  LoaderFunction,
  ActionFunction,
  redirect,
} from "@remix-run/node";
import {
  useLoaderData,
  useActionData,
  Form,
  useTransition,
} from "@remix-run/react";
import { AiOutlineExperiment } from "react-icons/ai";
import { Experiment } from "~/modules/ab/types";
import { getExperimentById } from "~/modules/ab/services/getExperimentById";
import { deleteExperiment } from "~/modules/ab/services/deleteExperiment";

interface MetaArgs {
  data?: {
    project?: Project;
    environment?: Environment;
    experiment?: Experiment;
  };
}

export const meta: MetaFunction = ({ data }: MetaArgs) => {
  const projectName = data?.project?.name || "An error ocurred";
  const envName = data?.environment?.name || "An error ocurred";
  const experimentName = data?.experiment?.name || "An error ocurred";

  return {
    title: `Progressively | ${projectName} | ${envName} | ${experimentName} | Settings | Delete`,
  };
};

interface LoaderData {
  project: Project;
  adminOfProject: Array<User>;
  environment: Environment;
  userRole?: UserRoles;
  user: User;
  experiment: Experiment;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const user = await authGuard(request);
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const project: Project = await getProject(params.id!, authCookie, true);

  const environment = project.environments.find(
    (env) => env.uuid === params.env
  );

  const userProject: UserProject | undefined = project.userProject?.find(
    (userProject) => userProject.userId === user.uuid
  );

  const experiment = await getExperimentById(params.experimentId!, authCookie);

  const adminOfProject = (project?.userProject || [])
    ?.filter((up) => up.role === UserRoles.Admin)
    .map((up) => up.user) as Array<User>;

  return {
    project,
    environment: environment!,
    userRole: userProject?.role,
    adminOfProject,
    user,
    experiment,
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
  const experimentId = params.experimentId!;

  try {
    await deleteExperiment(experimentId, session.get("auth-cookie"));
  } catch (e: unknown) {
    if (e instanceof Error) {
      return { errors: { backendError: e.message } };
    }

    return { errors: { backendError: "An error ocurred" } };
  }

  return redirect(
    `/dashboard/projects/${projectId}/environments/${envId}/ab?experimentRemoved=true#experiment-removed`
  );
};

export default function DeleteExperimentPage() {
  const transition = useTransition();

  const { project, userRole, experiment, adminOfProject, environment, user } =
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
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/ab`,
      label: environment.name,
    },
    {
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/ab/${experiment.uuid}`,
      label: experiment.name,
      icon: <AiOutlineExperiment aria-hidden />,
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

                  <ButtonCopy toCopy={user.email}>{user.email}</ButtonCopy>
                </Li>
              ))}
            </Ul>
          </figure>
        </Section>
      </DashboardLayout>
    );
  }

  const warnings = {
    "turned-off":
      "All your experiments variants will be turned off and removed",
    "stats-deleted": "All the stats related to the experiment will be removed",
  };

  return (
    <DeleteEntityLayout
      user={user}
      breadcrumb={<BreadCrumbs crumbs={crumbs} />}
      header={<Header title="Deleting an experiment" />}
      error={
        data?.errors &&
        data.errors.backendError && <ErrorBox list={data.errors} />
      }
      cancelAction={
        <Button
          variant="ghost"
          to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/ab/${experiment.uuid}/variants`}
        >
          No, {`don't`} delete {experiment.name}
        </Button>
      }
      confirmAction={
        <Form method="post">
          <DeleteButton
            type="submit"
            isLoading={transition.state === "submitting"}
            loadingText="Deleting the experiment, please wait..."
          >
            Yes, delete the experiment
          </DeleteButton>
        </Form>
      }
    >
      <WarningBox
        list={warnings}
        title={
          <>
            We really want to warn you: if you validate the experiment
            suppression, you {`won't`} be able to access the {experiment.name}{" "}
            experiment anymore. It includes:
          </>
        }
      />
    </DeleteEntityLayout>
  );
}
