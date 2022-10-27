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
import { MetaFunction, ActionFunction, redirect } from "@remix-run/node";
import { useActionData, Form, useTransition } from "@remix-run/react";
import { useProject } from "~/modules/projects/contexts/useProject";
import { useUser } from "~/modules/user/contexts/useUser";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { PageTitle } from "~/components/PageTitle";
import { Stack } from "~/components/Stack";
import { Header } from "~/components/Header";
import { EnvIcon } from "~/components/Icons/EnvIcon";
import { TagLine } from "~/components/Tagline";
import { Spacer } from "~/components/Spacer";

export const handle = {
  breadcrumb: (match: { params: any }) => {
    return {
      link: `/dashboard/projects/${match.params.id}/environments/${match.params.env}/delete`,
      label: "Delete the environment",
    };
  },
};

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
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { backendError: error.message } };
    }

    return { errors: { backendError: "An error ocurred" } };
  }

  return redirect(
    `/dashboard/projects/${projectId}?envRemoved=true#env-removed`
  );
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

  if (userRole !== UserRoles.Admin) {
    return (
      <DashboardLayout
        user={user}
        header={
          <Header
            tagline={<TagLine icon={<EnvIcon />}>ENVIRONMENT</TagLine>}
            title={environment.name}
          />
        }
      >
        <PageTitle value="You are not allowed to delete environments." />
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

  return (
    <DeleteEntityLayout
      user={user}
      header={
        <Header
          tagline={<TagLine icon={<EnvIcon />}>ENVIRONMENT</TagLine>}
          title={environment.name}
        />
      }
      error={
        data?.errors &&
        data.errors.backendError && <ErrorBox list={data.errors} />
      }
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
            scheme=""
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
      <PageTitle value="Deleting an environment" />

      <Spacer size={4} />

      <Stack spacing={4}>
        <WarningBox title={<>This operation is definitive.</>} />

        <Typography color="hadesLight">
          If you validate the suppression, all the associated feature flags will
          be removed.
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
