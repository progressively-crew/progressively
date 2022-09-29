import { BreadCrumbs } from "~/components/Breadcrumbs";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { UserRoles } from "~/modules/projects/types";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { getSession } from "~/sessions";
import { User } from "~/modules/user/types";
import { Section } from "~/components/Section";
import { validateEmail } from "~/modules/forms/utils/validateEmail";
import { ButtonCopy } from "~/components/ButtonCopy";
import { addMemberToProject } from "~/modules/projects/services/addMemberToProject";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { TextInput } from "~/components/Fields/TextInput";
import { Typography } from "~/components/Typography";
import { Li, Ul } from "~/components/Ul";
import { FormGroup } from "~/components/Fields/FormGroup";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { Crumbs } from "~/components/Breadcrumbs/types";
import { MetaFunction, ActionFunction } from "@remix-run/node";
import { useActionData, Form, useTransition } from "@remix-run/react";
import { useProject } from "~/modules/projects/contexts/useProject";
import { useUser } from "~/modules/user/contexts/useUser";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { PageTitle } from "~/components/PageTitle";
import { Header } from "~/components/Header";
import { ProjectIcon } from "~/components/Icons/ProjectIcon";
import { TagLine } from "~/components/Tagline";

export const meta: MetaFunction = ({ parentsData }) => {
  const projectName = getProjectMetaTitle(parentsData);

  return {
    title: `Progressively | ${projectName} | Add member`,
  };
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
  } catch (error) {
    if (error instanceof Error) {
      return { errors: { backendError: error.message } };
    }

    return { errors: { backendError: "An error ocurred" } };
  }
};

export default function CreateProjectPage() {
  const data = useActionData<ActionData>();
  const transition = useTransition();
  const { project, userRole } = useProject();
  const { user } = useUser();

  const adminOfProject = (project?.userProject || [])
    ?.filter((up) => up.role === UserRoles.Admin)
    .map((up) => up.user) as Array<User>;

  const errors = data?.errors;

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
          <Header
            tagline={<TagLine icon={<ProjectIcon />}>PROJECT</TagLine>}
            title={project.name}
          />
        }
      >
        <PageTitle value="You are not allowed to add members to projects." />
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
  const hasError = Object.keys(errorsToDisplay).length > 0;

  return (
    <DashboardLayout
      user={user}
      breadcrumb={<BreadCrumbs crumbs={crumbs} />}
      header={
        <Header
          tagline={<TagLine icon={<ProjectIcon />}>PROJECT</TagLine>}
          title={project.name}
        />
      }
      status={
        data?.success ? (
          <SuccessBox id="member-added">
            The user has been invited invited to join the project.
          </SuccessBox>
        ) : hasError ? (
          <ErrorBox list={errorsToDisplay} />
        ) : null
      }
    >
      <PageTitle value="Add member" />
      <Section>
        <Form method="post">
          <FormGroup>
            <TextInput
              isInvalid={Boolean(errors?.email)}
              name="email"
              label="Member email"
              placeholder="e.g: john.doe@gmail.com"
            />

            <div>
              <SubmitButton
                isLoading={transition.state === "submitting"}
                loadingText="Adding the member, please wait..."
              >
                Add the member
              </SubmitButton>
            </div>
          </FormGroup>
        </Form>
      </Section>
    </DashboardLayout>
  );
}
