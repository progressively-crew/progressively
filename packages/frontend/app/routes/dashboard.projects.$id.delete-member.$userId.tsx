import { ErrorBox } from "~/components/Boxes/ErrorBox";
import { getSession } from "~/sessions";
import { Button } from "~/components/Buttons/Button";
import { DeleteEntityLayout } from "~/layouts/DeleteEntityLayout";
import { Typography } from "~/components/Typography";
import { DeleteButton } from "~/components/Buttons/DeleteButton";
import { MetaFunction, ActionFunction, redirect } from "@remix-run/node";
import {
  useActionData,
  Form,
  useNavigation,
  useParams,
} from "@remix-run/react";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { Stack } from "~/components/Stack";
import { BackLink } from "~/components/BackLink";
import { DeleteEntityTitle } from "~/layouts/DeleteEntityTitle";
import UnauthorizedPage from "./401";
import { removeMember } from "~/modules/projects/services/removeMember";

export const meta: MetaFunction = ({ matches }) => {
  const projectName = getProjectMetaTitle(matches);

  return [
    {
      title: `Progressively | ${projectName} | Delete member from project`,
    },
  ];
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
    await removeMember(params.id!, params.userId!, session.get("auth-cookie"));
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

  return redirect(
    `/dashboard/projects/${params.id!}/settings?memberRemoved=true#member-removed`
  );
};

export default function DeleteMemberProjectPage() {
  const navigation = useNavigation();
  const { project } = useProject();
  const { userId } = useParams();

  const data = useActionData<ActionData>();

  const user = project.userProject?.find((up) => up.userId === userId);

  if (!user?.user) return <UnauthorizedPage />;
  const userName = user.user?.fullname;

  return (
    <DeleteEntityLayout
      error={
        data?.errors &&
        data.errors.backendError && <ErrorBox list={data.errors} />
      }
      titleSlot={
        <DeleteEntityTitle>
          Are you sure you want to remove{" "}
          <span className="text-red-700 dark:text-red-400 font-semibold">
            {userName}
          </span>{" "}
          from{" "}
          <span className="text-red-700 dark:text-red-400 font-semibold">
            {project.name}
          </span>
          ?
        </DeleteEntityTitle>
      }
      cancelAction={
        <Button
          to={`/dashboard/projects/${project.uuid}/settings`}
          variant="tertiary"
          scheme="danger"
        >
          Cancel
        </Button>
      }
      confirmAction={
        <Form method="post">
          <DeleteButton
            type="submit"
            isLoading={navigation.state === "submitting"}
            loadingText="Deleting the project, please wait..."
          >
            Yes, remove the user from the project
          </DeleteButton>
        </Form>
      }
      backLinkSlot={
        <BackLink to={`/dashboard/projects/${project.uuid}/settings`}>
          Back to project
        </BackLink>
      }
    >
      <Stack spacing={4}>
        <Typography>
          The user will not have access to this project, environments and
          feature flags anymore.
        </Typography>
      </Stack>
    </DeleteEntityLayout>
  );
}
