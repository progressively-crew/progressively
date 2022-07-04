import {
  MetaFunction,
  LoaderFunction,
  ActionFunction,
  redirect,
} from "@remix-run/node";
import {
  useActionData,
  useLoaderData,
  Form,
  useTransition,
} from "@remix-run/react";
import { BreadCrumbs } from "~/components/Breadcrumbs";
import { Crumbs } from "~/components/Breadcrumbs/types";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { ErrorBox } from "~/components/ErrorBox";
import { FormGroup } from "~/components/Fields/FormGroup";
import { TextInput } from "~/components/Fields/TextInput";
import { Header } from "~/components/Header";
import { Section } from "~/components/Section";
import { Spacer } from "~/components/Spacer";
import { Typography } from "~/components/Typography";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { createExperiment } from "~/modules/ab/services/createExperiment";
import { CreateExperimentDTO, Experiment } from "~/modules/ab/types";
import { validateExperimentShape } from "~/modules/ab/validators/validateExperimentShape";
import { authGuard } from "~/modules/auth/services/auth-guard";
import { Environment } from "~/modules/environments/types";
import { getProject } from "~/modules/projects/services/getProject";
import { Project } from "~/modules/projects/types";
import { User } from "~/modules/user/types";
import { getSession } from "~/sessions";

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
    title: `Progressively | ${projectName} | ${envName} | Experiments | Create`,
  };
};

interface LoaderData {
  project: Project;
  user: User;
  environment: Environment;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const user = await authGuard(request);

  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const project: Project = await getProject(params.id!, authCookie);
  const environment = project.environments.find(
    (env) => env.uuid === params.env
  );

  return { project, environment: environment!, user };
};

interface ActionData {
  errors?: Partial<CreateExperimentDTO>;
}

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<ActionData | Response> => {
  const projectId = params.id!;
  const envId = params.env!;
  const formData = await request.formData();
  const name = formData.get("experiment-name")?.toString();
  const description = formData.get("experiment-desc")?.toString();

  const errors = validateExperimentShape({ name, description });

  if (errors?.name || errors?.description) {
    return { errors };
  }

  const session = await getSession(request.headers.get("Cookie"));

  try {
    const newExperiment: Experiment = await createExperiment(
      envId,
      name!,
      description!,
      session.get("auth-cookie")
    );

    return redirect(
      `/dashboard/projects/${projectId}/environments/${envId}/ab?newExperimentId=${newExperiment.uuid}#experiment-added`
    );
  } catch (e: unknown) {
    if (e instanceof Error) {
      return { errors: { name: e.message } };
    }

    return { errors: { name: "An error ocurred" } };
  }
};

export default function CreateExperimentPage() {
  const data = useActionData<ActionData>();
  const transition = useTransition();

  const { project, environment, user } = useLoaderData<LoaderData>();
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
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags`,
      label: environment.name,
    },
    {
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/ab/create`,
      label: "Create an A/B experiment",
    },
  ];

  return (
    <DashboardLayout
      user={user}
      breadcrumb={<BreadCrumbs crumbs={crumbs} />}
      header={
        <Header
          title="Create an A/B experiment"
          description={
            <Typography>
              The new experiment will appear in <strong>{project.name}</strong>{" "}
              / <strong>{environment.name}</strong>.
            </Typography>
          }
        />
      }
      status={
        (errors?.name || errors?.description) && <ErrorBox list={errors} />
      }
    >
      <Section>
        <Form method="post">
          <FormGroup>
            <TextInput
              name="experiment-name"
              isInvalid={Boolean(errors?.name)}
              label="Experiment name"
              placeholder="e.g: New Homepage"
            />

            <div>
              <TextInput
                name="experiment-desc"
                isInvalid={Boolean(errors?.description)}
                label="Experiment description"
                placeholder="e.g: The new homepage"
              />

              <Spacer size={2} />

              <Typography>
                After the creation of an A/B experiment, you will be able to get
                its SDK key for application usage.
              </Typography>
            </div>

            <SubmitButton
              type="submit"
              isLoading={transition.state === "submitting"}
              loadingText="Creating the experiment, please wait..."
            >
              Create the A/B experiment
            </SubmitButton>
          </FormGroup>
        </Form>
      </Section>
    </DashboardLayout>
  );
}
