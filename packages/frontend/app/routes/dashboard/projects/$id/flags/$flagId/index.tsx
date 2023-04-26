import { DashboardLayout } from "~/layouts/DashboardLayout";
import { MetaFunction } from "@remix-run/node";
import { useProject } from "~/modules/projects/contexts/useProject";
import { useUser } from "~/modules/user/contexts/useUser";
import { getProjectMetaTitle } from "~/modules/projects/services/getProjectMetaTitle";
import { getFlagEnvMetaTitle } from "~/modules/flags/services/getFlagEnvMetaTitle";
import { PageTitle } from "~/components/PageTitle";
import { FlagMenu } from "~/modules/flags/components/FlagMenu";
import { useFlag } from "~/modules/flags/contexts/useFlag";
import { EnvList } from "~/modules/environments/components/EnvList";
import { SearchBar } from "~/components/SearchBar";
import { SearchLayout } from "~/layouts/SearchLayout";
import { useSearchParams } from "@remix-run/react";
import { Typography } from "~/components/Typography";

export const meta: MetaFunction = ({ parentsData }) => {
  const projectName = getProjectMetaTitle(parentsData);
  const flagName = getFlagEnvMetaTitle(parentsData);

  return {
    title: `Progressively | ${projectName} | ${flagName}`,
  };
};

export default function FlagSettingPage() {
  const { project } = useProject();
  const { user } = useUser();
  const { flag } = useFlag();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  const isSearching = Boolean(searchParams.get("search") || undefined);

  const environments = flag.flagEnvironment.map(
    (flagEnv) => flagEnv.environment
  );
  const filteredEnvironments = environments.filter((env) =>
    env.name.toLowerCase().includes(search || "")
  );

  return (
    <DashboardLayout
      user={user}
      subNav={<FlagMenu projectId={project.uuid} flag={flag} />}
    >
      <PageTitle
        value="Environments"
        description={
          <Typography as="span">
            The feature flag <strong className="font-bold">{flag.name}</strong>{" "}
            is available in the following environments.
          </Typography>
        }
      />

      <SearchLayout>
        <SearchBar
          label="Search for environments"
          placeholder="e.g: The environment"
          count={isSearching ? filteredEnvironments.length : undefined}
        />
      </SearchLayout>

      <EnvList
        environments={filteredEnvironments}
        makeLink={(env) =>
          `/dashboard/projects/${project.uuid}/environments/${env.uuid}/flags/${flag.uuid}`
        }
      />
    </DashboardLayout>
  );
}
