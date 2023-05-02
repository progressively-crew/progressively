import { getFlagsByProjectEnv } from "~/modules/flags/services/getFlagsByProjectEnv";
import { FlagEnv } from "~/modules/flags/types";
import { getSession } from "~/sessions";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { EmptyState } from "~/components/EmptyState";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { FlagEnvList } from "~/modules/flags/components/FlagEnvList";
import { EnvNavBar } from "~/modules/environments/components/EnvNavbar";
import {
  ActionFunction,
  LoaderFunction,
  V2_MetaFunction,
} from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { Card, CardContent } from "~/components/Card";
import { useProject } from "~/modules/projects/contexts/useProject";
import { useUser } from "~/modules/user/contexts/useUser";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { useEnvironment } from "~/modules/environments/contexts/useEnvironment";
import { getEnvMetaTitle } from "~/modules/environments/services/getEnvMetaTitle";
import { toggleFlagAction } from "~/modules/flags/form-actions/toggleFlagAction";
import { PageTitle } from "~/components/PageTitle";
import { SearchLayout } from "~/layouts/SearchLayout";
import { SearchBar } from "~/components/SearchBar";
import { Typography } from "~/components/Typography";

export const meta: V2_MetaFunction = ({ matches, params }) => {
  const projectName = getProjectMetaTitle(matches);
  const envName = getEnvMetaTitle(matches, params.env!);

  return [
    {
      title: `Progressively | ${projectName} | ${envName} | Flags`,
    },
  ];
};

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<null> => {
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
  flagsByEnv: Array<FlagEnv>;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const flagsByEnv: Array<FlagEnv> = await getFlagsByProjectEnv(
    params.env!,
    authCookie
  );

  return { flagsByEnv };
};

export default function FlagsByEnvPage() {
  const { flagsByEnv } = useLoaderData<LoaderData>();
  const { user } = useUser();
  const { project } = useProject();
  const { environment } = useEnvironment();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  const isSearching = Boolean(searchParams.get("search") || undefined);

  const filteredFlags = flagsByEnv.filter((flag) =>
    flag.flag.name.toLocaleLowerCase().includes(search || "")
  );

  const hasFlags = flagsByEnv.length > 0;

  return (
    <DashboardLayout
      user={user}
      subNav={<EnvNavBar projectId={project.uuid} envId={environment.uuid} />}
    >
      <PageTitle
        value="Feature flags"
        description={
          <Typography as="span">
            The feature flags available in the{" "}
            <strong className="font-bold">{environment.name}</strong>{" "}
            environment.
          </Typography>
        }
      />

      {hasFlags ? (
        <>
          <SearchLayout>
            <SearchBar
              label="Search for flags"
              placeholder="e.g: The flag"
              count={isSearching ? filteredFlags.length : undefined}
            />
          </SearchLayout>

          <FlagEnvList
            flags={filteredFlags}
            envId={environment.uuid}
            projectId={project.uuid}
          />
        </>
      ) : (
        <Card>
          <CardContent>
            <EmptyState
              titleAs="h2"
              title="No flags found"
              description={"There are no flags yet on this environment."}
              action={
                <CreateButton
                  to={`/dashboard/projects/${project.uuid}/flags/create`}
                >
                  Create a feature flag
                </CreateButton>
              }
            />
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
}
