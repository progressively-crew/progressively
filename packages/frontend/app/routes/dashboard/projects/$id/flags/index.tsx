import { Flag } from "~/modules/flags/types";
import { getSession } from "~/sessions";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { EmptyState } from "~/components/EmptyState";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { MetaFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { Card, CardContent } from "~/components/Card";
import { useProject } from "~/modules/projects/contexts/useProject";
import { useUser } from "~/modules/user/contexts/useUser";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { PageTitle } from "~/components/PageTitle";
import { SearchLayout } from "~/layouts/SearchLayout";
import { SearchBar } from "~/components/SearchBar";
import { ProjectNavBar } from "~/modules/projects/components/ProjectNavBar";
import { getProjectFlags } from "~/modules/projects/services/getProjectFlags";
import { FlagList } from "~/modules/flags/components/FlagList";

export const meta: MetaFunction = ({ parentsData }) => {
  const projectName = getProjectMetaTitle(parentsData);

  return {
    title: `Progressively | ${projectName} | Flags`,
  };
};

interface LoaderData {
  flags: Array<Flag>;
}

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  const session = await getSession(request.headers.get("Cookie"));
  const authCookie = session.get("auth-cookie");

  const flags: Array<Flag> = await getProjectFlags(params.id!, authCookie);

  return { flags };
};

export default function FlagsByEnvPage() {
  const { flags } = useLoaderData<LoaderData>();
  const { user } = useUser();
  const { project } = useProject();

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const newFlagId = searchParams.get("newFlagId") || undefined;

  const isSearching = Boolean(searchParams.get("search") || undefined);

  const filteredFlags = flags.filter((flag) =>
    flag.name.toLocaleLowerCase().includes(search || "")
  );

  const hasFlags = flags.length > 0;

  return (
    <DashboardLayout
      user={user}
      subNav={<ProjectNavBar projectId={project.uuid} />}
      status={
        newFlagId ? (
          <SuccessBox id="flag-added">
            The flag has been successfully created.
          </SuccessBox>
        ) : null
      }
    >
      <PageTitle
        value="Feature flags"
        description="All the feature flags of the current project, no matter the environments"
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

          <FlagList
            flags={filteredFlags}
            projectId={project.uuid}
            envId={project.environments[0].uuid}
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
