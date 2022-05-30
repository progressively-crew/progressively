import {
  Form,
  useActionData,
  ActionFunction,
  MetaFunction,
  LoaderFunction,
  useLoaderData,
  useTransition,
} from "remix";
import { Crumbs, BreadCrumbs } from "~/components/AppBreadcrumbs";
import { ErrorBox } from "~/components/ErrorBox";
import { authGuard } from "~/modules/auth/services/auth-guard";
import { Project, UserProject, UserRoles } from "~/modules/projects/types";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { getSession } from "~/sessions";
import { User } from "~/modules/user/types";
import { Header } from "~/components/Header";
import { Section } from "~/components/Section";
import { Button } from "~/components/Buttons/Button";
import { validateEmail } from "~/modules/forms/utils/validateEmail";
import { getProject } from "~/modules/projects/services/getProject";
import { ButtonCopy } from "~/components/ButtonCopy";
import { addMemberToProject } from "~/modules/projects/services/addMemberToProject";
import { SuccessBox } from "~/components/SuccessBox";
import { TextInput } from "~/components/Fields/TextInput";
import { Typography } from "~/components/Typography";
import { Li, Ul } from "~/components/Ul";

interface MetaArgs {
  data?: {
    project?: Project;
  };
}
export const meta: MetaFunction = ({ data }: MetaArgs) => {
  const title = data?.project?.name || "An error ocurred";

  return {
    title: `Progressively | ${title} | Add member`,
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
  errors?: Partial<{ email: string; backendError: string }>;
  success?: boolean;
}

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<ActionData | Response> => {
  const formData = await request.formData();
  const memberEmail = formData.get("email")?.toString();
  const emailError = validateEmail(memberEmail);

  if (emailError) {
    return { errors: { email: emailError } };
  }

  const session = await getSession(request.headers.get("Cookie"));

  try {
    await addMemberToProject(
      params.id!,
      memberEmail!,
      session.get("auth-cookie")
    );

    return { success: true };
  } catch (e) {
    if (e instanceof Error) {
      return { errors: { backendError: e.message } };
    }

    return { errors: { backendError: "An error ocurred" } };
  }
};

export default function CreateProjectPage() {
  const data = useActionData<ActionData>();
  const transition = useTransition();
  const { project, userRole, adminOfProject, user } =
    useLoaderData<LoaderData>();
  const errors = data?.errors;

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
      link: `/dashboard/projects/${project.uuid}/add-member`,
      label: "Add member",
    },
  ];

  if (userRole !== UserRoles.Admin) {
    return (
      <DashboardLayout
        user={user}
        breadcrumb={<BreadCrumbs crumbs={crumbs} />}
        header={
          <Header title="You are not allowed to add members to projects." />
        }
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

  const errorsToDisplay = errors || {};

  return (
    <DashboardLayout
      user={user}
      breadcrumb={<BreadCrumbs crumbs={crumbs} />}
      header={<Header title="Add member" />}
    >
      <Section>
        {data?.success && (
          <SuccessBox id="member-added">
            The user has been invited invited to join the project.
          </SuccessBox>
        )}

        {Object.keys(errorsToDisplay).length > 0 && (
          <ErrorBox list={errorsToDisplay} />
        )}
        <Form method="post">
          <TextInput
            isInvalid={Boolean(errors?.email)}
            name="email"
            label="Member email"
            placeholder="e.g: john.doe@gmail.com"
          />

          <Button
            type="submit"
            isLoading={transition.state === "submitting"}
            loadingText="Adding the member, please wait..."
          >
            Add the member
          </Button>
        </Form>
      </Section>
    </DashboardLayout>
  );
}
