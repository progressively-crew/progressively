import {
  Box,
  Flex,
  ListItem,
  Text,
  UnorderedList,
  VisuallyHidden,
} from "@chakra-ui/react";
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
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { authGuard } from "~/modules/auth/auth-guard";
import { deleteProject } from "~/modules/projects/deleteProject";
import { getProject } from "~/modules/projects/getProject";
import { Project, UserProject, UserRoles } from "~/modules/projects/types";
import { User } from "~/modules/user/types";
import { getSession } from "~/sessions";
import { Header } from "~/components/Header";
import { Section } from "~/components/Section";
import { Button } from "~/components/Button";

interface MetaArgs {
  data: {
    project: Project;
  };
}

export const meta: MetaFunction = ({ data }: MetaArgs) => {
  const project = data.project;

  return {
    title: `Rollout | ${project.name} | Delete`,
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
      <DashboardLayout
        user={user}
        breadcrumb={<BreadCrumbs crumbs={crumbs} />}
        header={<Header title="You are not allowed to delete projects." />}
      >
        <Section>
          <figure>
            <Text as="figcaption">
              If you think this is an error, make sure to contact one of the
              project administrators:
            </Text>

            <UnorderedList pl={2} mt={2}>
              {adminOfProject.map((user) => (
                <ListItem key={user.uuid}>
                  <Text as="span" mr={2}>
                    {user.fullname}
                  </Text>
                  <ButtonCopy
                    toCopy={user.email}
                    icon={<MdOutlineEmail aria-hidden />}
                  >
                    {user.email}
                  </ButtonCopy>
                </ListItem>
              ))}
            </UnorderedList>
          </figure>
        </Section>
      </DashboardLayout>
    );
  }

  const warnings = {
    "turned-off": "All your feature flags will be turned off and removed",
    "env-deleted": "The associated environments will be removed",
    "stats-deleted": "All the stats related to the project will be removed",
  };

  return (
    <DashboardLayout
      user={user}
      header={<Header title="You are about to delete the project." />}
      breadcrumb={<BreadCrumbs crumbs={crumbs} />}
    >
      <Section>
        {data?.errors && data.errors.backendError && (
          <Box pb={4}>
            <ErrorBox list={data.errors} />
          </Box>
        )}

        <WarningBox
          list={warnings}
          title={
            <Text>
              We really want to warn you: if you validate the project
              suppression, you {`won't`} be able to access the{" "}
              <strong>{project.name}</strong> project anymore. It includes:
            </Text>
          }
        />

        <Flex
          justifyContent="space-between"
          mt={4}
          direction={["column", "row"]}
        >
          <Button
            to={`/dashboard/projects/${project.uuid}/settings`}
            variant="outline"
            colorScheme="error"
            mt={[4, 0]}
            width={["100%", "auto"]}
          >
            <span>
              No, {`don't`} delete{" "}
              <Box as="strong" display={["none", "inline"]} aria-hidden>
                {project.name}
              </Box>
              <VisuallyHidden>{project.name}</VisuallyHidden>
            </span>
          </Button>
          <Form method="post">
            <Button
              type="submit"
              colorScheme="error"
              leftIcon={<FaTrash aria-hidden />}
              isLoading={transition.state === "submitting"}
              loadingText="Deleting the project, please wait..."
              disabled={false}
              width={["100%", "auto"]}
            >
              Yes, delete the project
            </Button>
          </Form>
        </Flex>
      </Section>
    </DashboardLayout>
  );
}
