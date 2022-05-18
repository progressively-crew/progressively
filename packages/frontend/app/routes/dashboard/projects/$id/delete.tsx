import { Box } from "@chakra-ui/react";
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
import { BreadCrumbs, Crumbs } from "~/components/AppBreadcrumbs";
import { ButtonCopy } from "~/components/ButtonCopy";
import { ErrorBox } from "~/components/ErrorBox";
import { FaTrash } from "react-icons/fa";
import { WarningBox } from "~/components/WarningBox";
import { authGuard } from "~/modules/auth/services/auth-guard";
import { deleteProject } from "~/modules/projects/services/deleteProject";
import { getProject } from "~/modules/projects/services/getProject";
import { Project, UserProject, UserRoles } from "~/modules/projects/types";
import { User } from "~/modules/user/types";
import { getSession } from "~/sessions";
import { Header } from "~/components/Header";
import { Button } from "~/components/Button";
import { DeleteEntityLayout } from "~/layouts/DeleteEntityLayout";
import { Typography } from "~/components/Typography";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { Li, Ul } from "~/components/Ul";

interface MetaArgs {
  data?: {
    project?: Project;
  };
}

export const meta: MetaFunction = ({ data }: MetaArgs) => {
  const title = data?.project?.name || "An error ocurred";

  return {
    title: `Progressively | ${title} | Delete`,
  };
};

interface LoaderData {
  project: Project;
  adminOfProject: Array<User>;
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

  const userProject: UserProject | undefined = project.userProject?.find(
    (userProject) => userProject.userId === user.uuid
  );

  const adminOfProject = (project?.userProject || [])
    ?.filter((up) => up.role === UserRoles.Admin)
    .map((up) => up.user) as Array<User>;

  return { user, project, userRole: userProject?.role, adminOfProject };
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
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          backendError: err.message,
        },
      };
    }

    return { errors: { backendError: "An error ocurred" } };
  }

  return redirect(`/dashboard?projectRemoved=true#project-removed`);
};

export default function DeleteProjectPage() {
  const transition = useTransition();
  const { project, userRole, adminOfProject, user } =
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
      link: `/dashboard/projects/${project.uuid}/delete`,
      label: "Delete the project",
    },
  ];

  if (userRole !== UserRoles.Admin) {
    return (
      <DeleteEntityLayout
        user={user}
        breadcrumb={<BreadCrumbs crumbs={crumbs} />}
        header={<Header title="You are not allowed to delete projects." />}
      >
        <figure>
          <Typography as="figcaption">
            If you think this is an error, make sure to contact one of the
            project administrators:
          </Typography>

          <Box pl={2} mt={2}>
            <Ul>
              {adminOfProject.map((user) => (
                <Li key={user.uuid}>
                  <Box as="span" mr={2}>
                    <Typography as="span">{user.fullname}</Typography>
                  </Box>

                  <ButtonCopy
                    toCopy={user.email}
                    icon={<MdOutlineEmail aria-hidden />}
                  >
                    {user.email}
                  </ButtonCopy>
                </Li>
              ))}
            </Ul>
          </Box>
        </figure>
      </DeleteEntityLayout>
    );
  }

  const warnings = {
    "turned-off": "All your feature flags will be turned off and removed",
    "env-deleted": "The associated environments will be removed",
    "stats-deleted": "All the stats related to the project will be removed",
  };

  return (
    <DeleteEntityLayout
      user={user}
      header={<Header title="Deleting a project" />}
      breadcrumb={<BreadCrumbs crumbs={crumbs} />}
      error={
        data?.errors &&
        data.errors.backendError && (
          <Box pb={4}>
            <ErrorBox list={data.errors} />
          </Box>
        )
      }
      cancelAction={
        <Button
          to={`/dashboard/projects/${project.uuid}/settings`}
          variant="outline"
          colorScheme="error"
        >
          <span>
            No, {`don't`} delete{" "}
            <Box as="strong" display={["none", "inline"]} aria-hidden>
              {project.name}
            </Box>
            <VisuallyHidden>{project.name}</VisuallyHidden>
          </span>
        </Button>
      }
      confirmAction={
        <Form method="post">
          <Button
            type="submit"
            colorScheme="error"
            leftIcon={<FaTrash aria-hidden />}
            isLoading={transition.state === "submitting"}
            loadingText="Deleting the project, please wait..."
            disabled={false}
          >
            Yes, delete the project
          </Button>
        </Form>
      }
    >
      <WarningBox
        list={warnings}
        title={
          <Typography>
            We really want to warn you: if you validate the project suppression,
            you {`won't`} be able to access the <strong>{project.name}</strong>{" "}
            project anymore. It includes:
          </Typography>
        }
      />
    </DeleteEntityLayout>
  );
}
