import { BreadCrumbs } from "~/components/Breadcrumbs";
import { ButtonCopy } from "~/components/ButtonCopy";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { WarningBox } from "~/components/Boxes/WarningBox";
import { deleteProject } from "~/modules/projects/services/deleteProject";
import { UserRoles } from "~/modules/projects/types";
import { User } from "~/modules/user/types";
import { getSession } from "~/sessions";
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
import { PageTitle } from "~/components/PageTitle";
import { Stack } from "~/components/Stack";

export const meta: MetaFunction = ({ parentsData }) => {
  const projectName = getProjectMetaTitle(parentsData);

  return {
    title: `Progressively | ${projectName} | Delete`,
  };
};

interface ActionData {
  errors: {
    backendError?: string;
  };
}

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<ActionData | Response> => {
  const session = await getSession(request.headers.get("Cookie"));

  try {
    await deleteProject(params.id!, session.get("auth-cookie"));
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          backendError: error.message,
        },
      };
    }

    return { errors: { backendError: "An error ocurred" } };
  }

  return redirect(`/dashboard?projectRemoved=true#project-removed`);
};

export default function DeleteProjectPage() {
  const transition = useTransition();
  const { project, userRole } = useProject();
  const { user } = useUser();

  const data = useActionData<ActionData>();

  const adminOfProject = (project?.userProject || [])
    ?.filter((up) => up.role === UserRoles.Admin)
    .map((up) => up.user) as Array<User>;

  const crumbs: Crumbs = [
    {
      link: "/dashboard",
      label: "Projects",
      isRoot: true,
    },
    {
      link: `/dashboard/projects/${project.uuid}`,
      label: project.name,
      isProject: true,
    },
    {
      link: `/dashboard/projects/${project.uuid}/delete`,
      label: "Delete the project",
    },
  ];

  if (userRole !== UserRoles.Admin) {
    return (
      <DeleteEntityLayout
        user={user}
        breadcrumb={<BreadCrumbs crumbs={crumbs} />}
        header={<PageTitle value="You are not allowed to delete projects." />}
      >
        <figure>
          <Typography as="figcaption">
            If you think this is an error, make sure to contact one of the
            project administrators:
          </Typography>

          <Ul>
            {adminOfProject.map((user) => (
              <Li key={user.uuid}>
                <Typography as="span">{user.fullname}</Typography>

                <ButtonCopy toCopy={user.email}>{user.email}</ButtonCopy>
              </Li>
            ))}
          </Ul>
        </figure>
      </DeleteEntityLayout>
    );
  }

  return (
    <DeleteEntityLayout
      user={user}
      header={<PageTitle value="Deleting a project" />}
      breadcrumb={<BreadCrumbs crumbs={crumbs} />}
      error={
        data?.errors &&
        data.errors.backendError && <ErrorBox list={data.errors} />
      }
      cancelAction={
        <Button
          to={`/dashboard/projects/${project.uuid}/settings`}
          variant="secondary"
        >
          No, {`don't`} delete {project.name}
        </Button>
      }
      confirmAction={
        <Form method="post">
          <DeleteButton
            variant="primary"
            scheme=""
            type="submit"
            isLoading={transition.state === "submitting"}
            loadingText="Deleting the project, please wait..."
          >
            Yes, delete the project
          </DeleteButton>
        </Form>
      }
    >
      <Stack spacing={4}>
        <WarningBox title={<>This operation is definitive.</>} />

        <Typography color="hadesLight">
          If you validate the suppression, all the environments of the project,
          and all the associated feature flags will be removed.
        </Typography>

        <Typography color="hadesLight">
          You won't have access to the flags analytics anymore.
        </Typography>

        <Typography color="hadesLight">
          There will be no way to get the data back.
        </Typography>
      </Stack>
    </DeleteEntityLayout>
  );
}
