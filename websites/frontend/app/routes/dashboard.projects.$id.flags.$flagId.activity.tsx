import { DashboardLayout } from "~/layouts/DashboardLayout";
import { getSession } from "~/sessions";
import { LoaderFunction, ActionFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { FlagMenu } from "~/modules/flags/components/FlagMenu";
import { useProject } from "~/modules/projects/contexts/useProject";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { PageTitle } from "~/components/PageTitle";
import { toggleFlagAction } from "~/modules/flags/form-actions/toggleFlagAction";
import { getActivity } from "~/modules/activity/services/getActivity";
import { Activity } from "~/modules/activity/types";
import { ActivityLogList } from "~/modules/activity/components/ActivityLogList";
import { Typography } from "~/components/Typography";
import { Card, CardContent } from "~/components/Card";
import { EmptyState } from "~/components/EmptyState";
import { useFlag } from "~/modules/flags/contexts/useFlag";
import { getFlagMetaTitle } from "~/modules/flags/services/getFlagMetaTitle";

export const meta: MetaFunction = ({ matches }) => {
  const projectName = getProjectMetaTitle(matches);
  const flagName = getFlagMetaTitle(matches);

  return [
    {
      title: `Progressively | ${projectName} | ${flagName} | Activity`,
    },
  ];
};

type ActionDataType = null | {
  errors?: { [key: string]: string | undefined };
};

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<ActionDataType> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");
  const formData = await request.formData();
  const type = formData.get("_type");

  if (type === "toggle-flag") {
    return toggleFlagAction(formData, params, authCookie);
  }

  return null;
};

interface LoaderData {
  activities: Array<Activity>;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");
  const activities = await getActivity(params.flagId!, authCookie);

  return {
    activities,
  };
};

export default function FlagInsights() {
  const { activities } = useLoaderData<LoaderData>();
  const { flag } = useFlag();
  const { project } = useProject();

  return (
    <DashboardLayout subNav={<FlagMenu projectId={project.uuid} flag={flag} />}>
      <PageTitle
        value="Activity"
        description={
          <Typography>
            Follow your teammates activity across the app. Get context on what{" "}
            <br />
            has been done by who and when.
          </Typography>
        }
      />

      {activities.length > 0 ? (
        <ActivityLogList list={activities} />
      ) : (
        <Card>
          <CardContent>
            <EmptyState
              title="No activity found"
              description={`Wait for people to make actions on this instance to start seeing things appearing`}
            />
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
}
