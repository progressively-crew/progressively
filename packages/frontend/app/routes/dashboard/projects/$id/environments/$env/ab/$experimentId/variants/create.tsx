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
import { AiOutlineExperiment } from "react-icons/ai";
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
import { createVariant } from "~/modules/ab/services/createVariant";
import { getExperimentById } from "~/modules/ab/services/getExperimentById";
import { CreateVariantDTO, Experiment, Variant } from "~/modules/ab/types";
import { validateVariationShape } from "~/modules/ab/validators/validateVariationShape";
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
    experiment?: Experiment;
  };
}

export const meta: MetaFunction = ({ data }: MetaArgs) => {
  const projectName = data?.project?.name || "An error ocurred";
  const envName = data?.environment?.name || "An error ocurred";
  const experimentName = data?.experiment?.name || "An error ocurred";

  return {
    title: `Progressively | ${projectName} | ${envName} | ${experimentName} | Variants | Create`,
  };
};

interface LoaderData {
  project: Project;
  user: User;
  environment: Environment;
  experiment: Experiment;
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

  const experiment = await getExperimentById(params.experimentId!, authCookie);

  return { project, environment: environment!, user, experiment };
};

interface ActionData {
  errors?: Partial<CreateVariantDTO>;
}

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<ActionData | Response> => {
  const projectId = params.id!;
  const envId = params.env!;
  const experimentId = params.experimentId!;
  const formData = await request.formData();
  const name = formData.get("variant-name")?.toString();
  const description = formData.get("variant-desc")?.toString();

  const errors = validateVariationShape({ name, description });

  if (errors?.name || errors?.description) {
    return { errors };
  }

  const session = await getSession(request.headers.get("Cookie"));

  try {
    const newVariant: Variant = await createVariant(
      experimentId,
      name!,
      description!,
      session.get("auth-cookie")
    );

    return redirect(
      `/dashboard/projects/${projectId}/environments/${envId}/ab/${experimentId}/variants?newVariantId=${newVariant.uuid}#variant-added`
    );
  } catch (e: unknown) {
    if (e instanceof Error) {
      return { errors: { name: e.message } };
    }

    return { errors: { name: "An error ocurred" } };
  }
};

export default function CreateVariantPage() {
  const data = useActionData<ActionData>();
  const transition = useTransition();

  const { project, environment, user, experiment } =
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
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/ab`,
      label: environment.name,
    },
    {
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/ab/${experiment.uuid}/variants`,
      label: experiment.name,
      forceNotCurrent: true,
      icon: <AiOutlineExperiment aria-hidden />,
    },
    {
      link: `/dashboard/projects/${project.uuid}/environments/${environment.uuid}/ab/${experiment.uuid}/variants/create`,
      label: "Create an experiment variant",
    },
  ];

  return (
    <DashboardLayout
      user={user}
      breadcrumb={<BreadCrumbs crumbs={crumbs} />}
      header={
        <Header
          title="Create an experiment variant"
          description={
            <Typography>
              The new variant will appear in <strong>{project.name}</strong> /{" "}
              <strong>{environment.name}</strong> /{" "}
              <strong>{experiment.name}</strong>.
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
              name="variant-name"
              isInvalid={Boolean(errors?.name)}
              label="Variant name"
              placeholder="e.g: New Homepage"
            />

            <div>
              <TextInput
                name="variant-desc"
                isInvalid={Boolean(errors?.description)}
                label="Variant description"
                placeholder="e.g: The new homepage"
              />

              <Spacer size={2} />

              <Typography>
                After the creation of an experiment variation, you will be able
                to get its SDK key for application usage.
              </Typography>
            </div>

            <SubmitButton
              type="submit"
              isLoading={transition.state === "submitting"}
              loadingText="Creating the variant, please wait..."
            >
              Create the experiment variant
            </SubmitButton>
          </FormGroup>
        </Form>
      </Section>
    </DashboardLayout>
  );
}
