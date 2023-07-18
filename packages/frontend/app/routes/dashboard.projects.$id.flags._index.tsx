import { Flag } from "~/modules/flags/types";
import { getSession } from "~/sessions";
import { SuccessBox } from "~/components/Boxes/SuccessBox";
import { DashboardLayout } from "~/layouts/DashboardLayout";
import { EmptyState } from "~/components/EmptyState";
import { CreateButton } from "~/components/Buttons/CreateButton";
import { V2_MetaFunction, LoaderFunction } from "@remix-run/node";
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
import { Typography } from "~/components/Typography";

export const meta: V2_MetaFunction = ({ matches }) => {
  const projectName = getProjectMetaTitle(matches);

  return [
    {
      title: `Progressively | ${projectName} | Flags`,
    },
  ];
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

// eslint-disable-next-line sonarjs/cognitive-complexity
export default function FlagsByEnvPage() {
  const { flags } = useLoaderData<LoaderData>();
  const { user } = useUser();
  const { project } = useProject();

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const newFlagId = searchParams.get("newFlagId") || undefined;
  const flagEdited = searchParams.get("flagEdited") || undefined;
  const envRemoved = searchParams.get("envRemoved") || undefined;
  const projectCreated = searchParams.get("projectCreated") || undefined;

  const isFlagRemoved = searchParams.get("flagRemoved") || undefined;
  const isSearching = Boolean(searchParams.get("search") || undefined);

  const filteredFlags = flags.filter((flag) =>
    flag.name.toLocaleLowerCase().includes(search || "")
  );

  const hasFlags = flags.length > 0;

  return (
    <DashboardLayout
      user={user}
      subNav={<ProjectNavBar project={project} />}
      status={
        flagEdited ? (
          <SuccessBox id="flag-edited">
            The flag has been successfully edited.
          </SuccessBox>
        ) : projectCreated ? (
          <SuccessBox id="env-removed">
            The project has been successfully created.
          </SuccessBox>
        ) : envRemoved ? (
          <SuccessBox id="env-removed">
            The environment has been successfully deleted.
          </SuccessBox>
        ) : isFlagRemoved ? (
          <SuccessBox id="flag-removed">
            The flag has been successfully deleted.
          </SuccessBox>
        ) : newFlagId ? (
          <SuccessBox id="flag-added">
            The flag has been successfully created.
          </SuccessBox>
        ) : null
      }
    >
      <PageTitle
        value="Feature flags"
        description={
          <Typography as="span">
            All the feature flags available for{" "}
            <strong className="font-bold">{project.name}</strong>.
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

          <FlagList
            flags={filteredFlags}
            projectId={project.uuid}
            environments={project.environments}
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
