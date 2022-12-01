import { ActionFunction, redirect } from "@remix-run/node";
import { useActionData, Form } from "@remix-run/react";
import { SubmitButton } from "~/components/Buttons/SubmitButton";
import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { FormGroup } from "~/components/Fields/FormGroup";
import { TextInput } from "~/components/Fields/TextInput";
import { Typography } from "~/components/Typography";
import { createProject } from "~/modules/projects/services/createProject";
import {
  CreateProjectDTO,
  Project,
  UserProject,
} from "~/modules/projects/types";
import { validateProjectName } from "~/modules/projects/validators/validateProjectName";
import { getSession } from "~/sessions";
import { PageTitle } from "~/components/PageTitle";
import { Card, CardContent } from "~/components/Card";
import { NotAuthenticatedLayout } from "~/layouts/NotAuthenticatedLayout";
import { Spacer } from "~/components/Spacer";
import { Stack } from "~/components/Stack";
import { ProjectIcon } from "~/components/Icons/ProjectIcon";
import { TipBox } from "~/components/Boxes/TipBox";
import { Li, Ul } from "~/components/Ul";
import { HStack } from "~/components/HStack";
import { EnvIcon } from "~/components/Icons/EnvIcon";
import { FlagIcon } from "~/components/Icons/FlagIcon";

export const meta = () => {
  return {
    title: "Progressively | Onboarding",
  };
};

interface ActionData {
  errors: Partial<CreateProjectDTO>;
}

export const action: ActionFunction = async ({
  request,
}): Promise<ActionData | Response> => {
  const formData = await request.formData();
  const projectName = formData.get("name")?.toString();

  const errors = validateProjectName({ name: projectName });

  if (errors?.name) {
    return { errors };
  }

  const session = await getSession(request.headers.get("Cookie"));

  const project: Project = await createProject(
    projectName!,
    session.get("auth-cookie")
  );

  return redirect(`/dashboard?newProjectId=${project.uuid}#project-added`);
};

export default function OnboardingPage() {
  const data = useActionData<ActionData>();

  const errors = data?.errors;

  return (
    <NotAuthenticatedLayout>
      <div className=" mt-8 md:mt-36">
        <Stack spacing={4}>
          <div className="text-center motion-safe:animate-fade-enter-top">
            <h1 className="font-bold text-4xl md:text-5xl" id="page-title">
              Welcome aboard
            </h1>
            <Typography>
              Before being fully operational, you will need to create{" "}
              <strong>a project</strong>. In general, a project is the name of
              your application.
            </Typography>
          </div>

          {errors?.name && <ErrorBox list={errors} />}

          <div
            className="motion-safe:animate-fade-enter-bottom motion-safe:opacity-0"
            style={{
              animationDelay: "500ms",
            }}
          >
            <Form method="post">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <ProjectIcon className="text-indigo-600" />

                <div className="flex-1">
                  <TextInput
                    isInvalid={Boolean(errors?.name)}
                    label="Project name"
                    name="name"
                    placeholder="e.g: My super project"
                    hiddenLabel
                  />
                </div>

                <SubmitButton>Create the project</SubmitButton>
              </div>
            </Form>
          </div>
        </Stack>
      </div>

      <Spacer size={2} />

      <div
        className="motion-safe:animate-fade-enter-bottom motion-safe:opacity-0"
        style={{
          animationDelay: "800ms",
        }}
      >
        <TipBox
          title={
            <Typography className="font-bold text-inherit">
              The welcome tips
            </Typography>
          }
        >
          <Typography className="text-inherit">
            Progressively is built with 3 main entities:
          </Typography>

          <Ul>
            <Li>
              <HStack spacing={2}>
                <ProjectIcon />
                <span>Projects</span>
              </HStack>
            </Li>
            <Li>
              <HStack spacing={2}>
                <EnvIcon />
                <span>Environments</span>
              </HStack>
            </Li>
            <Li>
              <HStack spacing={2}>
                <FlagIcon />
                <span>Feature flags</span>
              </HStack>
            </Li>
          </Ul>

          <Spacer size={2} />

          <Typography className="text-inherit">
            You can recognize them in the application with their icons. You can
            learn more on{" "}
            <a
              href="https://progressively.app/docs/features/hierarchical-structure"
              target={"_blank"}
              rel="noopener noreferrer"
              className="underline"
            >
              the associated documentation page
            </a>
            .
          </Typography>
        </TipBox>
      </div>
    </NotAuthenticatedLayout>
  );
}
