import {
  Box,
  ListItem,
  UnorderedList,
  Text,
  Flex,
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
import { Crumbs, BreadCrumbs } from "~/components/AppBreadcrumbs";
import { ButtonCopy } from "~/components/ButtonCopy";
import { ErrorBox } from "~/components/ErrorBox";
import { FaTrash } from "react-icons/fa";
import { WarningBox } from "~/components/WarningBox";
import { authGuard } from "~/modules/auth/auth-guard";
import { deleteEnvironment } from "~/modules/environments/deleteEnvironment";
import { Environment } from "~/modules/environments/types";
import { getProject } from "~/modules/projects/getProject";
import { Project, UserProject, UserRoles } from "~/modules/projects/types";
import { User } from "~/modules/user/types";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { getSession } from "~/sessions";
import { Header } from "~/components/Header";
import { Section } from "~/components/Section";
import { Button } from "~/components/Button";

interface MetaArgs {
  data: {
    project: Project;
    environment: Environment;
  };
}

export const meta: MetaFunction = ({ data }: MetaArgs) => {
  const project = data.project;
  const environment = data.environment;

  return {
    title: `Progressively | ${project.name} | ${environment.name} | Settings | Delete`,
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
    await deleteEnvironment(projectId, envId, session.get("auth-cookie"));
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
          <Box p={[4, 0]}>
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
          </Box>
        </Section>
      </DashboardLayout>
    );
  }

  const warnings = {
    "turned-off": "All your feature flags will be turned off and removed",
    "stats-deleted": "All the stats related to the environment will be removed",
  };

  return (
    <DashboardLayout
      user={user}
      breadcrumb={<BreadCrumbs crumbs={crumbs} />}
      header={<Header title="You are about to delete the environment." />}
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
              We really want to warn you: if you validate the environment
              suppression, you {`won't`} be able to access the{" "}
              <strong>{environment.name}</strong> environment anymore. It
              includes:
            </Text>
          }
        />

        <Flex
          justifyContent="space-between"
          mt={4}
          direction={["column", "column", "row"]}
        >
          <Button
            to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/settings`}
            variant="outline"
            colorScheme="error"
          >
            <span>
              No, {`don't`} delete{" "}
              <Box as="strong" display={["none", "inline"]} aria-hidden>
                {environment.name}
              </Box>
              <VisuallyHidden>{environment.name}</VisuallyHidden>
            </span>
          </Button>

          <Form method="post">
            <Button
              type="submit"
              colorScheme="error"
              leftIcon={<FaTrash aria-hidden />}
              isLoading={transition.state === "submitting"}
              loadingText="Deleting the environment, please wait..."
              disabled={false}
              mt={[4, 4, 0]}
              width={["100%", "100%", "auto"]}
            >
              Yes, delete the environment
            </Button>
          </Form>
        </Flex>
      </Section>
    </DashboardLayout>
  );
}
