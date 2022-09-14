import { BreadCrumbs } from "~/components/Breadcrumbs";
import { ButtonCopy } from "~/components/ButtonCopy";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { WarningBox } from "~/components/Boxes/WarningBox";
import { deleteEnvironment } from "~/modules/environments/services/deleteEnvironment";
import { UserRoles } from "~/modules/projects/types";
import { User } from "~/modules/user/types";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { getSession } from "~/sessions";
import { Section } from "~/components/Section";
import { Button } from "~/components/Buttons/Button";
import { DeleteEntityLayout } from "~/layouts/DeleteEntityLayout";
import { Typography } from "~/components/Typography";
import { Li, Ul } from "~/components/Ul";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { Crumbs } from "~/components/Breadcrumbs/types";
import { MetaFunction, ActionFunction, redirect } from "@remix-run/node";
import { useActionData, Form, useTransition } from "@remix-run/react";
import { useProject } from "~/modules/projects/contexts/useProject";
import { useUser } from "~/modules/user/contexts/useUser";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { PageTitle } from "~/components/PageTitle";

export const meta: MetaFunction = ({ parentsData, params }) => {
  const projectName = getProjectMetaTitle(parentsData);
  const envName = getEnvMetaTitle(parentsData, params.env);

  return {
    title: `Progressively | ${projectName} | ${envName} | Settings | Delete`,
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

  return redirect(`/dashboard/projects/${projectId}?envRemoved=true#env-removed`);
};

export default function DeleteEnvPage() {
  const transition = useTransition();
  const { user } = useUser();
  const data = useActionData<ActionData>();
  const { project, userRole } = useProject();
  const { environment } = useEnvironment();

  const adminOfProject = (project?.userProject || [])
    ?.filter((up) => up.role === UserRoles.Admin)
    .map((up) => up.user) as Array<User>;

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
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}`,
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
        header={<PageTitle value="You are not allowed to delete environments." />}
      >
        <Section>
          <figure>
            <Typography as="figcaption">
              If you think this is an error, make sure to contact one of the project administrators:
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
    "turned-off": "All your feature flags will be turned off and removed",
    "stats-deleted": "All the stats related to the environment will be removed",
  };

  return (
    <DeleteEntityLayout
      user={user}
      breadcrumb={<BreadCrumbs crumbs={crumbs} />}
      header={<PageTitle value="Deleting an environment" />}
      error={data?.errors && data.errors.backendError && <ErrorBox list={data.errors} />}
      cancelAction={
        <Button
          variant="secondary"
          to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/settings`}
        >
          No, {`don't`} delete {environment.name}
        </Button>
      }
      confirmAction={
        <Form method="post">
          <DeleteButton
            variant="primary"
            type="submit"
            isLoading={transition.state === "submitting"}
            loadingText="Deleting the environment, please wait..."
          >
            Yes, delete the environment
          </DeleteButton>
        </Form>
      }
    >
      <WarningBox
        list={warnings}
        title={
          <>
            We really want to warn you: if you validate the environment suppression, you {`won't`}{" "}
            be able to access the {environment.name} environment anymore. It includes:
          </>
        }
      />
    </DeleteEntityLayout>
  );
}
